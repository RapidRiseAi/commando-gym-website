import benchPress from "../../bench-press.jpg";
import chestPress from "../../chest-press.jpg";
import commandoExterior from "../../commando-exterior.jpg";
import cyclingBike from "../../cycling-bike.jpg";
import gymUpperFloor from "../../gym-upper-floor.jpg";
import legPress from "../../legpress.jpg";
import smithMachine from "../../smith-machine.jpg";
import weights from "../../weights.jpg";
import commandoLogo from "../../commando-logo.png";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/memberships", label: "Memberships" },
  { href: "/spa", label: "Fitness & Wellness Studio" },
  { href: "/rules", label: "Rules" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/memberships", label: "Join Now" }
];

export const businessFacts = {
  gymName: "Commando",
  address: "53 Main Rd, Sabie, 1260",
  mapLink: "https://www.google.com/maps/search/?api=1&query=53+Main+Rd,+Sabie,+1260",
  phone: "+27 60 971 0050",
  whatsapp: "+27 60 971 0050",
  email: "WhatsApp only",
  hours: "Gym access: 24/7",
  socialProof: [
    { label: "Open access", value: "Gym open 24/7" },
    { label: "Appointment only", value: "Fitness & wellness studio" }
  ]
};

export const homeContent = {
  hero: {
    headline: "Train Anytime. Recover Properly. Stay Consistent.",
    subheadline:
      "Commando is Sabie’s 24/7 training space with an Onsite Wellness Studio. Whether you are just starting or already active, we give you the structure and environment to keep moving forward.",
    primaryCta: { label: "Join Now", href: "/memberships" },
    secondaryCta: { label: "View Memberships", href: "/memberships" }
  },
  motivation: {
    title: "Built for real people and real routines.",
    body: "Commando is designed for everyday consistency. Train before work, after hours, or whenever your schedule allows. Add wellness support when your body needs recovery."
  }
};

export const mediaAssets = {
  hero: {
    src: weights,
    alt: "Free weights and strength equipment at Commando gym"
  },
  aboutBuilding: {
    src: commandoExterior,
    alt: "Exterior of Commando gym in Sabie"
  },
  highlights: [
    {
      src: weights,
      alt: "Free weights setup at Commando gym",
      title: "Strength-focused equipment",
      body: "Train across key strength stations with equipment set up for consistent progress."
    },
    {
      src: cyclingBike,
      alt: "Cycling and cardio zone at Commando gym",
      title: "24/7 training access",
      body: "Train when your schedule allows, with a full floor of cardio and strength options."
    },
    {
      src: gymUpperFloor,
      alt: "Massage and recovery area at Commando wellness studio",
      title: "Onsite recovery support",
      body: "Pair your training with massage and recovery-focused wellness services on-site."
    }
  ],
  memberships: {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=80",
    alt: "Athlete resting between intense sets with gym equipment in background"
  },
  wellness: {
    src: gymUpperFloor,
    alt: "Upper floor training area at Commando gym"
  },
  gallery: [
    { src: benchPress, alt: "Bench press station at Commando gym" },
    { src: weights, alt: "Free weights section at Commando gym" },
    { src: gymUpperFloor, alt: "Upper floor gym view at Commando" },
    { src: chestPress, alt: "Chest press machine at Commando gym" },
    { src: cyclingBike, alt: "Cycling equipment at Commando gym" },
    { src: legPress, alt: "Leg press machine at Commando gym" },
    { src: commandoExterior, alt: "Commando gym exterior in Sabie" },
    { src: smithMachine, alt: "Smith machine area at Commando gym" }
  ],
  logo: {
    src: commandoLogo,
    alt: "Commando gym logo"
  }
};

export const testimonials = [
  {
    quote: "Best decision I made this year. The 24/7 access changed my routine completely.",
    name: "Local Member",
    context: "Monthly Membership"
  },
  {
    quote: "Friendly team, no intimidation, and the wellness treatments help me recover faster.",
    name: "Wellness Client",
    context: "Gym + Wellness"
  },
  {
    quote: "Perfect for Sabie. Serious training space with a welcoming vibe.",
    name: "Couples Plan Member",
    context: "Community Review"
  }
];

export const memberships = [
  {
    name: "Daily Pass",
    price: "R50",
    description: "Ideal for visitors and flexible drop-ins.",
    includes: ["24/7 gym access for one day", "No contract", "Pay-as-you-go"],
    spa: "Wellness booking available separately"
  },
  {
    name: "Weekly Pass",
    price: "R150",
    description: "Great for short stays and trial periods.",
    includes: ["24/7 gym access for seven days", "No contract", "Great for travel/work trips"],
    spa: "Wellness booking available separately"
  },
  {
    name: "Monthly Membership",
    price: "R350",
    description: "Best for regular training and long-term consistency.",
    includes: ["24/7 gym access", "No sign-up fee", "No fixed contract"],
    spa: "20% off health treatments in Wellness Studio"
  },
  {
    name: "Couples Membership",
    price: "R550",
    description: "Shared consistency for two people.",
    includes: ["24/7 gym access for two", "No sign-up fee", "No fixed contract"],
    spa: "20% off health treatments in Wellness Studio"
  },
  {
    name: "Student Membership",
    price: "R250",
    description: "Affordable option for students building healthy habits.",
    includes: ["24/7 gym access", "No sign-up fee", "No fixed contract"],
    spa: "20% off health treatments in Wellness Studio"
  }
];

