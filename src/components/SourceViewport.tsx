import { useState } from "react";

type SourceTab = {
  id: string;
  label: string;
  shortLabel: string;
  url: string;
  type: "pdf" | "page";
  description: string;
};

const SOURCE_TABS: SourceTab[] = [
  {
    id: "va",
    label: "VA Academic Detailing — Vutrisiran in ATTR-CM Drug Monograph (June 2025)",
    shortLabel: "VA Academic Detailing",
    url: "https://www.va.gov/formularyadvisor/DOC_PDF/MON_Vutrisiran_AMVUTTRA_Monograph_Jun_2025.pdf",
    type: "pdf",
    description:
      "VA Pharmacy Benefits Management drug monograph — what the largest US integrated health system is teaching its providers about ATTR-CM category therapies.",
  },
  {
    id: "asnc",
    label: "ASNC Practice Points — 99mTc-PYP Imaging for ATTR Cardiac Amyloidosis (PDF, 2021)",
    shortLabel: "ASNC Practice Points",
    url: "https://www.asnc.org/wp-content/uploads/2024/05/19110-2021-ASNC-Amyloid-Practice-Points-PYP-MAY19-2022-1.pdf",
    type: "pdf",
    description:
      "Specialty society practice points — credentialed-provider procedure standards. Diagnostic-capacity signal for any ATTR-CM market map.",
  },
  {
    id: "clintrials",
    label: "ClinicalTrials.gov — Active ATTR Cardiac Amyloidosis Trials (recruiting)",
    shortLabel: "ClinicalTrials.gov",
    url: "https://clinicaltrials.gov/search?cond=transthyretin%20amyloid%20cardiomyopathy&aggFilters=status:rec",
    type: "page",
    description:
      "Live registry of actively recruiting trials in ATTR-CM — sites, PIs, eligibility, and biomarker requirements. Forward-looking signal of capable centers and emerging KOLs.",
  },
  {
    id: "aha",
    label: "AHA Scientific Statement — Cardiac Amyloidosis: Evolving Diagnosis and Management (Kittleson 2020)",
    shortLabel: "AHA Scientific Statement",
    url: "https://www.ahajournals.org/doi/pdf/10.1161/CIR.0000000000000792",
    type: "pdf",
    description:
      "Open-access multi-society scientific statement — the canonical reference document on cardiac amyloidosis diagnosis and management.",
  },
];

export function SourceViewport() {
  const [active, setActive] = useState<SourceTab>(SOURCE_TABS[0]);
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-databricks-navy">Source Material Viewer</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Live preview of the actual ATTR-CM-specific public materials the lakehouse pipeline ingests. Tab through to
              show prospects what kind of sources Genie answers from.
            </p>
          </div>
          <a
            href={active.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-[10px] uppercase tracking-wider text-databricks-orange font-semibold hover:underline"
          >
            Open in new tab ↗
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 px-3 pt-2 bg-slate-50/60 border-b border-slate-200">
        {SOURCE_TABS.map((t) => (
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
              {t.type === "pdf" ? "PDF" : "WEB"}
            </span>
          </button>
        ))}
      </div>

      <div className="px-5 pt-3 pb-2 text-[11px] text-slate-500 italic border-b border-slate-100">
        {active.label}
      </div>

      <div className="bg-slate-100">
        <iframe
          key={active.url}
          src={active.url}
          title={active.label}
          className="w-full"
          style={{ height: 720, border: "none", background: "white" }}
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
        <div className="px-4 py-2.5 text-[10px] text-slate-500 italic flex items-center justify-between">
          <span>
            {active.description}
          </span>
          <span className="shrink-0 ml-4">
            If the document doesn't render here (cross-origin block), use <strong>Open in new tab ↗</strong>.
          </span>
        </div>
      </div>
    </section>
  );
}
