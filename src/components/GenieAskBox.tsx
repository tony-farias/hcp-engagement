import { useState } from "react";
import type { GenieAnswer } from "../data/genie_rep";

declare global {
  interface Window {
    __DATABRICKS_HOST__?: string;
    __GENIE_SPACE_ID_REP__?: string;
    __GENIE_SPACE_ID_MSL__?: string;
  }
}

const DATABRICKS_HOST =
  (typeof window !== "undefined" && window.__DATABRICKS_HOST__) ||
  (import.meta.env.VITE_DATABRICKS_HOST as string | undefined) ||
  "https://fe-vm-hls-amer.cloud.databricks.com";

type Mode = "sample" | "iframe";

export function GenieAskBox({
  prompts,
  variant,
  spaceId,
}: {
  prompts: GenieAnswer[];
  variant: "rep" | "msl";
  spaceId: string;
}) {
  const [active, setActive] = useState<GenieAnswer | null>(null);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("sample");
  const [iframeQuery, setIframeQuery] = useState<string>("");

  const accent = variant === "rep" ? "ring-databricks-orange/40" : "ring-databricks-navy/40";
  const dot = variant === "rep" ? "bg-databricks-orange" : "bg-databricks-navy";

  const baseGenieUrl = spaceId ? `${DATABRICKS_HOST}/genie/rooms/${spaceId}` : "";
  const genieIframeUrl = baseGenieUrl
    ? iframeQuery
      ? `${baseGenieUrl}?q=${encodeURIComponent(iframeQuery)}`
      : baseGenieUrl
    : "";
  const genieDirectUrl = iframeQuery
    ? `${baseGenieUrl}?q=${encodeURIComponent(iframeQuery)}`
    : baseGenieUrl;

  const ask = (q: GenieAnswer) => {
    setInput(q.question);
    setActive(q);
    setIframeQuery(q.question);
    setMode("iframe");
  };

  const askFromInput = () => {
    if (!input.trim()) return;
    setIframeQuery(input);
    setMode("iframe");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <div className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
        <span className="text-xs font-semibold text-databricks-navy uppercase tracking-wider">
          Databricks AI/BI Genie
        </span>
        <span className="text-[10px] text-slate-400">scoped to this account · governed by Unity Catalog</span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setMode(mode === "iframe" ? "sample" : "iframe")}
            className="text-[10px] uppercase tracking-wider text-slate-500 hover:text-databricks-navy font-semibold"
            title="Toggle between live Genie iframe and sample answers"
          >
            {mode === "iframe" ? "Show sample" : "Show live"}
          </button>
          {genieDirectUrl && (
            <a
              href={genieDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-databricks-orange font-semibold uppercase tracking-wider hover:underline"
            >
              Open in Genie ↗
            </a>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className={`flex items-center gap-2 bg-slate-50 rounded-lg p-2 ring-1 ${accent}`}>
          <span className="text-slate-400 pl-1">▸</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askFromInput()}
            placeholder="Ask anything about this account…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
          />
          <button
            onClick={askFromInput}
            className="text-xs px-3 py-1 rounded-md bg-databricks-navy text-white hover:bg-slate-800"
          >
            Ask
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {prompts.map((p) => (
            <button
              key={p.question}
              onClick={() => ask(p)}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-databricks-orange hover:text-databricks-orange transition text-slate-600"
            >
              {p.question}
            </button>
          ))}
        </div>

        {mode === "iframe" && genieIframeUrl && (
          <div className="mt-4 rounded-lg border border-slate-200 overflow-hidden bg-white">
            <iframe
              key={genieIframeUrl}
              src={genieIframeUrl}
              title="Databricks Genie"
              className="w-full"
              style={{ height: 520, border: "none" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
            <div className="px-3 py-2 bg-slate-50 text-[10px] text-slate-500 border-t border-slate-200 flex items-center justify-between">
              <span>
                Live Databricks AI/BI Genie · space {spaceId || "(not configured)"} · auth via your Databricks SSO session
              </span>
              {genieDirectUrl && (
                <a
                  href={genieDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-databricks-orange font-semibold hover:underline"
                >
                  Open in new tab ↗
                </a>
              )}
            </div>
          </div>
        )}

        {mode === "iframe" && !genieIframeUrl && (
          <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4 text-sm">
            Genie space ID not configured. Set <code>VITE_GENIE_SPACE_ID_REP</code> /{" "}
            <code>VITE_GENIE_SPACE_ID_MSL</code> in <code>app.yaml</code>.
          </div>
        )}

        {mode === "sample" && (
          <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-semibold">
              Sample answer (live answers via Genie above)
            </div>
            {active ? (
              <>
                <div className="text-sm text-databricks-navy leading-relaxed">{active.answer}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {active.sources.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-500">
                Click a chip above or type a question, then press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[10px]">Ask</kbd> to query the live Genie space. Sample answers appear here as a fallback if the iframe is blocked.
              </div>
            )}
            {prompts[0] && !active && (
              <button
                onClick={() => ask(prompts[0])}
                className="mt-3 text-xs px-3 py-1.5 rounded-md bg-databricks-orange text-white hover:bg-orange-600"
              >
                Try the first question
              </button>
            )}
            {genieDirectUrl && (
              <div className="mt-3">
                <a
                  href={genieDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs px-3 py-1.5 rounded-md bg-databricks-navy text-white hover:bg-slate-800"
                >
                  Open in Genie ↗
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
