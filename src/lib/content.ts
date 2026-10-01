import type {
  Capability,
  FutureItem,
  Industry,
  NavItem,
  ProcessStep,
  ServiceDetail,
  Solution,
  WhyItem,
} from "./types";

/**
 * Box Theory — real business content (not a template placeholder). A modern
 * packaging consultancy, sourcing, and project execution company based in
 * India, serving India, GCC, and international markets.
 */
export const SITE = {
  name: "Box Theory",
  tagline: "Packaging Intelligence Into Modern Packaging",
  description:
    "Box Theory bridges the gap between brands and packaging manufacturing partners through consultancy, sourcing intelligence, design & development, manufacturing coordination, and end-to-end execution.",
  url: "https://boxtheory.in",
  phone: "+91 88481 36367",
  phoneHref: "+918848136367",
  email: "hello@boxtheory.in",
  serviceAreas: ["India", "GCC", "International Markets"],
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Future Solutions", href: "/future-solutions" },
  { label: "Contact", href: "/contact" },
];

export const NAV_CTA = { label: "Get a Quote", href: "/contact" };

/* -------------------------------------------------------------------------
   Hero
------------------------------------------------------------------------- */
export const HERO = {
  eyebrow: "Packaging Consultancy & Execution",
  heading: "Packaging Intelligence Into Modern Packaging",
  body: "We help brands design, source, develop, and execute intelligent packaging solutions that improve product safety, customer experience, logistics efficiency, and brand presentation.",
  primaryCta: { label: "Explore Our Solutions", href: "/services" },
  secondaryCta: { label: "Talk to Box Theory", href: "/contact" },
  image: "/images/hero-packaging.svg",
  imageAlt: "Abstract composition of custom packaging materials and cartons",
} as const;

/* -------------------------------------------------------------------------
   Hero supporting statement
------------------------------------------------------------------------- */
export const STATEMENT = {
  lead: "Packaging is not just a box.",
  body: "It is the journey of your product from your warehouse to your customer.",
  supporting:
    "Box Theory combines packaging consultancy, manufacturing coordination, sourcing intelligence, and execution management to create packaging systems that protect products, strengthen brands, and support business growth.",
} as const;

/* -------------------------------------------------------------------------
   Core capabilities
------------------------------------------------------------------------- */
export const CAPABILITIES_HEADING = {
  label: "What We Do",
  lead: "Core Capabilities",
} as const;

export const CAPABILITIES: Capability[] = [
  {
    id: "packaging-consultancy",
    number: "01",
    title: "Packaging Consultancy",
    description:
      "Strategic guidance on packaging structure, materials, and cost — before a single unit goes into production.",
  },
  {
    id: "design-development",
    number: "02",
    title: "Packaging Design & Development",
    description:
      "From concept to production-ready file, structural and print design built around how your product actually ships.",
  },
  {
    id: "manufacturing-coordination",
    number: "03",
    title: "Manufacturing Coordination",
    description:
      "Vendor selection, quality control, and production timelines managed on your behalf, end to end.",
  },
  {
    id: "packaging-sourcing",
    number: "04",
    title: "Packaging Sourcing",
    description:
      "Access to a vetted manufacturing network, matched to your volume, material, and budget requirements.",
  },
  {
    id: "end-to-end-execution",
    number: "05",
    title: "End-to-End Project Execution",
    description:
      "One point of contact from first sample to final delivery, so packaging stops being a full-time job for your team.",
  },
  {
    id: "b2b-packaging",
    number: "06",
    title: "B2B Packaging Solutions",
    description:
      "Scalable packaging programs built for growing brands, retailers, and export businesses.",
  },
];

/* -------------------------------------------------------------------------
   Why Box Theory
------------------------------------------------------------------------- */
export const WHY_HEADING = {
  label: "Why Box Theory",
  lead: "Packaging should work harder for your business.",
} as const;

