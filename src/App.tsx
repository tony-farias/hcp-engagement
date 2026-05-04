import { useState } from "react";
import { IpadFrame } from "./components/IpadFrame";
import { VaultShell } from "./components/VaultShell";
import { RepView } from "./components/RepView";
import { MSLView } from "./components/MSLView";
import { repAccount } from "./data/account_rep";
import { mslAccount } from "./data/account_msl";

type Role = "rep" | "msl";

// Build-time defaults; runtime overrides on window for hot-swapping spaces if needed.
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

  const eyebrow = isRep
    ? "Databricks · Life Sciences Commercial · Sales Rep"
    : "Databricks · Life Sciences Medical · MSL";
  const title = isRep
    ? "Embedded App + Genie inside Vault CRM — Sales Rep"
    : "Embedded App + Genie inside Vault CRM Medical — MSL";
  const blurb = isRep
    ? "One Databricks lakehouse, one App framework. The rep persona binds to the rep_view governed slice — HCP-aggregate suspect signals, CMS Open Payments, referral pathways, and pre-call brief."
    : "Same lakehouse as the rep app. Different governed slice — the MSL persona binds to msl_view: KOL publications, trial roles, emergence trajectory, and prior interactions. Prescribing data and competitor payments are walled off.";
  const footerScope = isRep
    ? "patient-level scoring stays in-tenant; rep view is HCP-aggregate, k-anonymity ≥ 11, every Genie query audited in Unity Catalog."
    : "Medical view is firewalled from prescribing and Open Payments data. Every Genie query audited in Unity Catalog.";
  const footerStatus = isRep ? "Commercial governed view" : "Medical governed view";

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-6">
      <header className="w-full max-w-6xl mb-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-databricks-orange font-semibold">
              {eyebrow}
            </div>
            <h1 className="text-2xl font-semibold text-databricks-navy">{title}</h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">{blurb}</p>
            <p className="text-[11px] text-slate-400 mt-2 max-w-2xl">
              HCP Engagement Demo — Sales Rep & MSL views over a single Databricks lakehouse.
            </p>
          </div>
          <RoleToggle role={role} setRole={setRole} />
        </div>
      </header>

      <IpadFrame>
        <VaultShell role={role} account={isRep ? repAccount : mslAccount}>
          {isRep ? <RepView spaceId={REP_SPACE_ID} /> : <MSLView spaceId={MSL_SPACE_ID} />}
        </VaultShell>
      </IpadFrame>

      <footer className="w-full max-w-6xl mt-6 text-[11px] text-slate-500 flex items-center justify-between">
        <div>
          <span className="font-semibold text-databricks-navy">Compliance envelope:</span> {footerScope}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-databricks-mint rounded-full animate-pulse" />
          <span>Lakehouse connected · {footerStatus}</span>
        </div>
      </footer>
    </div>
  );
}

function RoleToggle({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  return (
    <div className="bg-white rounded-full border border-slate-200 p-1 flex shadow-sm shrink-0">
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
