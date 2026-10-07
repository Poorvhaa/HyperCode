const icon = {
  flow: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/></svg>',
  growth: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  gauge: '<svg viewBox="0 0 24 24"><path d="M12 14l4-4"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  scale: '<svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><path d="M21 3l-7 7M3 21l7-7"/></svg>',
  control: '<svg viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
  cart: '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"/></svg>',
  code: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  plug: '<svg viewBox="0 0 24 24"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/></svg>',
};

const logo = '<img class="hc-roi-logo" src="/hypercodeit.logo.webp" width="40" height="40" alt="HyperCode" loading="lazy" decoding="async" />';

const toc = [
  ['capability', 'From Tool to Capability'],
  ['flywheel', 'The Real ROI Is a Flywheel'],
  ['calculate', 'How to Calculate the ROI'],
  ['build-vs-buy', 'Build vs. Buy: Stop Comparing Price Tags'],
  ['protecting-roi', 'Protecting ROI From Strategy to Production'],
  ['hypercode', 'How HyperCode Turns ROI Into a Working Solution'],
  ['takeaway', 'From Software Investment to Business Advantage'],
]
  .map(([id, label]) => `      <li><a class="hc-roi-toc-link" href="#${id}">${label}</a></li>`)
  .join('\n');

const sceneStages = ['Measurable problem', 'Baseline', 'Build', 'Connect', 'Instrument', 'Compounding value']
  .map((s) => `        <li>${s}</li>`)
  .join('\n');

const lever = (ic: string, title: string, change: string, kpi: string, tone = '') =>
  `<li class="hc-roi-lever"><span class="hc-roi-icon${tone}" aria-hidden="true">${ic}</span><div><strong>${title}</strong><p>${change}</p><span class="hc-roi-kpi">${kpi}</span></div></li>`;

const wheel = (pos: string, title: string) => `<li class="hc-roi-w${pos}"><span>${title}</span></li>`;

const item = (text: string) => `<li>${text}</li>`;

const caseRow = (measure: string, current: string, target: string, impact: string) =>
  `<tr><th scope="row">${measure}</th><td data-label="Current state">${current}</td><td data-label="Target state">${target}</td><td data-label="Potential impact">${impact}</td></tr>`;

const dim = (name: string, buy: string, build: string) =>
  `<div class="hc-roi-dim" role="row"><span class="hc-roi-dim-name" role="rowheader">${name}</span><span role="cell"><em>Buy / configure</em>${buy}</span><span role="cell"><em>Build custom</em>${build}</span></div>`;

const stage = (name: string, proof: string) => `<li><strong>${name}</strong><p>${proof}</p></li>`;

const pathStep = (name: string, text: string) => `<li><strong>${name}</strong><p>${text}</p></li>`;

