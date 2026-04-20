/**
 * Commando Gym - Google Apps Script Webhook API
 *
 * Deploy this as a Web App and set Script Properties:
 * - API_SHARED_SECRET: required secret matched against X-Webhook-Secret header
 * - ADMIN_EMAIL: mailbox that receives all submission notifications
 * - TIMEZONE: optional (default Africa/Johannesburg)
 */

const SHEETS = {
  enquiries: 'Enquiries',
  wellness: 'Wellness Bookings',
  memberships: 'Membership Requests',
  archived: 'Archived',
  notifications: 'Notifications'
};

const COLUMNS = [
  'Archive',
  'ID',
  'Captured At',
  'Submission Type',
  'Source',
  'Full Name',
  'Email',
  'Phone/WhatsApp',
  'Preferred Contact Method',
  'Selected Option',
  'Fitness Goal',
  'Current Fitness Level',
  'Preferred Plan',
  'Preferred Date / Start',
  'Age Range',
  'Interested In Spa',
  'Message / Notes',
  'Consent',
  'Raw JSON'
];

const NOTIFICATION_HEADERS = ['Category', 'Count', 'Last Entry At', 'Sheet', 'Last Submission ID'];

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  createDataSheet_(ss, SHEETS.enquiries);
  createDataSheet_(ss, SHEETS.wellness);
  createDataSheet_(ss, SHEETS.memberships);
  createArchiveSheet_(ss, SHEETS.archived);
  createNotificationSheet_(ss, SHEETS.notifications);

  Logger.log('Setup complete. Sheets are ready.');
}

function setupAll() {
  setupSheets();
  deleteExistingArchiveTriggers_();
  createArchiveTrigger();
}

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('API_SHARED_SECRET');
    if (!secret) {
      return json_(500, { success: false, error: 'Server not configured: missing API_SHARED_SECRET.' });
    }

    if (!e.postData || !e.postData.contents) {
      return json_(400, { success: false, error: 'Missing JSON payload.' });
    }

    const payload = JSON.parse(e.postData.contents);
    const providedSecret = extractProvidedSecret_(e, payload);
    if (!providedSecret || providedSecret !== secret) {
      return json_(401, { success: false, error: 'Unauthorized.' });
    }
    const sanitizedPayload = sanitizePayload_(payload);
    const normalized = normalizePayload_(payload);
    const targetSheetName = routeSheet_(normalized);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(targetSheetName);
    if (!sheet) {
      return json_(500, { success: false, error: `Missing destination sheet: ${targetSheetName}` });
    }

    const rowValues = toRowValues_(normalized, sanitizedPayload);
    const rowIndex = sheet.getLastRow() + 1;
    sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
    sheet.getRange(rowIndex, 1).insertCheckboxes();

    updateNotifications_(ss, normalized.category, targetSheetName, normalized.id, normalized.capturedAt);
    sendEmails_(normalized, targetSheetName);

    return json_(200, {
      success: true,
      id: normalized.id,
      routed_to: targetSheetName
    });
  } catch (err) {
    return json_(500, {
      success: false,
      error: err && err.message ? err.message : 'Unexpected server error.'
    });
  }
}

/**
 * Installable trigger target: archive rows when Archive checkbox is checked.
 */
function onEditArchive(e) {
  if (!e || !e.range) return;

  const range = e.range;
  const sheet = range.getSheet();
  const sheetName = sheet.getName();
  if (![SHEETS.enquiries, SHEETS.wellness, SHEETS.memberships].includes(sheetName)) return;

  if (range.getColumn() !== 1 || range.getRow() < 2) return;
  if (e.value !== 'TRUE') return;

  const ss = sheet.getParent();
  const archiveSheet = ss.getSheetByName(SHEETS.archived);
  if (!archiveSheet) throw new Error('Archived sheet missing. Run setupSheets first.');

  const lastColumn = sheet.getLastColumn();
  const sourceValues = sheet.getRange(range.getRow(), 1, 1, lastColumn).getValues()[0];
  const archiveValues = [
    new Date(),
    sheetName,
    ...sourceValues
  ];

  const archiveRow = archiveSheet.getLastRow() + 1;
  archiveSheet.getRange(archiveRow, 1, 1, archiveValues.length).setValues([archiveValues]);

  sheet.deleteRow(range.getRow());
}

function createArchiveTrigger() {
  ScriptApp.newTrigger('onEditArchive')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
}

function deleteExistingArchiveTriggers_() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((trigger) => {
    if (trigger.getHandlerFunction() === 'onEditArchive') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

function clearAllNotifications() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.notifications);
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, NOTIFICATION_HEADERS.length).clearContent();
  }
}

function createDataSheet_(ss, name) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
  sheet.setFrozenRows(1);
}

function createArchiveSheet_(ss, name) {
  const archiveHeaders = ['Archived At', 'Original Sheet', ...COLUMNS];
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  sheet.getRange(1, 1, 1, archiveHeaders.length).setValues([archiveHeaders]);
  sheet.setFrozenRows(1);
}

function createNotificationSheet_(ss, name) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  sheet.getRange(1, 1, 1, NOTIFICATION_HEADERS.length).setValues([NOTIFICATION_HEADERS]);
  sheet.setFrozenRows(1);
}

