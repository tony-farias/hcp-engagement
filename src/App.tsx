import { useState } from "react";
import { RepView } from "./components/RepView";
import { MSLView } from "./components/MSLView";
import { DataSources } from "./components/DataSources";
import { SourceViewport } from "./components/SourceViewport";

type Role = "rep" | "msl";

const REP_SPACE_ID =
  (typeof window !== "undefined" && window.__GENIE_SPACE_ID_REP__) ||
  (import.meta.env.VITE_GENIE_SPACE_ID_REP as string | undefined) ||
  "01f147ee83391102be3b9937a7ce61bd";
const MSL_SPACE_ID =
  (typeof window !== "undefined" && window.__GENIE_SPACE_ID_MSL__) ||
  (import.meta.env.VITE_GENIE_SPACE_ID_MSL as string | undefined) ||
  "01f147ee83761484a3a1a5e5dc74a685";

export default function App() {
  const [role, setRole] = useState<Role>("rep");
  const isRep = role === "rep";

  const subtitle = isRep
    ? "Sales Rep view — HCP-aggregate suspect signals, CMS Open Payments, referral pathways, and pre-call brief. Bound to the rep_view governed slice."
    : "MSL view — KOL publications, trial roles, emergence trajectory, and prior interactions. Bound to the msl_view governed slice; prescribing and competitor payments are walled off.";
  const footerScope = isRep
    ? "patient-level scoring stays in-tenant; rep view is HCP-aggregate, k-anonymity ≥ 11, every Genie query audited in Unity Catalog."
    : "Medical view is firewalled from prescribing and Open Payments data. Every Genie query audited in Unity Catalog.";
  const footerStatus = isRep ? "Commercial governed view" : "Medical governed view";

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-6xl space-y-6">
        <header className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-databricks-orange font-semibold">
                Databricks · Life Sciences
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-databricks-navy">
                HCP Engagement Demo — Public Data → Patient Targeting
              </h1>
              <p className="text-sm text-slate-500 mt-1">Same lakehouse, two governed views.</p>
            </div>
            <RoleToggle role={role} setRole={setRole} />
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed">{subtitle}</p>
          </div>
        </header>

        <main>{isRep ? <RepView spaceId={REP_SPACE_ID} /> : <MSLView spaceId={MSL_SPACE_ID} />}</main>

        <SourceViewport variant={role} />

        <DataSources />

        <footer className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-3 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="font-semibold text-databricks-navy">Compliance envelope:</span> {footerScope}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-databricks-mint rounded-full animate-pulse" />
            <span>Lakehouse connected · {footerStatus}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function RoleToggle({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  return (
    <div className="bg-slate-50 rounded-full border border-slate-200 p-1 flex shrink-0 self-start sm:self-auto">
      <button
        onClick={() => setRole("rep")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
          role === "rep" ? "bg-databricks-orange text-white shadow" : "text-slate-500 hover:text-databricks-navy"
        }`}
      >
        Sales Rep
      </button>
      <button
        onClick={() => setRole("msl")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
          role === "msl" ? "bg-databricks-navy text-white shadow" : "text-slate-500 hover:text-databricks-navy"
        }`}
      >
        MSL
      </button>
    </div>
  );
}