export const roiCustomBusinessSoftwareContentEn = `
<style>
  .hc-roi-visual { margin: 2.25rem 0; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid #dbe5f5; background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%); max-width: 100%; overflow: hidden; }
  .hc-roi-visual-dark { background: radial-gradient(circle at 50% 0%, #123a9c 0%, #0A1F6B 55%, #06123F 100%); border-color: #0A1F6B; color: #ffffff; }
  .hc-roi-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 0 0 1rem; }
  .hc-roi-kicker { margin: 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #145BFF; }
  .hc-roi-title { margin: 0.2rem 0 0; font-size: 1.05rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-roi-visual-dark .hc-roi-kicker { color: #25B5FF; }
  .hc-roi-visual-dark .hc-roi-title { color: #ffffff; }
  .hc-roi-logo { flex-shrink: 0; width: 40px; height: 40px; border-radius: 0.6rem; background: #ffffff; padding: 3px; box-shadow: 0 1px 3px rgba(10, 31, 107, 0.15); object-fit: contain; }
  ol.hc-roi-stages, ul.hc-roi-levers, ul.hc-roi-wheel, ul.hc-roi-list, ul.hc-roi-questions, ul.hc-roi-options, ul.hc-roi-rule, ol.hc-roi-proof, ol.hc-roi-path, ul.hc-roi-motto { list-style: none; margin: 0; padding: 0; }
  .hc-roi-icon { flex-shrink: 0; width: 2.1rem; height: 2.1rem; border-radius: 0.65rem; display: grid; place-items: center; color: #ffffff; background: linear-gradient(135deg, #145BFF, #25B5FF); }
  .hc-roi-icon svg { width: 1.05rem; height: 1.05rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-roi-icon-green { background: linear-gradient(135deg, #2f9a00, #48B900); }
  .hc-roi-icon-navy { background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-roi-caption { margin: 0.9rem 0 0; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }
  .hc-roi-visual-dark .hc-roi-caption { color: #bcd3ff; }
  .hc-roi-takeaway { margin: 1.75rem 0; padding: 0.95rem 1.15rem; border-radius: 0.9rem; border-left: 4px solid #48B900; background: linear-gradient(90deg, #eef4ff 0%, #f7faff 100%); }
  .hc-roi-takeaway strong { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #2f7a00; }
  .hc-roi-takeaway p { margin: 0; font-size: 0.98rem; line-height: 1.5; font-weight: 700; color: #0A1F6B; }
  .hc-roi-note { margin: 1.75rem 0; padding: 0.95rem 1.15rem; border-radius: 0.9rem; border-left: 4px solid #f59e0b; background: #fffbeb; }
  .hc-roi-note strong { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #92400e; }
  .hc-roi-note p { margin: 0; font-size: 0.95rem; line-height: 1.5; font-weight: 600; color: #422006; }
  p.hc-roi-quote { margin: 1.75rem 0; padding: 1.1rem 1.25rem; border-radius: 1rem; background: #0A1F6B; color: #ffffff; font-size: 1.05rem; line-height: 1.45; font-weight: 800; }
  p.hc-roi-quote::before { content: "\\201C"; display: block; font-size: 2rem; line-height: 1; color: #25B5FF; }
  p.hc-roi-subtitle { margin: 0 0 1.25rem; font-size: 1.05rem; line-height: 1.55; font-weight: 600; color: #475569; }
  p.hc-roi-eyebrow { margin: 3rem 0 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-roi-eyebrow + h2 { margin-top: 0.35rem; }
  h2[id] { scroll-margin-top: 7rem; }
  h3.hc-roi-h3 { margin: 1.5rem 0 0.4rem; font-size: 1.05rem; font-weight: 800; color: #0A1F6B; }

  .hc-roi-toc { margin: 2rem 0; border-radius: 1rem; border: 1px solid #dbe5f5; background: #f7faff; }
  .hc-roi-toc summary { cursor: pointer; padding: 0.95rem 1.2rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #0A1F6B; }
  .hc-roi-toc summary:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; border-radius: 1rem; }
  .hc-roi-toc ol { display: grid; gap: 0.1rem 1.25rem; margin: 0; padding: 0 1.2rem 1rem; list-style: none; }
  .hc-roi-toc li { margin: 0; }
  .hc-roi-toc .hc-roi-toc-link { display: block; padding: 0.35rem 0.4rem; border-radius: 0.5rem; font-size: 0.9rem; line-height: 1.35; font-weight: 700; color: #0A1F6B; text-decoration: none; }
  .hc-roi-toc .hc-roi-toc-link:hover { background: #eaf1ff; color: #145BFF; }
  .hc-roi-toc .hc-roi-toc-link:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; }

  /* Animated scene */
  .hc-roi-scene { display: block; width: 100%; height: auto; border-radius: 0.9rem; background: rgba(6, 18, 63, 0.55); border: 1px solid rgba(37, 181, 255, 0.25); }
  .hc-roi-scene .s-paper { fill: #334155; stroke: #f59e0b; stroke-width: 1.5; }
  .hc-roi-scene .s-paper-line { fill: none; stroke: #fbbf24; stroke-width: 1.4; stroke-linecap: round; }
  .hc-roi-scene .s-clock { fill: none; stroke: #fbbf24; stroke-width: 2; stroke-linecap: round; }
  .hc-roi-scene .s-win { fill: rgba(255, 255, 255, 0.06); stroke: #8fd3ff; stroke-width: 1.5; }
  .hc-roi-scene .s-blk { fill: #145BFF; stroke: #8fd3ff; stroke-width: 1; }
  .hc-roi-scene .s-top { fill: #25B5FF; }
  .hc-roi-scene .s-link { fill: none; stroke: #25B5FF; stroke-width: 1.8; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
  .hc-roi-scene .s-int { fill: #ffffff; stroke: #25B5FF; stroke-width: 1.6; }
  .hc-roi-scene .s-int-db { fill: #145BFF; stroke: #8fd3ff; stroke-width: 1.4; }
  .hc-roi-scene .s-int-mark { fill: none; stroke: #145BFF; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-roi-scene .s-axis { fill: none; stroke: rgba(255, 255, 255, 0.35); stroke-width: 1.5; }
  .hc-roi-scene .s-bar { fill: #48B900; transform-box: fill-box; transform-origin: bottom; }
  .hc-roi-scene .s-trend { fill: none; stroke: #7ddc3c; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
  .hc-roi-scene .s-arrow { fill: #7ddc3c; }
  .hc-roi-scene .s-track { fill: none; stroke: rgba(255, 255, 255, 0.18); stroke-width: 4; stroke-linecap: round; }
  .hc-roi-scene .s-progress { fill: none; stroke: #25B5FF; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
  .hc-roi-scene .s-node { fill: #25B5FF; stroke: #06123F; stroke-width: 3; transform-box: fill-box; transform-origin: center; }
  .hc-roi-scene .s-node-end { fill: #48B900; }
  .hc-roi-scene .s-loop { fill: none; stroke: #7ddc3c; stroke-width: 2; stroke-dasharray: 1; stroke-dashoffset: 0; stroke-linecap: round; }
  .hc-roi-scene .s-loop-head { fill: #7ddc3c; }
  ol.hc-roi-stages { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-top: 1rem; }
  .hc-roi-stages li { position: relative; z-index: 0; margin: 0; padding: 0.35rem 0.7rem; border-radius: 999px; overflow: hidden; font-size: 0.74rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); }
  .hc-roi-stages li::before { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(135deg, #145BFF, #25B5FF); opacity: 0; }
  .hc-roi-stages li:first-child { color: #fde68a; }
  .hc-roi-stages li:last-child::before { background: linear-gradient(135deg, #2f9a00, #48B900); }

  /* Value levers */
  .hc-roi-levers { display: grid; gap: 0.6rem; }
  .hc-roi-lever { margin: 0; display: flex; gap: 0.75rem; align-items: flex-start; min-width: 0; padding: 0.85rem 0.9rem; border-radius: 1rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-roi-lever div { min-width: 0; }
  .hc-roi-lever strong { display: block; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #0A1F6B; }
  .hc-roi-lever p { margin: 0.2rem 0 0.45rem; font-size: 0.86rem; line-height: 1.4; font-weight: 600; color: #475569; }
  .hc-roi-kpi { display: inline-block; padding: 0.2rem 0.55rem; border-radius: 999px; background: #ecfccb; color: #2f5c00; font-size: 0.74rem; line-height: 1.3; font-weight: 800; }

  /* Strategic test */
  .hc-roi-test { margin: 2rem 0; padding: 1.25rem; border-radius: 1.25rem; background: linear-gradient(135deg, #0A1F6B, #145BFF); color: #ffffff; }
  .hc-roi-test p { margin: 0; }
  .hc-roi-test .hc-roi-kicker { color: #8fd3ff; }
  .hc-roi-test .hc-roi-test-main { margin: 0.35rem 0 0.6rem; font-size: 1.2rem; line-height: 1.3; font-weight: 800; letter-spacing: 0.02em; }
  .hc-roi-test .hc-roi-test-sub { font-size: 0.92rem; line-height: 1.5; font-weight: 600; color: #dbe8ff; }

  /* Flywheel */
  .hc-roi-flywheel { position: relative; display: grid; gap: 0.75rem; }
  .hc-roi-core { justify-self: center; margin: 0; padding: 0.9rem 1.3rem; border-radius: 999px; background: linear-gradient(135deg, #0A1F6B, #145BFF); color: #ffffff; text-align: center; font-size: 0.86rem; line-height: 1.25; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; box-shadow: 0 0 0 6px #dbe8ff; }
  .hc-roi-ring { display: none; }
  .hc-roi-wheel { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem; }
  .hc-roi-wheel li { position: relative; z-index: 0; margin: 0; min-width: 0; padding: 0.65rem 0.7rem; border-radius: 0.85rem; overflow: hidden; background: #ffffff; border: 1px solid #cddcf5; text-align: center; font-size: 0.8rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-roi-wheel li::before { content: ""; position: absolute; inset: 0; z-index: -1; background: #e6f9d8; opacity: 0; }

  /* Questions */
  .hc-roi-questions { display: grid; gap: 0.5rem; counter-reset: hc-roi-q; }
  .hc-roi-questions li { position: relative; margin: 0; padding: 0.7rem 0.85rem 0.7rem 2.75rem; border-radius: 0.85rem; background: #ffffff; border: 1px solid #e2e8f0; font-size: 0.9rem; line-height: 1.45; font-weight: 600; color: #1e293b; }
  .hc-roi-questions li::before { counter-increment: hc-roi-q; content: counter(hc-roi-q); position: absolute; left: 0.75rem; top: 0.65rem; width: 1.5rem; height: 1.5rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.75rem; font-weight: 800; color: #ffffff; background: #145BFF; }

  /* Formula and investment vs benefits */
  .hc-roi-formula { margin: 0 0 1rem; padding: 1rem; border-radius: 1rem; background: #0A1F6B; color: #ffffff; text-align: center; font-size: 0.95rem; line-height: 1.5; font-weight: 800; letter-spacing: 0.03em; }
  .hc-roi-formula span { color: #7ddc3c; }
  .hc-roi-formula small { display: block; margin-top: 0.35rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0; color: #bcd3ff; }
  .hc-roi-ledger { display: grid; gap: 0.75rem; }
  .hc-roi-col { min-width: 0; padding: 1rem; border-radius: 1rem; background: #ffffff; border: 2px solid #cbd5e1; }
  .hc-roi-col-benefit { border-color: #48B900; background: #f7fdf2; }
  .hc-roi-col h3 { margin: 0 0 0.6rem; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A1F6B; }
  .hc-roi-col-benefit h3 { color: #2f7a00; }
  .hc-roi-list { display: grid; gap: 0.4rem; }
  .hc-roi-list li { position: relative; margin: 0; padding-left: 1.1rem; font-size: 0.86rem; line-height: 1.4; font-weight: 600; color: #334155; }
  .hc-roi-list li::before { content: ""; position: absolute; left: 0; top: 0.5em; width: 0.45rem; height: 0.45rem; border-radius: 999px; background: #64748b; }
  .hc-roi-col-benefit .hc-roi-list li::before { background: #48B900; }

  /* Illustrative case */
  table.hc-roi-case { width: 100%; border-collapse: separate; border-spacing: 0; margin: 0; font-size: 0.88rem; }
  .hc-roi-case caption { caption-side: bottom; padding-top: 0.75rem; text-align: left; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }
  .hc-roi-case th, .hc-roi-case td { padding: 0.7rem 0.75rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
  .hc-roi-case thead th { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #145BFF; background: #eef4ff; }
  .hc-roi-case tbody th { font-weight: 800; color: #0A1F6B; }
  .hc-roi-case td { font-weight: 600; color: #334155; }
  .hc-roi-case td:last-child { font-weight: 800; color: #2f7a00; }

  /* Build / buy / connect */
  .hc-roi-options { display: grid; gap: 0.6rem; }
  .hc-roi-options li { margin: 0; display: flex; gap: 0.75rem; align-items: flex-start; min-width: 0; padding: 0.9rem; border-radius: 1rem; background: #ffffff; border: 1px solid #cddcf5; }
  .hc-roi-options strong { display: block; font-size: 0.9rem; font-weight: 800; letter-spacing: 0.1em; color: #0A1F6B; }
  .hc-roi-options p { margin: 0.2rem 0 0; font-size: 0.86rem; line-height: 1.4; font-weight: 600; color: #475569; }
  .hc-roi-rule { display: grid; gap: 0.4rem; margin-top: 1rem; }
  .hc-roi-rule li { margin: 0; padding: 0.55rem 0.75rem; border-radius: 0.75rem; background: #0A1F6B; color: #ffffff; font-size: 0.78rem; line-height: 1.35; font-weight: 800; letter-spacing: 0.06em; text-align: center; }
  .hc-roi-rule li span { color: #7ddc3c; }
  .hc-roi-dims { display: grid; gap: 0.5rem; margin-top: 1rem; }
  .hc-roi-dim { display: grid; gap: 0.4rem; padding: 0.75rem; border-radius: 0.85rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-roi-dim span { min-width: 0; font-size: 0.84rem; line-height: 1.4; font-weight: 600; color: #334155; }
  .hc-roi-dim em { display: block; font-style: normal; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
  .hc-roi-dim span:last-child em { color: #145BFF; }
  .hc-roi-dim .hc-roi-dim-name { font-size: 0.86rem; font-weight: 800; color: #0A1F6B; }

  /* Proof stages */
  .hc-roi-proof { position: relative; display: grid; gap: 0.5rem; padding-left: 1.4rem; counter-reset: hc-roi-p; }
  .hc-roi-proof::before { content: ""; position: absolute; left: 0.45rem; top: 0.6rem; bottom: 0.6rem; width: 2px; background: linear-gradient(180deg, #145BFF, #25B5FF, #48B900); }
  .hc-roi-proof li { position: relative; z-index: 0; margin: 0; padding: 0.7rem 0.85rem; border-radius: 0.9rem; overflow: visible; background: #ffffff; border: 1px solid #cddcf5; }
  .hc-roi-proof li::before { content: ""; position: absolute; left: calc(-1.4rem + 0.1rem); top: 1rem; width: 0.8rem; height: 0.8rem; border-radius: 999px; background: #145BFF; box-shadow: 0 0 0 3px #ffffff; }
  .hc-roi-proof li:last-child::before { background: #48B900; }
  .hc-roi-proof strong { display: flex; align-items: center; gap: 0.45rem; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A1F6B; }
  .hc-roi-proof strong::before { counter-increment: hc-roi-p; content: "0" counter(hc-roi-p); font-size: 0.72rem; letter-spacing: 0.04em; color: #145BFF; }
  .hc-roi-proof p { margin: 0.25rem 0 0; font-size: 0.86rem; line-height: 1.4; font-weight: 600; color: #475569; }

  /* HyperCode path */
  .hc-roi-path { display: grid; gap: 0.5rem; counter-reset: hc-roi-h; }
  .hc-roi-path li { margin: 0; min-width: 0; padding: 0.8rem 0.85rem; border-radius: 0.9rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); }
  .hc-roi-path strong { display: flex; align-items: center; gap: 0.5rem; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #ffffff; }
  .hc-roi-path strong::before { counter-increment: hc-roi-h; content: counter(hc-roi-h); flex-shrink: 0; width: 1.5rem; height: 1.5rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; color: #06123F; background: #25B5FF; }
  .hc-roi-path li:last-child strong::before { background: #48B900; color: #ffffff; }
  .hc-roi-path p { margin: 0.35rem 0 0; font-size: 0.84rem; line-height: 1.45; font-weight: 600; color: #cfe0ff; }

  /* Final */
  .hc-roi-final { margin: 1.5rem 0 0; padding: 1.75rem 1.25rem; border-radius: 1.25rem; text-align: center; color: #ffffff; background: radial-gradient(circle at 50% 0%, #1f5fe0 0%, #0A1F6B 60%, #06123F 100%); }
  .hc-roi-final .hc-roi-kicker { color: #7ddc3c; }
  .hc-roi-final-main { margin: 0.4rem 0 0; font-size: 1.2rem; line-height: 1.4; font-weight: 800; color: #ffffff; }
  .hc-roi-final-sub { margin: 0.6rem 0 0; font-size: 0.92rem; line-height: 1.5; font-weight: 600; color: #cfe0ff; }
  ul.hc-roi-motto { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.35rem 1rem; margin: 1.1rem 0 0; }
  .hc-roi-motto li { margin: 0; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.14em; color: #25B5FF; }
  .hc-roi-motto li:last-child { color: #7ddc3c; }
  .hc-roi-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1.25rem; }
  .hc-roi-final .hc-roi-btn { display: inline-block; padding: 0.7rem 1.3rem; border-radius: 999px; background: #ffffff; color: #0A1F6B; font-size: 0.88rem; font-weight: 800; text-decoration: none; }
  .hc-roi-final .hc-roi-btn-ghost { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.5); }
  .hc-roi-final .hc-roi-btn:hover { background: #eaf1ff; color: #0A1F6B; }
  .hc-roi-final .hc-roi-btn:focus-visible { outline: 2px solid #25B5FF; outline-offset: 3px; }

  @media (max-width: 639px) {
    .hc-roi-case thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    .hc-roi-case, .hc-roi-case tbody, .hc-roi-case tr, .hc-roi-case th, .hc-roi-case td { display: block; width: 100%; }
    .hc-roi-case tr { margin-bottom: 0.6rem; border-radius: 0.85rem; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; }
    .hc-roi-case tbody th { background: #eef4ff; }
    .hc-roi-case td { display: flex; justify-content: space-between; gap: 0.75rem; }
    .hc-roi-case td::before { content: attr(data-label); font-size: 0.74rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; }
    .hc-roi-case tr > :last-child { border-bottom: 0; }
  }

  @media (min-width: 640px) {
    .hc-roi-visual { padding: 1.5rem; }
    .hc-roi-toc ol, .hc-roi-levers, .hc-roi-ledger, .hc-roi-path { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hc-roi-wheel { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .hc-roi-options, .hc-roi-rule { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .hc-roi-options li { flex-direction: column; }
    .hc-roi-dim { grid-template-columns: 8rem minmax(0, 1fr) minmax(0, 1fr); align-items: start; }
    .hc-roi-proof li { display: grid; grid-template-columns: 10rem minmax(0, 1fr); gap: 0.75rem; align-items: baseline; }
    .hc-roi-proof p { margin: 0; }
    .hc-roi-test { padding: 1.5rem 1.75rem; }
  }

  @media (min-width: 768px) {
    .hc-roi-flywheel { display: block; height: 23rem; }
    .hc-roi-ring { display: block; position: absolute; left: 50%; top: 50%; width: 15rem; height: 15rem; margin: -7.5rem 0 0 -7.5rem; border-radius: 999px; border: 3px dashed #9cc0ff; }
    .hc-roi-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 9rem; height: 9rem; padding: 0.75rem; display: grid; place-items: center; z-index: 1; }
    .hc-roi-wheel { display: block; }
    .hc-roi-wheel li { position: absolute; width: 30%; max-width: 13rem; }
    .hc-roi-w1 { left: 50%; top: 0; transform: translateX(-50%); }
    .hc-roi-w2 { right: 0; top: 24%; }
    .hc-roi-w3 { right: 0; bottom: 24%; }
    .hc-roi-w4 { left: 50%; bottom: 0; transform: translateX(-50%); }
    .hc-roi-w5 { left: 0; bottom: 24%; }
    .hc-roi-w6 { left: 0; top: 24%; }
    .hc-roi-path { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hc-roi-scene .s-manual { animation: hc-roi-manual 10s ease-in-out infinite both; }
    .hc-roi-scene .s-win { animation: hc-roi-frame 10s ease-in-out infinite both; }
    .hc-roi-scene .s-build { animation: hc-roi-build 10s ease-in-out infinite both; }
    .hc-roi-scene .s-link { animation: hc-roi-link 10s ease-in-out infinite both; }
    .hc-roi-scene .s-int-grp { animation: hc-roi-int 10s ease-in-out infinite both; }
    .hc-roi-scene .s-bar { animation: hc-roi-bar 10s ease-in-out infinite both; }
    .hc-roi-scene .s-trend { animation: hc-roi-trend 10s ease-in-out infinite both; }
    .hc-roi-scene .s-arrow { animation: hc-roi-arrow 10s ease-in-out infinite both; }
    .hc-roi-scene .s-progress { animation: hc-roi-progress 10s linear infinite both; }
    .hc-roi-scene .s-node { animation: hc-roi-node 10s linear infinite both; }
    .hc-roi-scene .s-loop { animation: hc-roi-loop 10s ease-in-out infinite both; }
    .hc-roi-scene .s-loop-head { animation: hc-roi-loop-head 10s ease-in-out infinite both; }
    .hc-roi-scene .s-d1 { animation-delay: 0.4s; }
    .hc-roi-scene .s-d2 { animation-delay: 0.8s; }
    .hc-roi-scene .s-d3 { animation-delay: 1.2s; }
    .hc-roi-scene .s-n1 { animation-delay: 1.5s; }
    .hc-roi-scene .s-n2 { animation-delay: 3s; }
    .hc-roi-scene .s-n3 { animation-delay: 4.5s; }
    .hc-roi-scene .s-n4 { animation-delay: 6s; }
    .hc-roi-scene .s-n5 { animation-delay: 7.5s; }
    .hc-roi-stages li::before { animation: hc-roi-lit 10s linear infinite both; }
    .hc-roi-stages li:nth-child(2)::before { animation-delay: 1.5s; }
    .hc-roi-stages li:nth-child(3)::before { animation-delay: 3s; }
    .hc-roi-stages li:nth-child(4)::before { animation-delay: 4.5s; }
    .hc-roi-stages li:nth-child(5)::before { animation-delay: 6s; }
    .hc-roi-stages li:nth-child(6)::before { animation-delay: 7.5s; }
    .hc-roi-ring { animation: hc-roi-spin 30s linear infinite; }
    .hc-roi-wheel li::before { animation: hc-roi-glow 12s linear infinite both; }
    .hc-roi-wheel li:nth-child(2)::before { animation-delay: 2s; }
    .hc-roi-wheel li:nth-child(3)::before { animation-delay: 4s; }
    .hc-roi-wheel li:nth-child(4)::before { animation-delay: 6s; }
    .hc-roi-wheel li:nth-child(5)::before { animation-delay: 8s; }
    .hc-roi-wheel li:nth-child(6)::before { animation-delay: 10s; }
    @keyframes hc-roi-manual { 0%, 10% { opacity: 1; } 24%, 92% { opacity: 0.3; } 100% { opacity: 1; } }
    @keyframes hc-roi-frame { 0%, 14% { opacity: 0.2; } 22%, 92% { opacity: 1; } 100% { opacity: 0.2; } }
    @keyframes hc-roi-build { 0%, 28% { opacity: 0; } 36%, 92% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hc-roi-link { 0%, 44% { stroke-dashoffset: 1; opacity: 1; } 54%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-roi-int { 0%, 44% { opacity: 0.15; } 54%, 92% { opacity: 1; } 100% { opacity: 0.15; } }
    @keyframes hc-roi-bar { 0%, 64% { transform: scaleY(0.1); } 76%, 92% { transform: scaleY(1); } 100% { transform: scaleY(0.1); } }
    @keyframes hc-roi-trend { 0%, 70% { stroke-dashoffset: 1; opacity: 1; } 82%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-roi-arrow { 0%, 80% { opacity: 0; } 84%, 92% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hc-roi-progress { 0% { stroke-dashoffset: 1; opacity: 1; } 75%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-roi-node { 0% { transform: scale(1); stroke: #06123F; } 4%, 12% { transform: scale(1.5); stroke: #ffffff; } 18%, 100% { transform: scale(1); stroke: #06123F; } }
    @keyframes hc-roi-loop { 0%, 80% { stroke-dashoffset: 1; opacity: 1; } 90%, 95% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-roi-loop-head { 0%, 88% { opacity: 0; } 90%, 95% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hc-roi-lit { 0% { opacity: 0; } 3% { opacity: 1; } 14% { opacity: 1; } 18% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes hc-roi-spin { to { transform: rotate(360deg); } }
    @keyframes hc-roi-glow { 0% { opacity: 0; } 4% { opacity: 1; } 14% { opacity: 1; } 18% { opacity: 0; } 100% { opacity: 0; } }
  }
</style>

<p class="hc-roi-subtitle">How tailored technology drives measurable growth, efficiency and long-term value for modern businesses.</p>

<p>Custom business software development is not automatically a better investment than buying software. Its value appears when technology removes an expensive constraint, supports a differentiated workflow, or gives the business speed, integration, control, or scalability that standard products cannot deliver economically.</p>

<div class="hc-roi-takeaway">
  <strong>Executive idea</strong>
  <p>The strongest software business case starts with a measurable business problem, not a technology wishlist. Define the baseline, model the change, build only what creates value, and instrument the result.</p>
</div>

<figure class="hc-roi-visual hc-roi-visual-dark" aria-labelledby="hc-roi-scene-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Animated overview</p>
      <p class="hc-roi-title" id="hc-roi-scene-title">From Costly Workaround to Compounding Value</p>
    </div>
  </div>
  <svg class="hc-roi-scene" viewBox="0 0 720 260" aria-hidden="true" focusable="false">
    <g class="s-manual">
      <rect class="s-paper" x="22" y="52" width="62" height="44" rx="4" />
      <path class="s-paper-line" d="M30 64h40M30 74h30M30 84h44" />
      <rect class="s-paper" x="40" y="106" width="62" height="44" rx="4" />
      <path class="s-paper-line" d="M48 118h40M48 128h26M48 138h36" />
      <circle class="s-clock" cx="96" cy="48" r="13" />
      <path class="s-clock" d="M96 40v8l5 4" />
    </g>
    <rect class="s-win" x="140" y="28" width="250" height="152" rx="10" />
    <rect class="s-top s-build" x="140" y="28" width="250" height="18" rx="9" />
    <rect class="s-blk s-build s-d1" x="150" y="56" width="56" height="114" rx="6" />
    <rect class="s-blk s-build s-d2" x="216" y="56" width="164" height="48" rx="6" />
    <rect class="s-blk s-build s-d3" x="216" y="112" width="78" height="58" rx="6" />
    <rect class="s-blk s-build s-d3" x="302" y="112" width="78" height="58" rx="6" />
    <path class="s-link" pathLength="1" d="M390 56 H 430" />
    <path class="s-link" pathLength="1" d="M390 104 H 430" />
    <path class="s-link" pathLength="1" d="M390 152 H 430" />
    <g class="s-int-grp">
      <rect class="s-int" x="430" y="42" width="50" height="28" rx="7" />
      <path class="s-int-mark" d="M443 50 l -6 6 l 6 6 M467 50 l 6 6 l -6 6 M458 48 l -6 16" />
    </g>
    <g class="s-int-grp s-d1">
      <ellipse class="s-int-db" cx="455" cy="94" rx="22" ry="6" />
      <path class="s-int-db" d="M433 94 v 20 a 22 6 0 0 0 44 0 v -20" />
    </g>
    <g class="s-int-grp s-d2">
      <path class="s-int" d="M441 166 a 12 12 0 0 1 2 -23 a 15 15 0 0 1 28 3 a 10 10 0 0 1 2 20 z" />
    </g>
    <path class="s-axis" d="M520 40 V 176 H 700" />
    <rect class="s-bar" x="534" y="140" width="22" height="34" rx="2" />
    <rect class="s-bar s-d1" x="566" y="118" width="22" height="56" rx="2" />
    <rect class="s-bar s-d2" x="598" y="96" width="22" height="78" rx="2" />
    <rect class="s-bar s-d3" x="630" y="70" width="22" height="104" rx="2" />
    <path class="s-trend" pathLength="1" d="M530 128 L 576 104 L 610 84 L 668 46" />
    <path class="s-arrow" d="M676 38 l -4 18 l -14 -12 z" />
    <path class="s-track" d="M40 214 H 680" />
    <path class="s-progress" pathLength="1" d="M40 214 H 680" />
    <path class="s-loop" pathLength="1" d="M552 226 C 528 252, 320 252, 298 230" />
    <path class="s-loop-head" d="M291 222 l 14 4 l -9 10 z" />
    <circle class="s-node" cx="40" cy="214" r="7" />
    <circle class="s-node s-n1" cx="168" cy="214" r="7" />
    <circle class="s-node s-n2" cx="296" cy="214" r="7" />
    <circle class="s-node s-n3" cx="424" cy="214" r="7" />
    <circle class="s-node s-n4" cx="552" cy="214" r="7" />
    <circle class="s-node s-node-end s-n5" cx="680" cy="214" r="7" />
  </svg>
  <ol class="hc-roi-stages" aria-label="How a software investment turns into value">
${sceneStages}
  </ol>
  <figcaption class="hc-roi-caption">Manual workarounds give way to a custom application, connected to APIs, data and cloud services, with results instrumented so value can be measured and keep compounding. The chart is conceptual and does not represent measured results.</figcaption>
</figure>

<p>This guide treats software ROI as an operating question: How much does the current way of working cost? What changes after the new system goes live? How quickly does the investment pay back? And which benefits continue to compound as the company grows?</p>

<details class="hc-roi-toc" open>
  <summary>In this article</summary>
  <ol>
${toc}
  </ol>
</details>

<p class="hc-roi-eyebrow">01 | From Tool to Capability</p>
<h2 id="capability">Custom Business Software Development: From Tool to Capability</h2>

<p>Custom business software development is the process of designing, engineering, integrating, deploying and improving software around an organisation's specific workflows, users, data and strategic requirements.</p>

<p>The distinction matters. Off-the-shelf products are built to serve a broad market. Custom software can be designed around the actual sequence of work inside a company, from customer onboarding and quoting to operations, analytics, approvals, inventory, field service or enterprise integrations.</p>

<p>The modern enterprise does not have to choose "all custom" or "all SaaS." HyperCode takes this practical approach as well: use mature capabilities where they make sense, and engineer the differentiated layer where the business needs greater control, integration or scale.</p>

<p>A practical architecture often combines both. Buy mature commodity capabilities. Build the workflows that differentiate the business. Connect them through clean APIs and a deliberate integration layer.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-levers-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Value levers</p>
      <p class="hc-roi-title" id="hc-roi-levers-title">Where Custom Software Can Create Measurable Value</p>
    </div>
  </div>
  <ul class="hc-roi-levers">
    ${lever(icon.flow, 'Operational efficiency', 'Fewer manual steps and handoffs', 'Cycle time &bull; hours/transaction')}
    ${lever(icon.growth, 'Revenue enablement', 'Faster customer and sales workflows', 'Conversion &bull; retention', ' hc-roi-icon-green')}
    ${lever(icon.gauge, 'Decision velocity', 'Faster access to trusted data', 'Reporting time &bull; decision latency', ' hc-roi-icon-navy')}
    ${lever(icon.check, 'Quality', 'Validation and automation reduce rework', 'Error rate &bull; rework cost')}
    ${lever(icon.scale, 'Scalability', 'More volume without equal overhead', 'Cost/transaction &bull; volume/employee', ' hc-roi-icon-green')}
    ${lever(icon.control, 'Control', 'Roadmap, data and integrations aligned to needs', 'Dependency &bull; change lead time', ' hc-roi-icon-navy')}
  </ul>
  <figcaption class="hc-roi-caption">Each lever pairs a typical change with a KPI that can show whether the software created value.</figcaption>
</figure>

<div class="hc-roi-test">
  <p class="hc-roi-kicker">The strategic test</p>
  <p class="hc-roi-test-main">Build where the business is different.</p>
  <p class="hc-roi-test-sub">If the process is standardised and well served by mature software, buying may be rational. If the process is specialised, strategic or costly to compromise, custom development deserves a deeper TCO and ROI analysis.</p>
</div>

<p>Once the strategic fit is established, the next question is whether the investment can create measurable business value. Custom business software development can generate returns through faster workflows, lower operating costs, better decisions, improved customer experiences and greater scalability. It can also reduce the hidden costs created by disconnected systems, manual workarounds, repetitive data entry and processes that become increasingly expensive as the business grows.</p>

<p>The strongest business case therefore looks beyond the initial development cost. It considers what the software can save, enable, protect and improve over time. When these benefits are measured together, custom software becomes easier to evaluate: not simply as an IT expense, but as an investment in the way the business operates and grows.</p>

<p class="hc-roi-quote">Great software does more than reduce costs. It creates room for the business to move faster.</p>

<p>That is where investment begins to turn into measurable growth.</p>

<p class="hc-roi-eyebrow">02 | The Flywheel</p>
<h2 id="flywheel">The Real ROI of Custom Software Is a Flywheel</h2>

<p>The biggest mistake in software ROI analysis is looking for one savings number. In practice, returns can appear across several connected outcomes.</p>

<p>The ROI of custom software is rarely a single saving. It can emerge through faster workflows, lower operating costs, stronger customer experiences, better decisions, increased capacity and the ability to scale without adding the same level of overhead. The key is to measure these outcomes together.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-wheel-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Connected outcomes</p>
      <p class="hc-roi-title" id="hc-roi-wheel-title">The Custom Software ROI Flywheel</p>
    </div>
  </div>
  <div class="hc-roi-flywheel">
    <span class="hc-roi-ring" aria-hidden="true"></span>
    <p class="hc-roi-core">Custom software ROI</p>
    <ul class="hc-roi-wheel">
      ${wheel('1', 'Faster workflows')}
      ${wheel('2', 'Lower operating costs')}
      ${wheel('3', 'Stronger customer experiences')}
      ${wheel('4', 'Better decisions')}
      ${wheel('5', 'Increased capacity')}
      ${wheel('6', 'Scale without equal overhead')}
    </ul>
  </div>
  <figcaption class="hc-roi-caption">Returns rarely arrive as one number. Measured together, each outcome reinforces the next.</figcaption>
</figure>

<h3 class="hc-roi-h3">Six questions that turn a technology proposal into a business case</h3>
<ul class="hc-roi-questions">
  <li>How many hours does the current workflow consume every month?</li>
  <li>What does one error, delay, or rework cycle actually cost?</li>
  <li>Where does the current customer journey lose revenue or retention?</li>
  <li>How much integration work exists because systems were never designed to work together?</li>
  <li>What happens to operating cost when transaction or customer volume doubles?</li>
  <li>Which KPI will prove the software created value after launch?</li>
</ul>

<div class="hc-roi-note">
  <strong>The important distinction</strong>
  <p>Recovered employee capacity is not automatically the same as cash savings. Finance teams should separate realised cost reduction, capacity value, revenue impact and avoided cost.</p>
</div>

<p class="hc-roi-eyebrow">03 | The Math</p>
<h2 id="calculate">How to Calculate the ROI</h2>

<p>The mathematics is simple. The credibility comes from disciplined assumptions. HyperCode's approach starts by aligning the solution roadmap with business KPIs so the investment can be evaluated against a defined baseline.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-ledger-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Cost vs. long-term value</p>
      <p class="hc-roi-title" id="hc-roi-ledger-title">Count the Full Investment and the Full Benefits</p>
    </div>
  </div>
  <p class="hc-roi-formula">ROI (%) = (<span>Total benefits</span> &minus; Total investment) &divide; Total investment &times; 100<small>Use the formula over a defined period, often three to five years for a meaningful enterprise comparison.</small></p>
  <div class="hc-roi-ledger">
    <div class="hc-roi-col">
      <h3>Include the full investment</h3>
      <ul class="hc-roi-list">
        ${item('Discovery, business analysis and architecture')}
        ${item('UX/UI design and engineering')}
        ${item('Data migration and integrations')}
        ${item('Testing, security, compliance and deployment')}
        ${item('Cloud infrastructure and third-party services')}
        ${item('Training, adoption and change management')}
        ${item('Post-launch maintenance, monitoring and enhancement')}
      </ul>
    </div>
    <div class="hc-roi-col hc-roi-col-benefit">
      <h3>Include the full benefits</h3>
      <ul class="hc-roi-list">
        ${item('Recovered capacity from automation')}
        ${item('Revenue gained or protected')}
        ${item('Lower error and rework costs')}
        ${item('Retired or consolidated software spend')}
        ${item('Reduced downtime and operational disruption')}
        ${item('Faster product/service launches')}
        ${item('Improved customer retention or service capacity')}
      </ul>
    </div>
  </div>
</figure>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-case-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Illustrative example</p>
      <p class="hc-roi-title" id="hc-roi-case-title">An Illustrative Business Case</p>
    </div>
  </div>
  <table class="hc-roi-case">
    <thead>
      <tr><th scope="col">Measure</th><th scope="col">Current state</th><th scope="col">Target state</th><th scope="col">Potential impact</th></tr>
    </thead>
    <tbody>
      ${caseRow('Processing time', '12 min', '5 min', '58% faster')}
      ${caseRow('Manual effort', '4,000 hrs/month', '1,700 hrs/month', '2,300 hrs recovered')}
      ${caseRow('Error rate', '3.0%', '1.0%', 'Less rework')}
      ${caseRow('Approval cycle', '2.5 days', '0.5 day', 'Faster throughput')}
    </tbody>
    <caption>Illustrative figures that show how a baseline and target state can be framed. They are not results from a specific client or project.</caption>
  </table>
</figure>

<p>Teams that want to measure these outcomes reliably usually need trusted reporting underneath the application. That is where <a href="/en/solutions/business-intelligence">business intelligence</a> and <a href="/en/solutions/data-engineering-solutions">data engineering</a> support the business case after launch.</p>

<p class="hc-roi-eyebrow">04 | Build vs. Buy</p>
<h2 id="build-vs-buy">Build vs. Buy: Stop Comparing Price Tags</h2>

<p class="hc-roi-quote">The real question isn't build or buy. It's where your business needs to be different.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-options-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Three options</p>
      <p class="hc-roi-title" id="hc-roi-options-title">Buy, Build or Connect</p>
    </div>
  </div>
  <ul class="hc-roi-options">
    <li><span class="hc-roi-icon hc-roi-icon-navy" aria-hidden="true">${icon.cart}</span><div><strong>BUY</strong><p>When the problem is common, proven, and already solved well.</p></div></li>
    <li><span class="hc-roi-icon" aria-hidden="true">${icon.code}</span><div><strong>BUILD</strong><p>When the workflow is unique, business-critical, or too valuable to compromise.</p></div></li>
    <li><span class="hc-roi-icon hc-roi-icon-green" aria-hidden="true">${icon.plug}</span><div><strong>CONNECT</strong><p>When the smartest answer is to bring existing systems together and build only what is missing.</p></div></li>
  </ul>
  <ul class="hc-roi-rule" aria-label="A simple decision rule">
    <li>Common problem <span>&rarr; Buy</span></li>
    <li>Unique advantage <span>&rarr; Build</span></li>
    <li>Mixed requirements <span>&rarr; Integrate + customize</span></li>
  </ul>
  <div class="hc-roi-dims" role="table" aria-label="Buy or configure compared with build custom">
    ${dim('Speed', 'Usually faster to start', 'Requires discovery and engineering')}
    ${dim('Fit', 'Broad-market workflows', 'Designed around specific workflows')}
    ${dim('Differentiation', 'Bound by product capabilities', 'Can encode proprietary processes')}
    ${dim('Control', 'Vendor roadmap', 'Greater roadmap control')}
    ${dim('Integration', 'Depends on connectors/APIs', 'Can be designed for the landscape')}
    ${dim('Operating model', 'Recurring license + admin', 'Build + infrastructure + maintenance')}
  </div>
</figure>

<p>Don't build what the market has already perfected. Don't buy what makes your business different. That balance is where technology becomes a business advantage.</p>

<h3 class="hc-roi-h3">The third option: hybrid</h3>
<p>Many organisations can buy the system of record and build a focused layer around it. This can preserve mature commodity functionality while creating a custom experience where the company's workflow actually differs. When legacy platforms are part of that picture, <a href="/en/insights/enterprise-software-development-modernizing-core-systems">modernizing core systems</a> and <a href="/en/solutions/cloud-migration">cloud migration</a> often belong in the same roadmap.</p>

<p class="hc-roi-eyebrow">05 | Delivery</p>
<h2 id="protecting-roi">Protecting ROI From Strategy to Production</h2>

<p>A good custom software project is not "finished" when the code is deployed. The business case is only proven when the new workflow is adopted and the target metrics move.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-proof-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Stage by stage</p>
      <p class="hc-roi-title" id="hc-roi-proof-title">What Each Stage Needs to Prove</p>
    </div>
  </div>
  <ol class="hc-roi-proof">
    ${stage('Discover', 'The problem is real and measurable.')}
    ${stage('Quantify', 'The current cost and expected benefit are defensible.')}
    ${stage('Prioritize', 'The MVP targets the highest-value workflow.')}
    ${stage('Prototype', 'High-risk assumptions are tested early.')}
    ${stage('Build incrementally', 'Value is released in measurable stages.')}
    ${stage('Instrument', 'Usage, performance and business KPIs are visible.')}
    ${stage('Optimize', 'The product improves as real-world data arrives.')}
  </ol>
</figure>

<p>For a closer look at how each stage of delivery works in practice, read <a href="/en/insights/lifecycle-of-custom-software-design-and-development">The Lifecycle of Custom Software Design and Development</a>.</p>

<p class="hc-roi-eyebrow">06 | Where HyperCode Fits</p>
<h2 id="hypercode">How HyperCode Turns ROI Into a Working Business Solution</h2>

<p>HyperCode brings the ROI principle into the delivery process by connecting business goals with the way software is discovered, architected, engineered, integrated, automated and scaled. Its six-stage approach (Discover, Architect, Engineer, Connect, Automate and Scale) keeps the focus on solving the right business problem before technology becomes the solution.</p>

<p>The process begins with understanding workflows, users, data and measurable business priorities. From there, HyperCode can design the architecture, build the application, connect existing systems, introduce automation and support the solution as business needs evolve. This matters for ROI because value is not created by software at launch alone; it is created when the resulting system improves how the business operates over time.</p>

<figure class="hc-roi-visual hc-roi-visual-dark" aria-labelledby="hc-roi-path-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">The HyperCode approach</p>
      <p class="hc-roi-title" id="hc-roi-path-title">Where HyperCode Creates Measurable Value</p>
    </div>
    ${logo}
  </div>
  <ol class="hc-roi-path">
    ${pathStep('Discover', 'Identify the business constraint, baseline the current process and define the outcomes that matter.')}
    ${pathStep('Architect', 'Design a secure and scalable foundation that supports integration, growth and long-term change.')}
    ${pathStep('Engineer', 'Build custom applications around the workflows that differentiate the business.')}
    ${pathStep('Connect', 'Integrate data, APIs, cloud services and existing enterprise systems to reduce fragmentation.')}
    ${pathStep('Automate', 'Remove repetitive work and use intelligent capabilities where they can improve speed, quality or decisions.')}
    ${pathStep('Scale', 'Monitor performance, maintain the solution and continuously improve it as the business grows.')}
  </ol>
</figure>

<p>Explore the services behind this approach: <a href="/en/solutions/custom-software-development">custom software development</a>, <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a> and <a href="/en/solutions/digital-transformation-consulting">digital transformation consulting</a>.</p>

<h3 class="hc-roi-h3">Ask a better question</h3>
<p class="hc-roi-quote">If your business could remove one costly bottleneck tomorrow, which workflow would you ask HyperCode to transform first?</p>

<p class="hc-roi-eyebrow">Final Takeaway</p>
<h2 id="takeaway">From Software Investment to Business Advantage</h2>

<p>The strongest software investment is not the one with the longest feature list. It is the one that removes friction today, creates capability tomorrow, and keeps returning value as the business grows.</p>

<div class="hc-roi-final">
  <p class="hc-roi-kicker">HyperCode</p>
  <p class="hc-roi-final-main">Turning custom software into measurable business value.</p>
  <p class="hc-roi-final-sub">HyperCode turns business challenges into secure, scalable digital capability, connecting strategy, engineering, integration, automation and measurable outcomes.</p>
  <ul class="hc-roi-motto"><li>BUILD WHAT MATTERS.</li><li>MEASURE WHAT MOVES.</li><li>SCALE WHAT WORKS.</li></ul>
  <div class="hc-roi-btns">
    <a class="hc-roi-btn" href="/en/consultation">Schedule Consultation</a>
    <a class="hc-roi-btn hc-roi-btn-ghost" href="/en/solutions/custom-software-development">Explore Custom Software</a>
  </div>
</div>
`;