export const WHY_ITEMS: WhyItem[] = [
  {
    id: "single-point-management",
    number: "01",
    title: "Single-Point Packaging Management",
    description: "One partner coordinating design, sourcing, manufacturing, and delivery.",
  },
  {
    id: "consultancy-driven",
    number: "02",
    title: "Consultancy-Driven Solutions",
    description: "Recommendations grounded in your product, category, and margins — not a standard catalogue.",
  },
  {
    id: "cost-efficient-sourcing",
    number: "03",
    title: "Cost-Efficient Sourcing",
    description: "A vetted manufacturing network negotiated on your behalf, at your volume.",
  },
  {
    id: "vendor-coordination",
    number: "04",
    title: "Vendor Coordination Expertise",
    description: "Production schedules, quality checks, and revisions managed without the back-and-forth.",
  },
  {
    id: "scalable-support",
    number: "05",
    title: "Scalable Support",
    description: "The same process whether it's a first prototype run or a multi-location rollout.",
  },
  {
    id: "transit-safe-focus",
    number: "06",
    title: "Transit-Safe Packaging Focus",
    description: "Structural decisions tested against how your product actually moves through the supply chain.",
  },
  {
    id: "future-fulfillment",
    number: "07",
    title: "Future Fulfillment Support",
    description: "Packaging built to plug into warehousing and fulfillment as your operations scale.",
  },
];

/* -------------------------------------------------------------------------
   Industries
------------------------------------------------------------------------- */
export const INDUSTRIES_HEADING = {
  label: "Who We Work With",
  lead: "Packaging Built Around Your Industry",
} as const;

export const INDUSTRIES: Industry[] = [
  { id: "food-beverage", name: "Food & Beverage", description: "Food-safe materials and packaging built for shelf life and transit.", image: "" },
  { id: "fmcg", name: "FMCG", description: "High-volume packaging programs built for speed and consistency.", image: "" },
  { id: "cosmetics", name: "Cosmetics", description: "Premium structural and print packaging for beauty and personal care.", image: "" },
  { id: "retail-ecommerce", name: "Retail & E-commerce", description: "Unboxing-ready packaging built for direct-to-customer shipping.", image: "" },
  { id: "apparel", name: "Apparel", description: "Branded mailers and cartons sized for fashion and soft goods.", image: "" },
  { id: "consumer-products", name: "Consumer Products", description: "Everyday products packaged for retail shelf and online alike.", image: "" },
  { id: "electronics", name: "Electronics", description: "Protective, anti-static packaging engineered for sensitive components.", image: "" },
  { id: "healthcare", name: "Healthcare", description: "Compliant, tamper-evident packaging for regulated products.", image: "" },
  { id: "industrial-products", name: "Industrial Products", description: "Heavy-duty packaging built for weight, bulk, and freight handling.", image: "" },
  { id: "export-businesses", name: "Export Businesses", description: "Packaging built to meet international shipping and compliance standards.", image: "" },
  { id: "premium-brands", name: "Premium Brands", description: "Packaging as brand experience, for products that compete on presentation.", image: "" },
  { id: "d2c-startups", name: "D2C Startups", description: "Right-sized packaging programs for brands scaling from first batch to bulk.", image: "" },
];

/* -------------------------------------------------------------------------
   Process
------------------------------------------------------------------------- */
export const PROCESS_HEADING = {
  label: "How We Work",
  lead: "Our Process",
} as const;

export const PROCESS_STEPS: ProcessStep[] = [
  { id: "understand", step: "01", title: "Understand", description: "We start with your product, your customer, and how the package needs to perform." },
  { id: "strategize", step: "02", title: "Strategize", description: "Structure, material, and cost options are mapped against your goals and volumes." },
  { id: "source", step: "03", title: "Source", description: "We match your requirement to the right manufacturing partner from our vetted network." },
  { id: "develop", step: "04", title: "Develop", description: "Structural and print development, sampled and refined until it's production-ready." },
  { id: "execute", step: "05", title: "Execute", description: "Production is coordinated and quality-checked on your behalf, start to finish." },
  { id: "deliver", step: "06", title: "Deliver", description: "Packaging arrives where it needs to be, on the timeline your business runs on." },
];

/* -------------------------------------------------------------------------
   Packaging solutions
------------------------------------------------------------------------- */
export const SOLUTIONS_HEADING = {
  label: "What We Deliver",
  lead: "Packaging Solutions",
} as const;

