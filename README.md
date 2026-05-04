# HCP Engagement Demo — Sales Rep & MSL views

A presentation prototype showing what an embedded Databricks App + AI/BI Genie surface looks like inside Veeva Vault CRM, with role-based tabs for **Sales Reps** and **MSLs** — both backed by the same Databricks lakehouse but bound to different governed views (and a different Genie space per persona).

## What's in here

- **One app, two governed views** — toggle Sales Rep / MSL at the top of the iPad surface; the chrome rebinds and the embedded Genie space switches between commercial and medical scope.
- **Genie ask-box** with canned questions and pre-baked answers, plus a "Live ✦" toggle that opens the live Genie iframe for the active persona.
- **Two real HCPs**: Marcus Whitfield, MD (Carolina Cardiology Associates, Greenville SC) for the Rep tab; Mike Smith, MD (Greenville Memorial) for the MSL tab.
- **Compliance envelope** visible: rep view is HCP-aggregate (k-anonymity ≥ 11) with Open Payments; MSL view is firewalled from prescribing and Open Payments.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Genie spaces

- Rep tab → `01f147ee83391102be3b9937a7ce61bd`
- MSL tab → `01f147ee83761484a3a1a5e5dc74a685`

Wired in `src/App.tsx` with build-time env-var fallbacks (`VITE_GENIE_SPACE_ID_REP`, `VITE_GENIE_SPACE_ID_MSL`) and runtime overrides on `window.__GENIE_SPACE_ID_REP__` / `window.__GENIE_SPACE_ID_MSL__`. Both spaces are also declared as resources in `app.yaml` so the Databricks Apps service principal gets `CAN_RUN`.

## Demo flow

1. Land on the Sales Rep tab — show suspect-patient hero, competitor coverage, pre-call brief, referral pathway
2. Click a Genie chip — *"Why isn't Dr. Whitfield writing?"* — show the answer + sources, then toggle "Live ✦" to drop in the actual Rep Genie space
3. Switch to the **MSL** tab — same iPad chrome, different content (Since-Last-Touch, Scientific Footprint, KOL Trajectory) and a different Genie space
4. Click an MSL Genie chip — *"Summarize Mike Smith's recent work."*
5. Land the punchline: same lakehouse, two compliantly governed views, two different Genie scopes — all from one App.

## File map

```
src/
  App.tsx                   role toggle + page chrome + per-tab Genie space wiring
  components/
    IpadFrame.tsx           outer iPad device frame
    VaultShell.tsx          Vault CRM header + tab nav + action bar (parameterized on role + account)
    GenieAskBox.tsx         Genie input + chips + canned + live iframe (takes a spaceId prop)
    Panel.tsx               reusable panel / hero panel
    RepView.tsx             Whitfield panels
    MSLView.tsx             Smith panels
  data/
    account_rep.ts          Whitfield account + repData
    account_msl.ts          Smith account + mslData
    genie_rep.ts            canned Rep Genie Q&A + GenieAnswer type
    genie_msl.ts            canned MSL Genie Q&A
```
