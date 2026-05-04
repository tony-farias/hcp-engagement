export type GenieAnswer = {
  question: string;
  answer: string;
  sources: string[];
};

// Fallback canned answers - shown only if the live Genie call fails. Story-aligned.
export const repPrompts: GenieAnswer[] = [
  {
    question: "Why isn't Dr. Whitfield writing?",
    answer:
      "11 suspect ATTR-CM patients in Carolina Cardiology Associates, average age 78. 4 of 11 have prior carpal tunnel surgery; 100% show low-voltage ECG. No PYP order in the last 540 days (about 18 months); the practice is not PYP-capable. CMS Open Payments shows Pfizer $0, BridgeBio $0, Alnylam $0 — Whitfield is invisible to the cardiac amyloidosis category. Next move: pattern-recognition pre-call followed by a warm handoff to Greenville Memorial Heart & Vascular Institute, 15 minutes away, PYP-capable, 3 specialists.",
    sources: ["Suspect-Patient Model", "CMS Open Payments", "NPPES", "hospital programs", "practice referral map"],
  },
  {
    question: "Where can I refer Whitfield's patients?",
    answer:
      "Greenville Memorial Heart & Vascular Institute, 15 minutes from Whitfield's practice. Designated Regional Cardiac Amyloidosis Center, PYP-capable on site, 3 cardiac amyloidosis specialists. This is your warm handoff path.",
    sources: ["practice referral map", "hospital programs"],
  },
  {
    question: "Has Whitfield received any payments from competitors?",
    answer:
      "No. CMS Open Payments shows Pfizer $0, BridgeBio $0, Alnylam $0 in the last 12 months. No engagement on record from any cardiac amyloidosis manufacturer — opportunity for category education.",
    sources: ["CMS Open Payments (Sunshine Act)"],
  },
  {
    question: "Which practices in my territory have the highest suspect-patient density?",
    answer:
      "Top practices in SC / NC / GA by suspect-patient density: Upstate Heart Specialists (17), Spartanburg Heart Group (14), Carolina Cardiology Associates — Whitfield (11), Anderson Heart Center (12), Asheville Cardiovascular (11). All counts respect k-anonymity ≥ 11; any practice below threshold is masked.",
    sources: ["Suspect-Patient Model (HCP rollup)"],
  },
];

