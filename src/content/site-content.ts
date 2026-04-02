export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/memberships", label: "Memberships" },
  { href: "/spa", label: "Spa" },
  { href: "/rules", label: "Rules" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/join", label: "Join Now" }
];

export const businessFacts = {
  gymName: "Commando Gym (Sabie)",
  address: "[OWNER_CONFIRMATION_REQUIRED] Needs owner confirmation",
  mapLink: "https://maps.google.com/?q=Sabie",
  phone: "[OWNER_CONFIRMATION_REQUIRED] Needs owner confirmation",
  whatsapp: "[OWNER_CONFIRMATION_REQUIRED] Needs owner confirmation",
  email: "[OWNER_CONFIRMATION_REQUIRED] Needs owner confirmation",
  hours: "[OWNER_CONFIRMATION_REQUIRED] Needs owner confirmation",
  socialProof: [
    { label: "Local gym in Sabie", value: "Verified" },
    { label: "Spa availability", value: "Verified on public mentions" },
    { label: "Detailed plans & rates", value: "[OWNER_CONFIRMATION_REQUIRED]" }
  ]
};

export const homeContent = {
  hero: {
    headline: "Train Hard. Recover Better. Start Today.",
    subheadline:
      "Commando Gym in Sabie welcomes beginners, returners, and serious athletes with a disciplined but supportive environment.",
    primaryCta: { label: "Join Commando Gym", href: "/join" },
    secondaryCta: { label: "View Memberships", href: "/memberships" }
  },
  motivation: {
    title: "Start where you are.",
    body: "You don’t need to be fit to start. You just need to start. Our coaches and community help you build strength, confidence, and momentum at your pace."
  }
};

export const memberships = [
  {
    name: "Starter",
    price: "[OWNER_CONFIRMATION_REQUIRED]",
    description: "Great for rebuilding consistency with standard gym access.",
    includes: ["Gym floor access", "Onboarding orientation", "Beginner support check-in"],
    spa: "Spa add-on [OWNER_CONFIRMATION_REQUIRED]"
  },
  {
    name: "Performance",
    price: "[OWNER_CONFIRMATION_REQUIRED]",
    description: "For regular training and progressive results.",
    includes: ["Extended access", "Program guidance", "Priority support"],
    spa: "Partial spa inclusion [OWNER_CONFIRMATION_REQUIRED]"
  },
  {
    name: "Gym + Recovery",
    price: "[OWNER_CONFIRMATION_REQUIRED]",
    description: "Train and recover with a complete wellness path.",
    includes: ["Full gym access", "Recovery focused support", "Spa pathway"],
    spa: "Spa access [OWNER_CONFIRMATION_REQUIRED]"
  }
];

export const ruleGroups = [
  { title: "Respect & conduct", rules: ["Treat staff and members respectfully.", "No harassment, intimidation, or abusive language."] },
  { title: "Hygiene & equipment etiquette", rules: ["Wipe equipment after use.", "Return weights and accessories to correct storage."] },
  { title: "Safety & spotting", rules: ["Use collars and spotters when needed.", "Report broken equipment immediately."] },
  { title: "Dress code", rules: ["Wear clean, appropriate training attire.", "Closed training shoes required in gym areas."] },
  { title: "Booking / class behavior", rules: ["Arrive on time for booked sessions.", "Cancel in advance if you cannot attend."] },
  { title: "Spa conduct and hygiene", rules: ["Follow posted spa hygiene guidance.", "Keep noise low in recovery areas."] },
  { title: "Membership/payment/cancellation basics", rules: ["Terms and cancellation timelines are [OWNER_CONFIRMATION_REQUIRED].", "Ask reception for full written policy."] }
];

export const faqGroups = [
  {
    title: "New member onboarding",
    items: [
      { q: "I’m a beginner, is this for me?", a: "Yes. Beginners are supported from day one with practical guidance and no judgment." },
      { q: "Do I need to be fit before joining?", a: "No. You join to get fit, not because you’re already fit." }
    ]
  },
  {
    title: "Pricing and memberships",
    items: [
      { q: "Do you offer monthly plans?", a: "Plan structures exist, but exact pricing is [OWNER_CONFIRMATION_REQUIRED]." },
      { q: "Can I change plans later?", a: "Usually yes, subject to policy [OWNER_CONFIRMATION_REQUIRED]." }
    ]
  },
  {
    title: "Spa and recovery",
    items: [
      { q: "Do you offer spa access?", a: "Yes, Commando Gym includes spa/recovery options. Specific services are [OWNER_CONFIRMATION_REQUIRED]." }
    ]
  },
  {
    title: "Safety and gym rules",
    items: [
      { q: "What should I bring on my first day?", a: "Bring training clothes, shoes, water, and a positive mindset." }
    ]
  },
  {
    title: "Scheduling and access",
    items: [
      { q: "How do I sign up?", a: "Use the Join Now form and the team will contact you with next steps." }
    ]
  }
];

export const wellnessStudio = {
  hours: "[OWNER_CONFIRMATION_REQUIRED] Needs owner confirmation",
  bookingMode: "Advance booking required via reception/WhatsApp.",
  memberDiscountRule: "Active Commando Gym members receive 10% off all wellness treatments.",
  categories: {
    massageAndBody: [
      { name: "Back, Neck & Shoulder Massage", duration: "30 min", price: "R250" },
      { name: "Full Body Massage", duration: "60 min", price: "R450" },
      { name: "Hot Stone Massage", duration: "75 min", price: "R550", notes: "Includes heat therapy stones." },
      { name: "Body Scrub & Glow", duration: "45 min", price: "R380" }
    ],
    handAndFoot: [
      { name: "Express Manicure", duration: "30 min", price: "R180" },
      { name: "Classic Manicure", duration: "45 min", price: "R240" },
      { name: "Express Pedicure", duration: "35 min", price: "R220" },
      { name: "Classic Pedicure", duration: "60 min", price: "R320" }
    ],
    facial: [
      { name: "Express Facial", duration: "30 min", price: "R260" },
      { name: "Deep Cleanse Facial", duration: "60 min", price: "R420" },
      { name: "Anti-Aging Facial", duration: "75 min", price: "R520", notes: "Targets fine lines and dull skin." }
    ],
    waxing: [
      { name: "Lip Wax", duration: "15 min", price: "R90" },
      { name: "Underarm Wax", duration: "20 min", price: "R130" },
      { name: "Half Leg Wax", duration: "30 min", price: "R220" },
      { name: "Full Leg Wax", duration: "45 min", price: "R340" }
    ]
  }
};
