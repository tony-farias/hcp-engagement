export const repAccount = {
  hcpName: "Marcus Whitfield, MD",
  initials: "MW",
  specialty: "Cardiology",
  practice: "Carolina Cardiology Associates",
  city: "Greenville, SC",
  npi: "9999110001",
  rep: { name: "James Rodriguez", territory: "SC / NC / GA" },
  msl: { name: "Priya Patel, PharmD", region: "Southeast Medical" },
  lastUpdated: "Refreshed 4 min ago · Databricks Lakehouse · Unity Catalog governed",
};

export const repData = {
  suspect: {
    count: 11,
    avgAge: 78,
    carpalTunnel: 4,
    lowVoltageECG: "All 11 (100%)",
    lastPYPOrderDays: 540,
    suppression: "k-anonymity ≥ 11 enforced",
  },
  competitorCoverage: [
    { brand: "Pfizer (Vyndaqel/Vyndamax)", spend: "$0", trend: "—", note: "No payments on record" },
    { brand: "BridgeBio (Attruby)",       spend: "$0", trend: "—", note: "No payments on record" },
    { brand: "Alnylam (Amvuttra)",        spend: "$0", trend: "—", note: "No payments on record" },
  ],
  practice: {
    coeAffiliation: "Not a CoE — refer to Greenville Memorial (15 min)",
    pypCapable: false,
    cardiologists: 2,
    nearestCoE: "Greenville Memorial Heart & Vascular Institute",
    nearestCoEDistanceMin: 15,
    nearestCoESpecialists: 3,
  },
  preCallBrief: {
    lastInteraction: "April 15 · ATTR-CM screening pathway · 0 scripts YTD",
    suggestedTopics: [
      "Pattern recognition: carpal-tunnel-plus-HFpEF-plus-low-voltage triad (Witteles JACC HF 2019)",
      "Referral pathway to Greenville Memorial — warm handoff, not cold punt",
      "Approved Email: ATTR-CM screening algorithm reprint",
    ],
  },
  suggestedContent: [
    "ATTR-CM diagnostic algorithm reprint (Approved Email)",
    "Greenville Memorial referral one-pager (Approved Email)",
    "Pattern-recognition pre-call card",
  ],
};
