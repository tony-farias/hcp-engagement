type Source = {
  name: string;
  description: string;
  patterns: string;
  url: string;
};

const SOURCES: Source[] = [
  {
    name: "VA Academic Detailing Service",
    description:
      "What the largest integrated US health system is teaching providers about evidence-based pathways. Strongest signal in chronic and age-related disease.",
    patterns: "Older / Medicare-heavy; Diagnostic-capability-bound",
    url: "https://www.pbm.va.gov/academicdetailingservicehome.asp",
  },
  {
    name: "CMS Open Payments (Sunshine Act)",
    description:
      "Which manufacturer pays which physician — advisory boards, speaker fees, consulting, meals. Direct competitor reach map by NPI.",
    patterns: "Competitor SOV; KOL-driven",
    url: "https://openpaymentsdata.cms.gov/",
  },
  {
    name: "Medicare Part D Prescriber PUF",
    description:
      "Public prescriber-by-drug volumes for every NPI. Decisive for any market with a 65+ skew.",
    patterns: "Older / Medicare-heavy; Competitor SOV",
    url: "https://data.cms.gov/provider-summary-by-type-of-service/medicare-part-d-prescribers/medicare-part-d-prescribers-by-provider-and-drug",
  },
  {
    name: "ClinicalTrials.gov",
    description:
      "Trial sites and PIs are the most reliable forward-looking signal of capable centers and emerging KOLs. Protocols also reveal the diagnostic and biomarker requirements.",
    patterns: "KOL-driven; Centers-of-Excellence; Diagnostic-capability-bound",
    url: "https://clinicaltrials.gov/",
  },
  {
    name: "PubMed + conference abstracts",
    description:
      "Authorship density identifies rising KOLs and active institutions in any specialty. Strongest signal in emerging or rare areas.",
    patterns: "KOL-driven; Diagnostic-capability-bound",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
  },
  {
    name: "Specialty society resources & directories",
    description:
      "Credentialed-provider directories, accredited-site lists, and procedure standards — a national diagnostic capacity map for any procedure-bound or imaging-bound specialty.",
    patterns: "Diagnostic-capability-bound; Centers-of-Excellence",
    url: "https://www.asnc.org/clinical-guidelines-tools/clinical-resources/cardiac-amyloidosis/",
  },
  {
    name: "Hospital websites & press releases",
    description:
      "Hospitals brand the programs they want to be known for. Earliest signal of new capacity, leadership recruits, and Center-of-Excellence designations.",
    patterns: "Centers-of-Excellence; KOL-driven; Diagnostic-capability-bound",
    url: "https://www.mayoclinic.org/departments-centers",
  },
  {
    name: "NPPES / NPI Registry",
    description:
      "Provider taxonomy, address, affiliations — the connective tissue across every other source. No market signal of its own; it joins everything.",
    patterns: "All five (connective tissue)",
    url: "https://npiregistry.cms.hhs.gov/",
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
        The Genie views above are joined and indexed from these eight publicly available sources. Each source maps to one
        or more market patterns; together they map the diagnostic capacity, KOL graph, and competitor reach of any
        therapeutic area.
      </p>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="text-left font-semibold px-3 py-2 w-[18%]">Source</th>
              <th className="text-left font-semibold px-3 py-2 w-[42%]">What it tells you</th>
              <th className="text-left font-semibold px-3 py-2 w-[22%]">Best-fit market patterns</th>
              <th className="text-left font-semibold px-3 py-2 w-[18%]">Representative material</th>
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
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-databricks-orange hover:underline break-all"
                  >
                    {s.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
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
