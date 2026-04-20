# Google Apps Script webhook implementation guide

This project now includes a production-ready Apps Script at:

- `scripts/google-apps-script/Code.gs`

It is designed to capture all current website submissions:

- Contact form (`/api/contact`) -> Enquiries
- Join form (`/api/join`) -> Membership Requests
- Product interest modal (`/api/interest`) -> Wellness Bookings or Membership Requests (based on `option_type`)

## What the script does

- Validates a shared secret sent in `X-Webhook-Secret` header (and supports payload/query fallback for compatibility).
- Writes submissions into separate sheets by type.
- Adds an archive checkbox to each new row (only on row insert, not prefilled).
- Sends admin notification email for every submission.
- Sends customer confirmation email when an email value is present.
- Maintains a notifications sheet with one row per category, incrementing counts.
- Archives checked rows into `Archived` sheet via installable `onEdit` trigger.

## Step-by-step setup

### 1) Create spreadsheet + Apps Script project

1. Create a new Google Sheet (example name: `Commando Website Leads`).
2. In the sheet: **Extensions > Apps Script**.
3. Replace default `Code.gs` with contents of `scripts/google-apps-script/Code.gs`.
4. Save the project.

### 2) Configure script properties (secrets)

In Apps Script editor:

1. Open **Project Settings**.
2. Under **Script Properties**, add:
   - `API_SHARED_SECRET` = a long random secret string.
   - `ADMIN_EMAIL` = destination address for staff notifications.
   - `TIMEZONE` = optional (for example `Africa/Johannesburg`).

### 3) Create required sheets

1. Run function `setupAll` once (recommended) or run `setupSheets` then `createArchiveTrigger`.
2. Authorize script access when prompted.
3. Confirm these tabs exist:
   - `Enquiries`
   - `Wellness Bookings`
   - `Membership Requests`
   - `Archived`
   - `Notifications`

### 4) Create archive trigger

1. Skip this step if you already ran `setupAll`.
2. Otherwise run function `createArchiveTrigger` once.
3. Confirm an installable trigger now exists for function `onEditArchive`.

### 5) Deploy Apps Script web app

1. Click **Deploy > New deployment**.
2. Type: **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone** (or **Anyone with link**, depending your policy).
5. Deploy and copy the **Web app URL**.

### 6) Configure website environment variables

Set these on your Next.js deployment:

- `JOIN_WEBHOOK_URL` = your Apps Script web app URL.
- `CONTACT_WEBHOOK_URL` = same URL (recommended).
- `PRODUCT_WEBHOOK_URL` = same URL (recommended).
- `APPS_SCRIPT_WEBHOOK_SECRET` = exact same value as Apps Script `API_SHARED_SECRET`.

### 7) Verify end-to-end behavior

1. Submit Contact form.
   - New row should appear in `Enquiries`.
   - Notification row for `enquiries` should be created/incremented.
2. Submit Wellness option from product modal.
   - New row should appear in `Wellness Bookings`.
   - Notification row for `wellness` increments.
3. Submit Join form.
   - New row should appear in `Membership Requests`.
   - Notification row for `memberships` increments.
4. Check emails:
   - Admin should receive each entry.
   - Customer receives confirmation only if email provided.
5. Tick `Archive` checkbox on any row in data sheets.
   - Row should move into `Archived` and disappear from source sheet.

## Notes

- Apps Script `ContentService` does not support setting HTTP status response codes directly in web app output. The script returns JSON payloads with `success`/`error` for integration clarity.
- If you redeploy as a **new version**, keep environment webhook URLs pointed to the latest deployment URL.
