import { useEffect, useState } from "react";

type CardEntry = { label: string; value: string };
type CardPreview = {
  heading: string;
  citation?: string;
  excerpt?: string;
  metadata?: CardEntry[];
  bullets?: string[];
  externalUrl: string;
  externalLabel: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  reason: string;
};

type SourceTab = {
  id: string;
  fullTitle: string;
  shortLabel: string;
  blurb: string;
  format: "pdf-local" | "card";
  pdfPath?: string;
  externalUrl: string;
  card?: CardPreview;
};

const VA_TAB: SourceTab = {
  id: "va",
  fullTitle: "VA Academic Detailing — Vutrisiran in ATTR-CM Drug Monograph (June 2025)",
  shortLabel: "VA Academic Detailing",
  blurb:
    "VA Pharmacy Benefits Management drug monograph — what the largest US integrated health system is teaching its providers about ATTR-CM category therapies.",
  format: "pdf-local",
  pdfPath: "/pdfs/va-vutrisiran-attr-cm-monograph.pdf",
  externalUrl:
    "https://www.va.gov/formularyadvisor/DOC_PDF/MON_Vutrisiran_AMVUTTRA_Monograph_Jun_2025.pdf",
};

const ICER_TAB: SourceTab = {
  id: "icer",
  fullTitle:
    "ICER ATTR-CM Final Evidence Report (October 2024) — Comparative Clinical Effectiveness, Comparative Value, and Future Outlook",
  shortLabel: "ICER Evidence Report",
  blurb:
    "Institute for Clinical and Economic Review final report — 153-page comparative clinical effectiveness and HEOR review of the ATTR-CM category. The evidence dossier MSLs cite during scientific exchange.",
  format: "pdf-local",
  pdfPath: "/pdfs/icer-attr-cm-final-report-2024.pdf",
  externalUrl:
    "https://icer.org/wp-content/uploads/2024/03/ICER_ATTR-CM_Final-Report_For-Publication_10212024.pdf",
};

const ASNC_TAB: SourceTab = {
  id: "asnc",
  fullTitle: "ASNC Practice Points — 99mTc-PYP Imaging for ATTR Cardiac Amyloidosis (PDF, 2021)",
  shortLabel: "ASNC Practice Points",
  blurb:
    "Specialty society practice points — credentialed-provider procedure standards. Diagnostic-capacity signal for any ATTR-CM market map.",
  format: "pdf-local",
  pdfPath: "/pdfs/asnc-pyp-practice-points-2021.pdf",
  externalUrl:
    "https://www.asnc.org/wp-content/uploads/2024/05/19110-2021-ASNC-Amyloid-Practice-Points-PYP-MAY19-2022-1.pdf",
};

const CLINTRIALS_TAB: SourceTab = {
  id: "clintrials",
  fullTitle: "ClinicalTrials.gov — Active ATTR Cardiac Amyloidosis Trials (recruiting)",
  shortLabel: "ClinicalTrials.gov",
  blurb:
    "Live registry of actively recruiting trials in ATTR-CM — sites, PIs, eligibility, biomarker requirements. Forward-looking signal of capable centers and emerging KOLs.",
  format: "card",
  externalUrl:
    "https://clinicaltrials.gov/search?cond=transthyretin%20amyloid%20cardiomyopathy&aggFilters=status:rec",
  card: {
    heading: "ClinicalTrials.gov — Live Search Results",
    citation: "Filter: Condition = transthyretin amyloid cardiomyopathy · Status = Recruiting",
    excerpt:
      "ClinicalTrials.gov is the federal registry of all clinical trials conducted in the United States. The lakehouse pipeline ingests this filter every night to detect new sites, new investigators, and new biomarker-eligibility criteria for the ATTR-CM category.",
    metadata: [
      { label: "Records ingested", value: "All recruiting ATTR-CM trials, daily refresh" },
      {
        label: "Fields extracted",
        value: "Site NPIs · PI names · Sponsor · Phase · Eligibility biomarkers · Enrollment status",
      },
      {
        label: "Joins to",
        value: "NPPES (PI NPI) · PubMed (PI publications) · Open Payments (sponsor → PI flows)",
      },
    ],
    bullets: [
      "Trial sites are the most reliable forward-looking signal of where diagnostic capability is being built",
      "PIs reappear as authors in PubMed and as recipients in Open Payments — same-NPI joining is the unlock",
      'Eligibility criteria (e.g., "PYP-confirmed ATTR-CM") reveal which biomarkers are gating the launch population',
    ],
    externalUrl:
      "https://clinicaltrials.gov/search?cond=transthyretin%20amyloid%20cardiomyopathy&aggFilters=status:rec",
    externalLabel: "Open ClinicalTrials.gov search ↗",
    reason:
      "ClinicalTrials.gov sends X-Frame-Options that block embedding. Click the button to open the live search in a new tab — the lakehouse ingests the same query nightly.",
  },
};

