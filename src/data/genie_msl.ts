import type { GenieAnswer } from "./genie_rep";

export const mslPrompts: GenieAnswer[] = [
  {
    question: "Summarize Mike Smith's recent work.",
    answer:
      "Dr. Mike Smith has 4 first-author publications in the last 24 months on ATTR-CM diagnostic delay, the carpal-tunnel + HFpEF screening triad, and PYP workflow optimization. Frequent co-authors: Dr. K. Anders (Northeast AMC) and Dr. R. Patel (Pacific AMC). Citation velocity +42% YoY · trajectory Rising · 2nd-tier in HF, rising in cardiac amyloidosis.",
    sources: ["PubMed", "Google Scholar (verified)", "kol_emergence"],
  },
  {
    question: "What clinical questions has Mike Smith raised before?",
    answer:
      "Last MSL touch (March 18, 2026): long-term safety in V122I carriers, screening pathway evidence for asymptomatic gene carriers, and sequencing of stabilizers with silencers. Content shared: ATTR-CM diagnostic algorithm reprint and Phase-3 Stabilizer Trial 36-month update.",
    sources: ["MSL Interaction Log"],
  },
  {
    question: "What active trials is Mike Smith involved in?",
    answer:
      "Phase-3 Stabilizer Trial as sub-investigator (follow-up phase) and the Carrier Screening Sub-Study as PI (actively enrolling).",
    sources: ["ClinicalTrials.gov", "kol_trial_roles"],
  },
  {
    question: "Who are Mike Smith's frequent co-authors?",
    answer:
      "Dr. K. Anders, MD (Northeast AMC) and Dr. R. Patel, MD (Pacific AMC). Both are top-tier KOLs in cardiac amyloidosis.",
    sources: ["PubMed co-author graph"],
  },
];
