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
    <div className="min-h-screen flex flex-col bg-databricks-bg">
      {/* Brand bar — orange gradient header */}
      <div className="bg-gradient-to-r from-databricks-orangeLight to-databricks-orangeDeep text-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold leading-snug">
              ATTR-CM Sales Intelligence
            </h1>
            <p className="text-sm opacity-90 mt-0.5">
              Same Databricks lakehouse, two compliantly governed views.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-md text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-databricks-mint" />
            <span>Lakehouse Connected</span>
          </div>
        </div>
      </div>

      {/* Nav strip — dark navy with tab-style persona toggle */}
      <div className="bg-databricks-navy text-white">
        <div className="max-w-6xl mx-auto px-6 flex items-center">
          <NavTab active={isRep} onClick={() => setRole("rep")} label="Sales Rep" />
          <NavTab active={!isRep} onClick={() => setRole("msl")} label="MSL" />
          <div className="ml-auto text-[10px] uppercase tracking-wider opacity-70 hidden sm:block">
            Persona toggle · Unity Catalog rebinds the governed view
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <p className="text-xs text-slate-600 leading-relaxed">{subtitle}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        <main>{isRep ? <RepView spaceId={REP_SPACE_ID} /> : <MSLView spaceId={MSL_SPACE_ID} />}</main>

        <SourceViewport variant={role} />

        <DataSources />

        <footer className="bg-white rounded-lg border border-slate-200 px-5 py-3 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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

function NavTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 text-sm font-semibold transition border-b-2 -mb-px ${
        active
          ? "border-databricks-blue text-white"
          : "border-transparent text-white/70 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
