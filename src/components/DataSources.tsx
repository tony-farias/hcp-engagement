type Source = {
  name: string;
  description: string;
  patterns: string;
  exemplarTitle: string;
  exemplarUrl: string;
};

const SOURCES: Source[] = [
  {
    name: "VA Academic Detailing Service",
    description:
      "What the largest integrated US health system is teaching providers about evidence-based pathways. Strongest signal in chronic and age-related disease.",
    patterns: "Older / Medicare-heavy; Diagnostic-capability-bound",
    exemplarTitle:
      "VA Vutrisiran in ATTR-CM Drug Monograph (PDF, June 2025)",
    exemplarUrl:
      "https://www.va.gov/formularyadvisor/DOC_PDF/MON_Vutrisiran_AMVUTTRA_Monograph_Jun_2025.pdf",
  },
  {
    name: "CMS Open Payments (Sunshine Act)",
    description:
      "Which manufacturer pays which physician — advisory boards, speaker fees, consulting, meals. Direct competitor reach map by NPI.",
    patterns: "Competitor SOV; KOL-driven",
    exemplarTitle:
      "Open Payments search — manufacturers of category therapy",
    exemplarUrl:
      "https://openpaymentsdata.cms.gov/search?query=tafamidis",
  },
  {
    name: "Medicare Part D Prescriber PUF",
    description:
      "Public prescriber-by-drug volumes for every NPI. Decisive for any market with a 65+ skew.",
    patterns: "Older / Medicare-heavy; Competitor SOV",
    exemplarTitle:
      "Medicare Part D Prescriber Look-up Tool (search ATTR-CM therapies)",
    exemplarUrl: "https://data.cms.gov/tools/medicare-part-d-prescriber-look-up-tool",
  },
  {
    name: "ClinicalTrials.gov",
    description:
      "Trial sites and PIs are the most reliable forward-looking signal of capable centers and emerging KOLs. Protocols also reveal the diagnostic and biomarker requirements.",
    patterns: "KOL-driven; Centers-of-Excellence; Diagnostic-capability-bound",
    exemplarTitle:
      "Active ATTR Cardiac Amyloidosis trials (search results)",
    exemplarUrl:
      "https://clinicaltrials.gov/search?cond=transthyretin%20amyloid%20cardiomyopathy&aggFilters=status:rec",
  },
  {
    name: "PubMed + conference abstracts",
    description:
      "Authorship density identifies rising KOLs and active institutions in any specialty. Strongest signal in emerging or rare areas.",
    patterns: "KOL-driven; Diagnostic-capability-bound",
    exemplarTitle:
      "AHA Scientific Statement — Cardiac Amyloidosis: Evolving Diagnosis and Management (Kittleson 2020, open access PDF)",
    exemplarUrl: "https://www.ahajournals.org/doi/pdf/10.1161/CIR.0000000000000792",
  },
  {
    name: "Specialty society resources & directories",
    description:
      "Credentialed-provider directories, accredited-site lists, and procedure standards — a national diagnostic capacity map for any procedure-bound or imaging-bound specialty.",
    patterns: "Diagnostic-capability-bound; Centers-of-Excellence",
    exemplarTitle:
      "ASNC Practice Points — 99mTc-PYP Imaging for ATTR Cardiac Amyloidosis (PDF, 2021)",
    exemplarUrl:
      "https://www.asnc.org/wp-content/uploads/2024/05/19110-2021-ASNC-Amyloid-Practice-Points-PYP-MAY19-2022-1.pdf",
  },
  {
    name: "Hospital websites & press releases",
    description:
      "Hospitals brand the programs they want to be known for. Earliest signal of new capacity, leadership recruits, and Center-of-Excellence designations.",
    patterns: "Centers-of-Excellence; KOL-driven; Diagnostic-capability-bound",
    exemplarTitle:
      "Mayo Clinic Cardiac Amyloidosis Clinic — Overview",
    exemplarUrl:
      "https://www.mayoclinic.org/departments-centers/cardiac-amyloidosis-clinic/overview/ovc-20508423",
  },
  {
    name: "NPPES / NPI Registry",
    description:
      "Provider taxonomy, address, affiliations — the connective tissue across every other source. No market signal of its own; it joins everything.",
    patterns: "All five (connective tissue)",
    exemplarTitle:
      "NPPES NPI Registry — search by Cardiology specialty (joined to ATTR-CM signals)",
    exemplarUrl:
      "https://npiregistry.cms.hhs.gov/search?taxonomy_description=Cardiovascular+Disease",
  },
];

export function DataSources() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="text-base font-semibold text-databricks-navy">Public Data Sources</h2>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Eight unstructured sources powering the lakehouse
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-4 max-w-3xl">
        The Genie views above are joined and indexed from these eight publicly available sources. Each link below points to
        an ATTR-CM-specific exemplar — the actual material the lakehouse pipeline ingests for this therapy area. The same
        pattern transfers to any specialty launch.
      </p>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="text-left font-semibold px-3 py-2 w-[18%]">Source</th>
              <th className="text-left font-semibold px-3 py-2 w-[36%]">What it tells you</th>
              <th className="text-left font-semibold px-3 py-2 w-[18%]">Best-fit market patterns</th>
              <th className="text-left font-semibold px-3 py-2 w-[28%]">ATTR-CM exemplar material</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {SOURCES.map((s) => (
              <tr key={s.name} className="hover:bg-slate-50/60 align-top">
                <td className="px-3 py-3 font-semibold text-databricks-navy">{s.name}</td>
                <td className="px-3 py-3 text-slate-600 leading-relaxed">{s.description}</td>
                <td className="px-3 py-3 text-slate-500">{s.patterns}</td>
                <td className="px-3 py-3">
                  <a
                    href={s.exemplarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-databricks-orange hover:underline"
                  >
                    {s.exemplarTitle}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
