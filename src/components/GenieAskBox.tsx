declare global {
  interface Window {
    __DATABRICKS_HOST__?: string;
    __DATABRICKS_WORKSPACE_ID__?: string;
    __GENIE_SPACE_ID_REP__?: string;
    __GENIE_SPACE_ID_MSL__?: string;
  }
}

const DATABRICKS_HOST =
  (typeof window !== "undefined" && window.__DATABRICKS_HOST__) ||
  (import.meta.env.VITE_DATABRICKS_HOST as string | undefined) ||
  "https://fe-vm-hls-amer.cloud.databricks.com";

const DATABRICKS_WORKSPACE_ID =
  (typeof window !== "undefined" && window.__DATABRICKS_WORKSPACE_ID__) ||
  (import.meta.env.VITE_DATABRICKS_WORKSPACE_ID as string | undefined) ||
  "1602460480284688";

// Kept for backwards compatibility with RepView/MSLView prop signatures; unused.
export type { GenieAnswer } from "../data/genie_rep";

export function GenieAskBox({
  variant,
  spaceId,
}: {
  // Tolerated but ignored — chips/chatbox removed per UX direction
  prompts?: unknown;
  variant: "rep" | "msl";
  spaceId: string;
}) {
  const dot = variant === "rep" ? "bg-databricks-orange" : "bg-databricks-navy";

  const directUrl = spaceId ? `${DATABRICKS_HOST}/genie/rooms/${spaceId}` : "";
  const embedUrl = spaceId
    ? `${DATABRICKS_HOST}/embed/genie/rooms/${spaceId}?o=${DATABRICKS_WORKSPACE_ID}`
    : "";

  if (!spaceId) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 text-sm">
        Genie space ID not configured. Set <code>VITE_GENIE_SPACE_ID_REP</code> /{" "}
        <code>VITE_GENIE_SPACE_ID_MSL</code> in <code>app.yaml</code>.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <div className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
        <span className="text-xs font-semibold text-databricks-navy uppercase tracking-wider">
          Databricks AI/BI Genie
        </span>
        <span className="text-[10px] text-slate-400">scoped to this account · governed by Unity Catalog</span>
        <a
          href={directUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-[10px] text-databricks-orange font-semibold uppercase tracking-wider hover:underline"
        >
          Open in Genie ↗
        </a>
      </div>
      <div className="bg-white">
        <iframe
          key={embedUrl}
          src={embedUrl}
          title="Databricks Genie"
          className="w-full"
          style={{ height: 600, border: "none" }}
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