const AHA_TAB: SourceTab = {
  id: "aha",
  fullTitle:
    "AHA Scientific Statement — Cardiac Amyloidosis: Evolving Diagnosis and Management (Kittleson 2020)",
  shortLabel: "AHA Scientific Statement",
  blurb:
    "Multi-society scientific statement — the canonical reference document on cardiac amyloidosis diagnosis and management.",
  format: "card",
  externalUrl: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000792",
  card: {
    heading: "Cardiac Amyloidosis: Evolving Diagnosis and Management",
    citation:
      "Kittleson MM, Maurer MS, et al. A Scientific Statement From the American Heart Association. Circulation. 2020;142(1):e7–e22. DOI: 10.1161/CIR.0000000000000792",
    excerpt:
      '"Cardiac amyloidosis is now recognized as a more common cause of heart failure than previously appreciated. The advent of disease-modifying therapies has elevated the importance of timely diagnosis. This scientific statement reviews the contemporary diagnostic algorithm — including the role of bone scintigraphy, monoclonal protein screening, and genetic testing — and outlines a treatment framework spanning supportive care, transthyretin stabilizers, silencers, and gene-editing approaches."',
    metadata: [
      {
        label: "Citation in lakehouse",
        value: "Tagged as canonical reference for ATTR-CM diagnostic-pathway extraction",
      },
      {
        label: "Uses in Genie",
        value: "Underlies the carpal-tunnel + HFpEF + low-voltage ECG screening triad surfaced in rep responses",
      },
      {
        label: "Co-authors",
        value: "Drawn from AHA, ACC, ASE, EANM, HFSA, ISA, SCMR, SNMMI — the full multi-society writing group",
      },
    ],
    bullets: [
      "Defines the diagnostic algorithm the lakehouse uses to reconstruct each HCP's suspect-patient constellation",
      "Lists the diagnostic biomarkers (PYP scintigraphy, hematologic screening, TTR sequencing) the pipeline tracks per provider",
      "Names the therapy categories (stabilizers, silencers) the rep view aggregates competitor coverage against",
    ],
    externalUrl: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000792",
    externalLabel: "Open full text on AHA Journals ↗",
    secondaryUrl: "https://pubmed.ncbi.nlm.nih.gov/32476490/",
    secondaryLabel: "Open in PubMed ↗",
    reason:
      "AHA Journals serves the full PDF only to authenticated browser sessions. Click either button to open in a new tab — the abstract is freely viewable on PubMed.",
  },
};

const ACC_CONSENSUS_TAB: SourceTab = {
  id: "acc-consensus",
  fullTitle:
    "2023 ACC Expert Consensus Decision Pathway on Comprehensive Multidisciplinary Care for the Patient With Cardiac Amyloidosis",
  shortLabel: "2023 ACC Expert Consensus",
  blurb:
    "American College of Cardiology Solution Set Oversight Committee — multidisciplinary decision pathway endorsed by HFSA, AANEM, and ISA. The MSL-staple guidance document for sequencing diagnostic workup, genetic counseling, and therapy selection.",
  format: "card",
  externalUrl: "https://www.jacc.org/doi/10.1016/j.jacc.2022.11.022",
  card: {
    heading:
      "2023 ACC Expert Consensus Decision Pathway: Comprehensive Multidisciplinary Care for the Patient With Cardiac Amyloidosis",
    citation:
      "Kittleson MM, Ruberg FL, et al. JACC. 2023;81(11):1076–1126. DOI: 10.1016/j.jacc.2022.11.022 · Endorsed by AANEM, HFSA, ISA",
    excerpt:
      '"This decision pathway provides a multidisciplinary framework for the diagnosis and management of cardiac amyloidosis. It emphasizes the importance of TTR genetic testing with counseling — distinguishing ATTRv from ATTRwt informs treatment strategy — and outlines sequencing of stabilizers and silencers across patient phenotypes."',
    metadata: [
      {
        label: "Lakehouse usage",
        value: "MSL-view scoring of HCP scientific footprint vs current expert-consensus pathways",
      },
      {
        label: "Driving questions",
        value: "Genie scientific-exchange answers about diagnostic sequencing and TTR genetic counseling",
      },
      {
        label: "Endorsing societies",
        value: "AANEM, HFSA, ISA — multi-society reach for KOL identification",
      },
    ],
    bullets: [
      "Defines the diagnostic algorithm referenced in MSL pre-call briefs and prior-interaction reconciliation",
      "Anchors questions about TTR sequencing, asymptomatic carrier screening, and treatment sequencing",
      "Identifies the writing-group authors who recur as KOLs in publication and trial-PI graphs",
    ],
    externalUrl: "https://pubmed.ncbi.nlm.nih.gov/36697326/",
    externalLabel: "Open in PubMed ↗",
    secondaryUrl: "https://www.jacc.org/doi/10.1016/j.jacc.2022.11.022",
    secondaryLabel: "Open in JACC ↗",
    reason:
      "JACC requires institutional access for the full PDF; PubMed has the freely-viewable abstract. Both links open in a new tab.",
  },
};