export const wellnessStudio = {
  title: "Onsite Wellness Studio",
  intro:
    "Our Onsite Wellness Studio offers appointment-only wellness and recovery services for members and non-members.",
  hours: "08:00–16:00 (appointment only)",
  memberBenefit: "Gym members receive 20% discount on health treatments.",
  bookingLine: "Book via WhatsApp: +27 60 971 0050",
  categories: [
    {
      name: "Swedish Massage",
      items: [
        { service: "Full Body", duration: "60 minutes", price: "R500" },
        { service: "Back & Neck", duration: "30 minutes", price: "R400" },
        { service: "Foot & Leg", duration: "20 minutes", price: "R250" }
      ]
    },
    {
      name: "Hot Stone Therapy",
      items: [
        { service: "Full Body", duration: "60 minutes", price: "R570" },
        { service: "Back & Neck", duration: "30 minutes", price: "R450" }
      ]
    },
    {
      name: "Sports Massage",
      items: [
        { service: "Sports Massage", duration: "60 minutes", price: "R650" },
        { service: "Sports Massage", duration: "90 minutes", price: "R850" }
      ]
    },
    {
      name: "Lymph Drainage",
      items: [{ service: "Lymph Drainage", duration: "45 minutes", price: "R650" }]
    },
    {
      name: "Back Cleanse",
      items: [{ service: "Back Cleanse", duration: "60 minutes", price: "R850" }]
    },
    {
      name: "Hand & Foot Care",
      items: [
        { service: "Manicure", duration: "", price: "R250" },
        { service: "Express Mani", duration: "", price: "R200" },
        { service: "Pedicure", duration: "", price: "R300" },
        { service: "Express Pedi", duration: "", price: "R250" },
        { service: "Pedi Package", duration: "", price: "R400", note: "Express Pedi & Heel Peel Treatment" },
        { service: "Mani Package", duration: "", price: "R400", note: "Express Mani & 20-minute hand massage" }
      ]
    },
    {
      name: "Body Waxing",
      items: [
        { service: "Underarm Wax", duration: "", price: "R130" },
        { service: "½ Arm Wax", duration: "", price: "R150" },
        { service: "Full Arm Wax", duration: "", price: "R200" },
        { service: "½ Leg Wax", duration: "", price: "R250" },
        { service: "Full Leg Wax", duration: "", price: "R300" },
        { service: "Chest Wax", duration: "", price: "R300" },
        { service: "Back Wax", duration: "", price: "R350" }
      ]
    },
    {
      name: "Bikini & Intimate Waxing",
      items: [
        { service: "Bikini Wax", duration: "", price: "R200" },
        { service: "Brazilian Wax", duration: "", price: "R300" },
        { service: "Hollywood Wax", duration: "", price: "R400" }
      ]
    }
  ]
};

export const ruleGroups = [
  { title: "Respect & conduct", rules: ["Treat staff and members respectfully.", "No harassment, intimidation, or abusive language."] },
  { title: "Hygiene & equipment etiquette", rules: ["Wipe equipment after use.", "Return weights and accessories to correct storage."] },
  { title: "Safety & spotting", rules: ["Use collars and spotters when needed.", "Report broken equipment immediately."] },
  { title: "Dress code", rules: ["Wear clean, appropriate training attire.", "Closed training shoes required in gym areas."] },
  { title: "Booking / class behavior", rules: ["Arrive on time for booked sessions.", "Cancel in advance if you cannot attend."] },
  { title: "Wellness Studio conduct and hygiene", rules: ["Follow posted wellness hygiene guidance.", "Keep noise low in recovery areas."] },
  { title: "Membership/payment/cancellation basics", rules: ["No sign-up fee and no fixed contract for standard options.", "Ask reception for full written policy."] },
  { title: "Minors & media", rules: ["Members under 18 require parental or legal guardian approval.", "By entering, you accept Commando media capture for promotional use.", "Members may take their own photos/videos while respecting others' privacy."] }
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
      { q: "Do you offer monthly plans?", a: "Yes. We offer Daily (R50), Weekly (R150), Monthly (R350), Couples (R550), and Student (R250) options." },
      { q: "Are there contracts or sign-up fees?", a: "No sign-up fee and no fixed contract on standard options." }
    ]
  },
  {
    title: "Wellness Studio",
    items: [
      { q: "Do you offer wellness services?", a: "Yes. Our Onsite Wellness Studio offers massage, waxing, and hand/foot care." },
      { q: "Can non-members book wellness treatments?", a: "Yes. Non-members can book. Gym members receive 20% discount on health treatments." },
      { q: "When is the Wellness Studio open?", a: "08:00 to 16:00, appointment only." }
    ]
  },
  {
    title: "Safety and gym rules",
    items: [
      { q: "What should I bring on my first day?", a: "Bring training clothes, shoes, water, and a positive mindset." },
      { q: "Can someone under 18 join?", a: "Yes, with parental or legal guardian approval." }
    ]
  },
  {
    title: "Scheduling and access",
    items: [
      { q: "How do I sign up?", a: "Use the Join Now form or message us on WhatsApp at +27 60 971 0050." },
      { q: "Are you open 24/7?", a: "Yes. Commando gym access is available 24/7." }
    ]
  }
];