function normalizePayload_(payload) {
  const capturedAt = payload.submitted_at || new Date().toISOString();
  const category = inferCategory_(payload);

  return {
    id: Utilities.getUuid(),
    capturedAt,
    category,
    submissionType: payload.submission_type || category,
    source: payload.source || 'website',
    fullName: payload.full_name || '',
    email: payload.email || '',
    phone: payload.phone_or_whatsapp || '',
    preferredContactMethod: payload.preferred_contact_method || '',
    selectedOption: payload.selected_option || '',
    fitnessGoal: payload.fitness_goal || '',
    currentFitnessLevel: payload.current_fitness_level || '',
    preferredPlan: payload.preferred_plan || '',
    preferredDate: payload.preferred_date || payload.preferred_start_date || '',
    ageRange: payload.age_range || '',
    interestedInSpa: payload.interested_in_spa || '',
    message: payload.message || payload.notes || '',
    consent: payload.consent_checkbox === true ? 'true' : 'false',
    raw: JSON.stringify(sanitizePayload_(payload))
  };
}

function sanitizePayload_(payload) {
  const clone = JSON.parse(JSON.stringify(payload || {}));
  delete clone.webhook_secret;
  return clone;
}

function inferCategory_(payload) {
  const source = String(payload.source || '').toLowerCase();
  const optionType = String(payload.option_type || '').toLowerCase();

  if (source === 'contact_form' || source.includes('contact')) return 'enquiries';
  if (source.includes('join')) return 'memberships';
  if (optionType === 'wellness') return 'wellness';
  if (optionType === 'membership') return 'memberships';
  return 'enquiries';
}

function routeSheet_(normalized) {
  if (normalized.category === 'wellness') return SHEETS.wellness;
  if (normalized.category === 'memberships') return SHEETS.memberships;
  return SHEETS.enquiries;
}

function toRowValues_(entry, sanitizedPayload) {
  return [
    false,
    entry.id,
    entry.capturedAt,
    entry.submissionType,
    entry.source,
    entry.fullName,
    entry.email,
    entry.phone,
    entry.preferredContactMethod,
    entry.selectedOption,
    entry.fitnessGoal,
    entry.currentFitnessLevel,
    entry.preferredPlan,
    entry.preferredDate,
    entry.ageRange,
    entry.interestedInSpa,
    entry.message,
    entry.consent,
    JSON.stringify(sanitizedPayload || {})
  ];
}

function updateNotifications_(ss, category, sheetName, id, capturedAtIso) {
  const sheet = ss.getSheetByName(SHEETS.notifications);
  if (!sheet) throw new Error('Notifications sheet missing. Run setupSheets first.');

  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase() === category.toLowerCase()) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex === -1) {
    rowIndex = sheet.getLastRow() + 1;
    sheet.getRange(rowIndex, 1, 1, NOTIFICATION_HEADERS.length).setValues([[category, 1, capturedAtIso, sheetName, id]]);
  } else {
    const currentCount = Number(sheet.getRange(rowIndex, 2).getValue()) || 0;
    sheet.getRange(rowIndex, 2).setValue(currentCount + 1);
    sheet.getRange(rowIndex, 3).setValue(capturedAtIso);
    sheet.getRange(rowIndex, 4).setValue(sheetName);
    sheet.getRange(rowIndex, 5).setValue(id);
  }
}

function sendEmails_(entry, destinationSheet) {
  const props = PropertiesService.getScriptProperties();
  const adminEmail = props.getProperty('ADMIN_EMAIL') || Session.getActiveUser().getEmail();
  const tz = props.getProperty('TIMEZONE') || 'Africa/Johannesburg';
  const when = Utilities.formatDate(new Date(entry.capturedAt), tz, 'yyyy-MM-dd HH:mm:ss z');

  const adminSubject = `[${entry.category.toUpperCase()}] New website submission`;
  const adminBody = [
    'A new website submission was captured.',
    '',
    `Submission ID: ${entry.id}`,
    `Category: ${entry.category}`,
    `Sheet: ${destinationSheet}`,
    `Captured At: ${when}`,
    `Name: ${entry.fullName}`,
    `Email: ${entry.email}`,
    `Phone/WhatsApp: ${entry.phone}`,
    `Preferred Contact Method: ${entry.preferredContactMethod}`,
    `Selected Option: ${entry.selectedOption}`,
    `Message: ${entry.message}`
  ].join('\n');

  MailApp.sendEmail({
    to: adminEmail,
    subject: adminSubject,
    body: adminBody
  });

  if (entry.email) {
    const customerSubject = 'We received your request';
    const customerBody = [
      `Hi ${entry.fullName || 'there'},`,
      '',
      'Thanks for contacting Commando Gym. We have received your request/message.',
      'A team member will be in contact with you soon.',
      '',
      `Reference ID: ${entry.id}`,
      '',
      'If this is urgent, please reach us on WhatsApp +27 60 971 0050.',
      '',
      'Regards,',
      'Commando Gym Team'
    ].join('\n');

    MailApp.sendEmail({
      to: entry.email,
      subject: customerSubject,
      body: customerBody
    });
  }
}

function getHeader_(e, targetHeaderName) {
  const headers = (e && e.headers) || {};
  const target = targetHeaderName.toLowerCase();
  for (const key in headers) {
    if (key.toLowerCase() === target) return headers[key];
  }
  return '';
}

function extractProvidedSecret_(e, payload) {
  return (
    getHeader_(e, 'x-webhook-secret') ||
    (payload && payload.webhook_secret) ||
    (e && e.parameter && e.parameter.secret) ||
    ''
  );
}

function json_(statusCode, payload) {
  const out = ContentService.createTextOutput(JSON.stringify(payload));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