export const SOLUTIONS: Solution[] = [
  { id: "corrugated-boxes", title: "Corrugated Boxes", description: "Shipping and transit packaging engineered for strength and cost efficiency.", image: "/images/solutions/corrugated-boxes.svg" },
  { id: "mono-cartons", title: "Mono Cartons", description: "Retail-ready folding cartons for consumer products and FMCG.", image: "/images/solutions/mono-cartons.svg" },
  { id: "rigid-boxes", title: "Rigid Boxes", description: "Premium, structured packaging for high-value and gifting products.", image: "/images/solutions/rigid-boxes.svg" },
  { id: "flexible-packaging", title: "Flexible Packaging", description: "Pouches and films for food, personal care, and consumer goods.", image: "/images/solutions/flexible-packaging.svg" },
  { id: "labels", title: "Labels", description: "Product and shipping labels, printed to brand and compliance spec.", image: "/images/solutions/labels.svg" },
  { id: "stickers", title: "Stickers", description: "Custom stickers for branding, sealing, and unboxing detail.", image: "/images/solutions/stickers.svg" },
  { id: "retail-display", title: "Retail Display Packaging", description: "Counter and floor display units built for shelf impact.", image: "/images/solutions/retail-display.svg" },
];

/* -------------------------------------------------------------------------
   About (homepage preview)
------------------------------------------------------------------------- */
export const ABOUT_PREVIEW = {
  eyebrow: "About Box Theory",
  heading: "Bridging Brands & Manufacturing",
  body: "Box Theory is a modern packaging consultancy, sourcing, and project execution company that bridges the gap between brands and manufacturing partners.",
  cta: { label: "Learn More", href: "/about" },
  image: "/images/about-split.svg",
  imageAlt: "Abstract composition representing packaging materials and structure",
} as const;

export const ABOUT_PAGE = {
  eyebrow: "About Box Theory",
  heading: "Bridging Brands & Manufacturing",
  intro:
    "Box Theory is a modern packaging consultancy, sourcing, and project execution company that bridges the gap between brands and manufacturing partners.",
  mission:
    "To simplify packaging development and manufacturing through strategic consultancy, strong vendor partnerships, operational coordination, and customer-focused execution.",
  strengths: [
    "Strategic packaging consultancy",
    "Strong vendor partnerships",
    "Operational coordination",
    "Customer-focused execution",
    "Manufacturing coordination",
    "Sourcing expertise",
  ],
  image: "/images/about-split.svg",
  imageAlt: "Abstract composition representing packaging materials and structure",
} as const;

/* -------------------------------------------------------------------------
   Future solutions
------------------------------------------------------------------------- */
export const FUTURE_HEADING = {
  label: "Looking Ahead",
  lead: "What's Next in Packaging",
} as const;

export const FUTURE_ITEMS: FutureItem[] = [
  { id: "fulfillment-support", title: "Fulfillment Support", description: "Pack-out and fulfillment coordination layered on top of your packaging program." },
  { id: "warehousing-coordination", title: "Warehousing Coordination", description: "Storage and inventory coordination for packaged and finished goods." },
  { id: "delivery-management", title: "Delivery Management", description: "Logistics coordination from production facility to final destination." },
  { id: "protection-systems", title: "Packaging Protection Systems", description: "Engineered cushioning and void-fill systems for higher-risk transit." },
  { id: "innovation-labs", title: "Innovation Labs", description: "Structural and material experimentation ahead of standard production." },
  { id: "sustainable-development", title: "Sustainable Packaging Development", description: "Material and structure R&D focused on reducing environmental impact." },
  { id: "rnd-services", title: "R&D Services", description: "Dedicated development work for packaging challenges without an off-the-shelf answer." },
  { id: "automation-consultation", title: "Packaging Automation Consultation", description: "Guidance on where automation fits into your packaging and fulfillment line." },
];

/* -------------------------------------------------------------------------
   Sustainability
------------------------------------------------------------------------- */
export const SUSTAINABILITY = {
  eyebrow: "Sustainability",
  heading: "Packaging That Respects What's Next",
  body: "We focus on sustainable packaging development, material optimization, and responsible sourcing — reducing waste and environmental impact without compromising performance.",
  points: [
    "Sustainable packaging development",
    "Material optimization",
    "Packaging efficiency",
    "Reduced waste",
    "Responsible sourcing",
  ],
  image: "/images/sustainability.svg",
  imageAlt: "Abstract composition of natural packaging materials and kraft tones",
} as const;

/* -------------------------------------------------------------------------
   Portfolio — no real projects provided yet; structure only, no fabricated
   client names, statistics, or case-study claims.
------------------------------------------------------------------------- */
export const PORTFOLIO = {
  eyebrow: "Selected Work",
  heading: "Packaging Projects Built Around Real Business Challenges",
  body: "Our project portfolio is being prepared. Reach out to discuss recent work relevant to your category.",
  placeholderCount: 6,
} as const;