const REP_TABS: SourceTab[] = [VA_TAB, ASNC_TAB, CLINTRIALS_TAB, AHA_TAB];
const MSL_TABS: SourceTab[] = [ICER_TAB, ASNC_TAB, CLINTRIALS_TAB, AHA_TAB, ACC_CONSENSUS_TAB];

export function SourceViewport({ variant }: { variant: "rep" | "msl" }) {
  const tabs = variant === "rep" ? REP_TABS : MSL_TABS;
  const [active, setActive] = useState<SourceTab>(tabs[0]);

  // Rebind to first tab of the new persona when variant changes
  useEffect(() => {
    setActive(tabs[0]);
  }, [variant]);

  const personaLabel = variant === "rep" ? "Sales Rep view" : "MSL view";
  const personaBlurb =
    variant === "rep"
      ? "Coverage, capacity, and capability sources behind the rep persona's Genie answers."
      : "Peer-reviewed evidence, evidence-review, and consensus-pathway sources behind the MSL persona's Genie answers.";

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-databricks-navy">
              Source Material Viewer · {personaLabel}
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">{personaBlurb}</p>
          </div>
          <a
            href={active.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-[10px] uppercase tracking-wider text-databricks-orange font-semibold hover:underline"
          >
            Open in new tab ↗
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 px-3 pt-2 bg-slate-50/60 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t)}
            className={`text-xs px-4 py-2.5 font-medium transition border-b-2 -mb-px ${
              active.id === t.id
                ? "border-databricks-orange text-databricks-navy bg-white rounded-t-md"
                : "border-transparent text-slate-500 hover:text-databricks-navy"
            }`}
          >
            {t.shortLabel}
            <span className="ml-1.5 text-[9px] uppercase tracking-wider text-slate-400">
              {t.format === "pdf-local" ? "PDF" : "CARD"}
            </span>
          </button>
        ))}
      </div>

      <div className="px-5 pt-3 pb-2 text-[11px] text-slate-500 italic border-b border-slate-100">
        {active.fullTitle}
      </div>

      {active.format === "pdf-local" && active.pdfPath ? (
        <div className="bg-slate-100">
          <iframe
            key={active.pdfPath}
            src={active.pdfPath}
            title={active.fullTitle}
            className="w-full"
            style={{ height: 720, border: "none", background: "white" }}
            allow="clipboard-write"
          />
          <div className="px-4 py-2.5 text-[10px] text-slate-500 italic">
            {active.blurb}{" "}
            <span className="text-slate-400">· Hosted same-origin in this app for reliable embedding.</span>
          </div>
        </div>
      ) : active.format === "card" && active.card ? (
        <SourceCard card={active.card} blurb={active.blurb} />
      ) : null}
    </section>
  );
}

function SourceCard({ card, blurb }: { card: CardPreview; blurb: string }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-databricks-navy text-white px-5 py-4">
          <h3 className="text-base font-semibold leading-snug">{card.heading}</h3>
          {card.citation && <p className="text-[11px] opacity-80 mt-1">{card.citation}</p>}
        </div>

        {card.excerpt && (
          <div className="px-5 py-4 border-b border-slate-100">
            <p className="text-sm text-slate-700 leading-relaxed italic">{card.excerpt}</p>
          </div>
        )}

        {card.metadata && card.metadata.length > 0 && (
          <div className="px-5 py-3 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {card.metadata.map((m) => (
              <div key={m.label}>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">{m.label}</div>
                <div className="text-xs text-databricks-navy mt-0.5 leading-snug">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {card.bullets && card.bullets.length > 0 && (
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
              How the lakehouse uses it
            </div>
            <ul className="space-y-1.5">
              {card.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-databricks-orange shrink-0">●</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="px-5 py-4 flex flex-wrap gap-3 items-center">
          <a
            href={card.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-md bg-databricks-orange text-white hover:bg-orange-600 transition"
          >
            {card.externalLabel}
          </a>
          {card.secondaryUrl && card.secondaryLabel && (
            <a
              href={card.secondaryUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-md border border-databricks-navy text-databricks-navy hover:bg-databricks-navy hover:text-white transition"
            >
              {card.secondaryLabel}
            </a>
          )}
          <span className="text-[10px] text-slate-400 italic">{card.reason}</span>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-400 italic mt-4 max-w-2xl mx-auto">{blurb}</div>
    </div>
  );
}
