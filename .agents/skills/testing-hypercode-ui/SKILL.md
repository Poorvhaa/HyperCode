---
name: testing-hypercode-ui
description: Test the HyperCode marketing site end-to-end (footer, navigation CTAs, and the floating AI chatbot launcher) in English and Spanish. Use when verifying UI/UX changes to footer.tsx, navigation.tsx, or ai-consultant.tsx.
---

# Testing HyperCode UI (footer, nav CTAs, AI chatbot)

Next.js 16 + TypeScript + Tailwind, bilingual via next-intl. Locales are path-prefixed: `/en` and `/es` (shared components, so a change usually applies to both automatically).

## Run locally
```bash
npm install            # eslint is NOT a dependency; `npm run lint` will fail with "eslint: not found"
npm run build          # ~30s; passes even with TS errors (next.config sets typescript.ignoreBuildErrors)
npm run start          # serves http://localhost:3000
```
- Typecheck with `npx tsc --noEmit`. The repo has many PRE-EXISTING TS errors in untouched files (api routes, solutions pages, forms); scope your check to the files you changed, e.g. `npx tsc --noEmit 2>&1 | grep components/your-file`.
- Supabase env vars are usually absent locally — the newsletter API logs a config warning at build/runtime. This is expected and unrelated to presentation changes.
- `tsconfig.tsbuildinfo` and `next-env.d.ts` are tracked and get rewritten by build/tsc; `git checkout --` them before committing to keep diffs clean.

## Key components
- `components/footer.tsx` — footer content/layout (columns: Company, Solutions, Legal, Support; plus address/phone/email/social/copyright).
- `components/navigation.tsx` — top nav + CTAs. Desktop and mobile CTAs.
- `components/ai-consultant.tsx` — the single global floating chatbot launcher, rendered in `app/[locale]/layout.tsx` so it appears on every page. State machine: `windowState` is `'closed' | 'minimized' | 'open'`. The `outsideClickAction` prop must use those exact values — using `'minimize'`/`'close'` sets an invalid state and makes the whole widget disappear until reload.

## What to verify (quick smoke test, both /en and /es)
1. **Footer**: scroll to bottom (`End` key). Confirm expected columns present and aligned, copyright sits directly under the divider (no empty band), address `2095 Hammond Dr`, phone `+1 (510) 203-9270`, email `info@hypercodeus.com`, LinkedIn + GitHub icons present.
2. **Single AI entry point**: the top-right nav CTA ("Schedule Consultation" / "Programar Consulta") should navigate to `/<locale>/consultation`, NOT open the chat. Only ONE floating launcher (bottom-right, `aria-label="Open AI Consultant"`) should open the chat.
3. **Chatbot behavior**: click launcher → window opens ("AI Advisor Online"). Selecting a suggested query (e.g. "Cloud Migration") can drive an interactive "AI Project Assessor" form flow. Click outside the window → it should minimize back to a STILL-VISIBLE launcher (not vanish). Re-opening should restore prior conversation/form state (it is React state on the globally-mounted widget, preserved across client-side navigation).

## Fast DOM checks without the browser
```bash
curl -s http://localhost:3000/en | grep -o "Schedule Consultation"      # nav CTA present
curl -s http://localhost:3000/en | grep -o "Enterprise Certifications"  # should be empty if cert block removed
```
Note: strings like "SOC 2", "HIPAA", "Snowflake" also appear in non-footer homepage sections (case study, tech ecosystem). Don't confuse those with the footer certifications block.

## Devin Secrets Needed
- None required for UI testing of the marketing pages. Supabase / Resend keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, Resend API key) would only be needed to exercise newsletter/lead/contact backend submission end-to-end.