/* -------------------------------------------------------------------------
   Testimonials — no content provided; section stays hidden until real
   testimonials exist (see TestimonialsSection, rendered conditionally).
------------------------------------------------------------------------- */
export const TESTIMONIALS_HEADING = {
  label: "Partners",
  lead: "What Our Partners Say",
} as const;

/* -------------------------------------------------------------------------
   Final CTA
------------------------------------------------------------------------- */
export const CTA = {
  heading: "Let's Build Better Packaging.",
  body: "Tell us what you're packaging. We'll help you figure out what comes next.",
  primaryCta: { label: "Start a Packaging Conversation", href: "/contact" },
  secondaryCta: { label: "Get a Quote", href: "/contact" },
} as const;

/* -------------------------------------------------------------------------
   Contact
------------------------------------------------------------------------- */
export const CONTACT_PAGE = {
  eyebrow: "Contact",
  heading: "Let's Talk Packaging",
  body: "Tell us about your product and we'll get back to you with next steps.",
  form: {
    title: "Send an Enquiry",
    submit: "Send Enquiry",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    packagingRequirement: "Packaging Requirement",
    estimatedQuantity: "Estimated Quantity",
    message: "Message",
    referenceFile: "Upload Requirement / Reference",
  },
} as const;

/* -------------------------------------------------------------------------
   Footer
------------------------------------------------------------------------- */
export const FOOTER = {
  blurb: "A modern packaging consultancy, sourcing, and project execution company.",
  navGroups: [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Industries", href: "/industries" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Future Solutions", href: "/future-solutions" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
  copyright: `© ${new Date().getFullYear()} Box Theory. All rights reserved.`,
} as const;

export const FOOTER_BLOG_LINK = { label: "Blog", href: "/blog" };

/* -------------------------------------------------------------------------
   Service detail pages — /services/[slug]
------------------------------------------------------------------------- */
export const SERVICES: ServiceDetail[] = [
  {
    slug: "packaging-consultancy",
    title: "Packaging Consultancy",
    shortDescription: "Strategic guidance on packaging structure, materials, and cost.",
    heroDescription:
      "Before a single unit goes into production, we help you understand what your packaging actually needs to do — for your product, your margins, and your customer's unboxing experience.",
    whatItIncludes: [
      "Structural and material assessment",
      "Cost-versus-performance analysis",
      "Category and competitor benchmarking",
      "Packaging strategy roadmap",
    ],
  },
  {
    slug: "design-development",
    title: "Packaging Design & Development",
    shortDescription: "From concept to production-ready file.",
    heroDescription:
      "Structural and print design built around how your product actually ships — developed and sampled until it's genuinely production-ready, not just presentation-ready.",
    whatItIncludes: [
      "Structural design and die-line development",
      "Print and finish design",
      "Physical prototyping and sampling",
      "Production-file handoff",
    ],
  },
  {
    slug: "manufacturing-coordination",
    title: "Manufacturing Coordination",
    shortDescription: "Vendor selection, quality control, and timelines — managed for you.",
    heroDescription:
      "We sit between you and the factory floor, managing vendor selection, production schedules, and quality control so packaging stays on track without becoming your job.",
    whatItIncludes: [
      "Vendor selection and negotiation",
      "Production timeline management",
      "In-process and pre-dispatch quality checks",
      "Issue resolution and revisions",
    ],
  },
  {
    slug: "packaging-sourcing",
    title: "Packaging Sourcing",
    shortDescription: "Access to a vetted manufacturing network.",
    heroDescription:
      "A vetted network of manufacturing partners, matched to your volume, material, and budget — so you're not starting a vendor search from zero every time.",
    whatItIncludes: [
      "Manufacturer matching by product and volume",
      "Material and cost comparisons",
      "Sample coordination across vendors",
      "Ongoing sourcing relationship management",
    ],
  },
  {
    slug: "b2b-packaging",
    title: "B2B Packaging Solutions",
    shortDescription: "Scalable packaging programs for growing businesses.",
    heroDescription:
      "Packaging programs built to scale — for growing brands, retailers, and export businesses that need consistency across repeat, high-volume orders.",
    whatItIncludes: [
      "Volume-based packaging programs",
      "Multi-location and multi-SKU coordination",
      "Export-compliant packaging specification",
      "Dedicated account support",
    ],
  },
];
