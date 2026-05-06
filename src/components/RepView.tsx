import { repData } from "../data/account_rep";
import { repPrompts } from "../data/genie_rep";
import { GenieAskBox } from "./GenieAskBox";
import { Panel, HeroPanel } from "./Panel";

export function RepView({ spaceId }: { spaceId: string }) {
  const s = repData.suspect;
  return (
    <div className="space-y-3">
      <GenieAskBox prompts={repPrompts} variant="rep" spaceId={spaceId} />

      <Panel title="Pre-Call Brief" accent="mint">
        <div className="text-[11px] text-slate-500 mb-1">Last interaction</div>
        <div className="text-sm mb-3">{repData.preCallBrief.lastInteraction}</div>
        <div className="text-[11px] text-slate-500 mb-1">Suggested talking points</div>
        <ul className="text-sm space-y-1">
          {repData.preCallBrief.suggestedTopics.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-databricks-orange">●</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Suggested Content" accent="slate">
        <ul className="text-sm space-y-1.5">
          {repData.suggestedContent.map((c) => (
            <li key={c} className="bg-slate-50 rounded px-3 py-2">
              {c}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Practice Context · Referral Pathway" accent="navy">
        <div className="grid grid-cols-2 gap-2">
          <Row label="CoE affiliation" value={repData.practice.coeAffiliation} />
          <Row label="PYP-capable on site" value={repData.practice.pypCapable ? "Yes · onsite" : "No"} />
          <Row label="Cardiologists in practice" value={String(repData.practice.cardiologists)} />
          <Row
            label="Nearest CoE"
            value={`${repData.practice.nearestCoE} · ${repData.practice.nearestCoEDistanceMin} min · ${repData.practice.nearestCoESpecialists} specialists`}
          />
        </div>
      </Panel>

      <HeroPanel
        eyebrow="Suspect Patient Signal · HCP-aggregate"
        title={`${s.count} suspect ATTR-CM patients in this practice`}
        variant="rep"
      >
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Stat label="Avg age" value={`${s.avgAge}`} />
          <Stat label="Carpal tunnel surgery (last 18 mo)" value={`${s.carpalTunnel} of ${s.count}`} />
          <Stat label="Low-voltage ECG" value={s.lowVoltageECG} />
          <Stat label="Last PYP order" value={`${s.lastPYPOrderDays} days ago (~18 mo)`} />
        </div>
        <div className="mt-3 text-[11px] opacity-80 italic">
          {s.suppression} · de-identified · scored in-tenant via foundation models
        </div>
      </HeroPanel>

      <Panel title="Competitor Coverage · CMS Open Payments" badge="last 12 mo" accent="orange">
        <div className="grid grid-cols-3 gap-2">
          {repData.competitorCoverage.map((c) => (
            <div key={c.brand} className="bg-slate-50 rounded-lg p-2.5">
              <div className="text-[11px] text-slate-500 truncate">{c.brand}</div>
              <div className="text-base font-semibold text-databricks-navy">{c.spend}</div>
              <div className="text-[10px] text-slate-500">{c.trend}</div>
              <div className="text-[10px] text-slate-400 mt-1">{c.note}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/15 rounded-md px-2.5 py-2">
      <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs">
      <div className="text-slate-500">{label}</div>
      <div className="text-databricks-navy font-medium">{value}</div>
    </div>
  );
}
