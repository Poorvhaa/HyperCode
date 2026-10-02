const icon = {
  calculator: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>',
  headset: '<svg viewBox="0 0 24 24"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
  code: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  data: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  map: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  scales: '<svg viewBox="0 0 24 24"><path d="M12 3v18M5 21h14M5 7h14"/><path d="m5 7-3 7a3 3 0 0 0 6 0Z"/><path d="m19 7-3 7a3 3 0 0 0 6 0Z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',
};

const logo = '<img class="hc-roi-logo" src="/hypercodeit.logo.webp" width="40" height="40" alt="HyperCode" loading="lazy" decoding="async" />';

const img = (name: string, alt: string, caption: string) => `<figure class="hc-roi-photo">
  <img src="/images/articles/maximizing-roi-with-enterprise-automation-tools-${name}.webp" width="1200" height="675" alt="${alt}" loading="lazy" decoding="async" />
  <figcaption>${caption}</figcaption>
</figure>`;

const arrow = '<div class="hc-roi-arrow" aria-hidden="true"></div>';

const toc = [
  ['roi-question', 'The ROI Question'],
  ['business-case', 'Build the Business Case'],
  ['value-path', 'A Simple Value Path'],
  ['use-cases', 'Where Enterprise Automation Creates Value'],
  ['automation-ai', 'Traditional Meets Intelligent Automation'],
  ['integration', 'Integration Makes Automation Useful'],
  ['pilot-to-production', 'From Pilot to Production'],
  ['measure-roi', 'Measure ROI. Then Build for Scale.'],
  ['hypercode', 'Where HyperCode Fits'],
  ['final-test', 'The Final Test'],
]
  .map(([id, label]) => `      <li><a class="hc-roi-toc-link" href="#${id}">${label}</a></li>`)
  .join('\n');

const loopStages = ['Baseline', 'Prioritize', 'Automate', 'Measure', 'Improve', 'Scale']
  .map((s, i) => `        <li class="hc-roi-stage"><span>0${i + 1}</span>${s}</li>`)
  .join('\n');

const check = (text: string) => `<li class="hc-roi-check"><span class="hc-roi-icon hc-roi-icon-green" aria-hidden="true">${icon.check}</span><p>${text}</p></li>`;

export const enterpriseAutomationRoiContentEn = `
<style>
  .hc-roi-visual { margin: 2.25rem 0; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid #dbe5f5; background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%); max-width: 100%; overflow: hidden; }
  .hc-roi-visual-dark { background: radial-gradient(circle at 50% 0%, #123a9c 0%, #0A1F6B 55%, #06123F 100%); border-color: #0A1F6B; color: #ffffff; }
  .hc-roi-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 0 0 1rem; }
  .hc-roi-kicker { margin: 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #145BFF; }
  .hc-roi-title { margin: 0.2rem 0 0; font-size: 1.05rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-roi-visual-dark .hc-roi-kicker { color: #25B5FF; }
  .hc-roi-visual-dark .hc-roi-title { color: #ffffff; }
  .hc-roi-logo { flex-shrink: 0; width: 40px; height: 40px; border-radius: 0.6rem; background: #ffffff; padding: 3px; box-shadow: 0 1px 3px rgba(10, 31, 107, 0.15); object-fit: contain; }
  ul.hc-roi-grid, ol.hc-roi-grid, ul.hc-roi-chips, ol.hc-roi-stages, ol.hc-roi-path, ul.hc-roi-meters, ol.hc-roi-flow, ul.hc-roi-list, ol.hc-roi-delivery { list-style: none; margin: 0; padding: 0; }
  .hc-roi-grid { display: grid; gap: 0.75rem; grid-template-columns: 1fr; }
  .hc-roi-grid > li { margin: 0; min-width: 0; overflow-wrap: break-word; }
  .hc-roi-icon { flex-shrink: 0; width: 2.1rem; height: 2.1rem; border-radius: 0.65rem; display: grid; place-items: center; color: #ffffff; background: linear-gradient(135deg, #145BFF, #25B5FF); }
  .hc-roi-icon svg { width: 1.05rem; height: 1.05rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-roi-icon-green { background: linear-gradient(135deg, #2f9a00, #48B900); }
  .hc-roi-icon-navy { background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-roi-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .hc-roi-chips li { margin: 0; padding: 0.25rem 0.6rem; border-radius: 999px; background: #eef4ff; color: #1e3a8a; font-size: 0.76rem; line-height: 1.3; font-weight: 700; }
  .hc-roi-visual-dark .hc-roi-chips li { background: rgba(255, 255, 255, 0.12); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.18); }
  .hc-roi-chips-center { justify-content: center; }
  .hc-roi-caption { margin: 0.9rem 0 0; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }
  .hc-roi-visual-dark .hc-roi-caption { color: #bcd3ff; }
  .hc-roi-label { margin: 0 0 0.5rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #0A1F6B; }
  .hc-roi-visual-dark .hc-roi-label { color: #bfe3ff; }
  .hc-roi-takeaway { margin: 1.75rem 0; padding: 0.95rem 1.15rem; border-radius: 0.9rem; border-left: 4px solid #48B900; background: linear-gradient(90deg, #eef4ff 0%, #f7faff 100%); }
  .hc-roi-takeaway strong { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #2f7a00; }
  .hc-roi-takeaway p { margin: 0; font-size: 0.98rem; line-height: 1.5; font-weight: 700; color: #0A1F6B; }
  p.hc-roi-quote { margin: 1.75rem 0; padding: 1.1rem 1.25rem; border-radius: 1rem; background: #0A1F6B; color: #ffffff; font-size: 1.05rem; line-height: 1.45; font-weight: 800; }
  p.hc-roi-quote::before { content: "\\201C"; display: block; font-size: 2rem; line-height: 1; color: #25B5FF; }
  p.hc-roi-subtitle { margin: 0 0 0.4rem; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-roi-eyebrow { margin: 3rem 0 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-roi-eyebrow + h2 { margin-top: 0.35rem; }
  h2[id] { scroll-margin-top: 7rem; }
  h3.hc-roi-h3 { margin: 1.5rem 0 0.6rem; font-size: 1.05rem; font-weight: 800; color: #0A1F6B; }

  .hc-roi-photo { margin: 2rem 0; }
  .hc-roi-photo img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 1rem; border: 1px solid #e2e8f0; background: #f1f5f9; }
  .hc-roi-photo figcaption { margin-top: 0.55rem; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }

  .hc-roi-toc { margin: 2rem 0; border-radius: 1rem; border: 1px solid #dbe5f5; background: #f7faff; }
  .hc-roi-toc summary { cursor: pointer; padding: 0.95rem 1.2rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #0A1F6B; }
  .hc-roi-toc summary:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; border-radius: 1rem; }
  .hc-roi-toc ol { display: grid; gap: 0.1rem 1.25rem; margin: 0; padding: 0 1.2rem 1rem; list-style: none; }
  .hc-roi-toc li { margin: 0; }
  .hc-roi-toc .hc-roi-toc-link { display: block; padding: 0.35rem 0.4rem; border-radius: 0.5rem; font-size: 0.9rem; line-height: 1.35; font-weight: 700; color: #0A1F6B; text-decoration: none; }
  .hc-roi-toc .hc-roi-toc-link:hover { background: #eaf1ff; color: #145BFF; }
  .hc-roi-toc .hc-roi-toc-link:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; }

  /* Automation value loop (animated) */
  .hc-roi-loop-wrap { display: grid; gap: 1.25rem; align-items: center; }
  .hc-roi-ring { position: relative; width: 100%; max-width: 21rem; aspect-ratio: 1 / 1; margin: 0 auto; }
  .hc-roi-ring svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hc-roi-ring .hc-roi-track { fill: none; stroke: rgba(37, 181, 255, 0.25); stroke-width: 0.6; }
  .hc-roi-ring .hc-roi-flowline { fill: none; stroke: #25B5FF; stroke-width: 0.9; stroke-linecap: round; stroke-dasharray: 1.2 4; opacity: 0.85; }
  .hc-roi-orbit { position: absolute; inset: 0; display: none; }
  .hc-roi-orbit::before { content: ""; position: absolute; left: 50%; top: 12%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 999px; background: #8fe1ff; box-shadow: 0 0 0 4px rgba(37, 181, 255, 0.25), 0 0 16px #25B5FF; }
  .hc-roi-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 36%; aspect-ratio: 1 / 1; border-radius: 999px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; text-align: center; background: radial-gradient(circle at 50% 35%, #1f6bff 0%, #0f3fb8 60%, #0A1F6B 100%); border: 1px solid rgba(37, 181, 255, 0.7); box-shadow: 0 0 0 6px rgba(37, 181, 255, 0.1), 0 10px 30px rgba(6, 18, 63, 0.45); }
  .hc-roi-core .hc-roi-logo { width: 30px; height: 30px; padding: 2px; border-radius: 0.45rem; }
  .hc-roi-core p { margin: 0; font-size: 0.72rem; line-height: 1.15; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #ffffff; }
  .hc-roi-bars { display: flex; align-items: flex-end; gap: 3px; height: 1.1rem; }
  .hc-roi-bars i { display: block; width: 5px; border-radius: 2px; background: #48B900; transform-origin: bottom; }
  .hc-roi-bars i:nth-child(1) { height: 45%; }
  .hc-roi-bars i:nth-child(2) { height: 70%; }
  .hc-roi-bars i:nth-child(3) { height: 100%; }
  .hc-roi-stages li.hc-roi-stage { position: absolute; z-index: 1; width: 6rem; margin: 0; padding: 0.4rem 0.3rem; border-radius: 0.7rem; transform: translate(-50%, -50%); text-align: center; font-size: 0.72rem; line-height: 1.15; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); }
  .hc-roi-stages li.hc-roi-stage::before { content: ""; position: absolute; inset: -1px; z-index: -1; border-radius: inherit; background: linear-gradient(135deg, #145BFF, #25B5FF); box-shadow: 0 0 18px rgba(37, 181, 255, 0.55); opacity: 0; }
  .hc-roi-stage span { display: block; font-size: 0.72rem; letter-spacing: 0.1em; color: #8fd3ff; }
  .hc-roi-stage:nth-child(1) { left: 50%; top: 12%; }
  .hc-roi-stage:nth-child(2) { left: 82.9%; top: 31%; }
  .hc-roi-stage:nth-child(3) { left: 82.9%; top: 69%; }
  .hc-roi-stage:nth-child(4) { left: 50%; top: 88%; }
  .hc-roi-stage:nth-child(5) { left: 17.1%; top: 69%; }
  .hc-roi-stage:nth-child(6) { left: 17.1%; top: 31%; }
  .hc-roi-meters { display: grid; gap: 0.7rem; }
  .hc-roi-meters li { margin: 0; font-size: 0.8rem; font-weight: 800; color: #e2e8f0; }
  .hc-roi-meter { display: block; margin-top: 0.35rem; height: 0.5rem; border-radius: 999px; background: rgba(255, 255, 255, 0.12); overflow: hidden; }
  .hc-roi-meter i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #145BFF, #25B5FF 60%, #48B900); transform-origin: left; transform: scaleX(0.85); }

  /* ROI framework */
  .hc-roi-node { padding: 0.75rem 0.9rem; border-radius: 0.85rem; background: #ffffff; border: 1px solid #cddcf5; text-align: center; font-size: 0.88rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-roi-node small { display: block; margin-top: 0.15rem; font-size: 0.76rem; font-weight: 600; color: #64748b; }
  .hc-roi-node-start { background: #eef4ff; border-color: #bcd3ff; }
  .hc-roi-node-dark { background: linear-gradient(135deg, #0A1F6B, #145BFF); border-color: transparent; color: #ffffff; }
  .hc-roi-node-dark small { color: #cfe0ff; }
  .hc-roi-node-human { background: #f3fbec; border: 2px solid #48B900; }
  .hc-roi-node-end { background: #eaf8df; border-color: #a9dd84; color: #1f5c00; }
  .hc-roi-node-tag { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  .hc-roi-node-dark .hc-roi-node-tag { color: #8fd3ff; }
  .hc-roi-node-human .hc-roi-node-tag { color: #2f7a00; }
  .hc-roi-arrow { position: relative; width: 2px; height: 1.15rem; margin: 0.25rem auto 0.35rem; background: #145BFF; }
  .hc-roi-arrow::after { content: ""; position: absolute; left: 50%; bottom: -2px; width: 7px; height: 7px; border-right: 2px solid #145BFF; border-bottom: 2px solid #145BFF; transform: translateX(-50%) rotate(45deg); }
  .hc-roi-benefits { display: grid; gap: 0.6rem; }
  .hc-roi-benefits .hc-roi-node-dark { padding: 1rem; }
  .hc-roi-benefit-col { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
  .hc-roi-benefit-col li { margin: 0; padding: 0.35rem 0.7rem; border-radius: 999px; background: #ffffff; border: 1px solid #bcd3ff; color: #0A1F6B; font-size: 0.78rem; font-weight: 800; text-align: center; }

  /* Value path */
  .hc-roi-path { display: grid; gap: 0.6rem; counter-reset: hc-roi-path; }
  .hc-roi-path li { position: relative; z-index: 0; margin: 0; padding: 0.85rem 0.9rem; border-radius: 0.95rem; background: #ffffff; border: 1px solid #dbe5f5; overflow: hidden; }
  .hc-roi-path li::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(135deg, rgba(20, 91, 255, 0.12), rgba(37, 181, 255, 0.18)); opacity: 0; }
  .hc-roi-path strong { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A1F6B; }
  .hc-roi-path strong::before { counter-increment: hc-roi-path; content: counter(hc-roi-path); flex-shrink: 0; width: 1.6rem; height: 1.6rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; letter-spacing: 0; color: #ffffff; background: #145BFF; }
  .hc-roi-path li:last-child strong::before { background: #48B900; }
  .hc-roi-path p { margin: 0.4rem 0 0; font-size: 0.84rem; line-height: 1.4; font-weight: 600; color: #475569; }

  /* Function cards */
  .hc-roi-fn { height: 100%; padding: 0.95rem; border-radius: 1rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-roi-fn-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.65rem; font-size: 0.86rem; line-height: 1.25; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #0A1F6B; }

  /* Check cards */
  .hc-roi-check { display: flex; gap: 0.7rem; align-items: flex-start; padding: 0.85rem; border-radius: 0.9rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-roi-check .hc-roi-icon { width: 1.8rem; height: 1.8rem; border-radius: 999px; }
  .hc-roi-check .hc-roi-icon svg { width: 0.95rem; height: 0.95rem; stroke-width: 3; }
  .hc-roi-check p { margin: 0.15rem 0 0; font-size: 0.9rem; line-height: 1.4; font-weight: 700; color: #0A1F6B; }

  /* Rule-based vs AI */
  .hc-roi-split { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.55rem; }
  .hc-roi-branch { padding: 0.75rem 0.6rem; border-radius: 0.9rem; border: 1px dashed #bcd3ff; background: rgba(238, 244, 255, 0.6); text-align: center; min-width: 0; }
  .hc-roi-branch strong { display: block; font-size: 0.8rem; font-weight: 800; color: #0A1F6B; }
  .hc-roi-branch span { display: block; margin-top: 0.2rem; font-size: 0.76rem; line-height: 1.35; font-weight: 600; color: #475569; }
  .hc-roi-branch-ai { border-color: transparent; background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-roi-branch-ai strong { color: #ffffff; }
  .hc-roi-branch-ai span { color: #cfe0ff; }
  .hc-roi-oversight { display: grid; gap: 1rem; }
  .hc-roi-badge { display: inline-block; margin-top: 0.4rem; padding: 0.2rem 0.55rem; border-radius: 999px; background: #48B900; color: #ffffff; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.04em; }
  .hc-roi-rail { display: flex; flex-wrap: wrap; justify-content: center; align-content: center; gap: 0.4rem; padding: 0.8rem; border-radius: 0.9rem; border: 1px dashed #145BFF; background: #f7faff; }
  .hc-roi-rail p { margin: 0 0 0.2rem; width: 100%; text-align: center; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #145BFF; }
  .hc-roi-rail span { padding: 0.3rem 0.65rem; border-radius: 999px; background: #ffffff; border: 1px solid #bcd3ff; color: #0A1F6B; font-size: 0.76rem; font-weight: 800; }

  /* Integration layer */
  .hc-roi-layer { padding: 0.8rem; border-radius: 0.9rem; text-align: center; }
  .hc-roi-layer-top { background: #ffffff; border: 1px solid #dbe5f5; }
  .hc-roi-layer-mid { background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-roi-layer-mid .hc-roi-label { color: #bfe3ff; }
  .hc-roi-layer-mid .hc-roi-chips li { background: rgba(255, 255, 255, 0.14); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.22); }
  .hc-roi-layer-end { background: #eaf8df; border: 1px solid #a9dd84; }
  .hc-roi-layer-end .hc-roi-label { color: #1f5c00; margin: 0; }

  /* Pilot to production */
  .hc-roi-phase { padding: 0.95rem; border-radius: 1rem; background: #ffffff; border: 1px solid #dbe5f5; }
  .hc-roi-phase-scale { border: 2px solid #48B900; background: #f7fdf2; }
  .hc-roi-list { display: grid; gap: 0.35rem; }
  .hc-roi-list li { margin: 0; display: flex; gap: 0.45rem; align-items: baseline; font-size: 0.88rem; line-height: 1.4; font-weight: 700; color: #0A1F6B; }
  .hc-roi-list li::before { content: ""; flex-shrink: 0; width: 0.5rem; height: 0.5rem; border-radius: 999px; background: #145BFF; transform: translateY(-1px); }
  .hc-roi-phase-scale .hc-roi-list li::before { background: #48B900; }
  .hc-roi-phase-arrow { display: grid; place-items: center; height: 1.6rem; }
  .hc-roi-phase-arrow::after { content: ""; width: 0.7rem; height: 0.7rem; border-right: 2px solid #145BFF; border-bottom: 2px solid #145BFF; transform: rotate(45deg) translate(-2px, -2px); }

  /* ROI formula */
  .hc-roi-calc { display: grid; gap: 0.9rem; }
  .hc-roi-formula { order: -1; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.6rem; padding: 1.1rem 0.8rem; border-radius: 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(37, 181, 255, 0.45); text-align: center; }
  .hc-roi-formula-lhs { font-size: 1.15rem; font-weight: 800; color: #25B5FF; }
  .hc-roi-frac { display: inline-flex; flex-direction: column; align-items: center; min-width: 0; }
  .hc-roi-frac span { display: block; padding: 0.25rem 0.4rem; font-size: 0.86rem; line-height: 1.3; font-weight: 800; color: #ffffff; }
  .hc-roi-frac span:first-child { border-bottom: 2px solid #48B900; }
  .hc-roi-side { padding: 0.85rem; border-radius: 0.95rem; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.16); }
  .hc-roi-side .hc-roi-list li { color: #e2e8f0; }
  .hc-roi-side .hc-roi-list li::before { background: #25B5FF; }
  .hc-roi-side-benefits .hc-roi-list li::before { background: #48B900; }

  /* Delivery model */
  .hc-roi-delivery { display: grid; gap: 0.6rem; counter-reset: hc-roi-del; }
  .hc-roi-delivery li { position: relative; margin: 0; padding: 0.85rem 0.9rem; border-radius: 0.95rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); }
  .hc-roi-delivery strong { display: flex; align-items: center; gap: 0.5rem; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #ffffff; }
  .hc-roi-delivery strong::before { counter-increment: hc-roi-del; content: counter(hc-roi-del); flex-shrink: 0; width: 1.6rem; height: 1.6rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; letter-spacing: 0; color: #06123F; background: #25B5FF; }
  .hc-roi-delivery li:last-child strong::before { background: #48B900; color: #ffffff; }
  .hc-roi-delivery p { margin: 0.35rem 0 0; font-size: 0.84rem; line-height: 1.4; font-weight: 600; color: #cfe0ff; }

  /* Final */
  .hc-roi-final { margin: 1.5rem 0 0; padding: 1.75rem 1.25rem; border-radius: 1.25rem; text-align: center; color: #ffffff; background: radial-gradient(circle at 50% 0%, #1f5fe0 0%, #0A1F6B 60%, #06123F 100%); }
  .hc-roi-final-main { margin: 0; font-size: 1.2rem; line-height: 1.4; font-weight: 800; color: #ffffff; }
  .hc-roi-motto { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.35rem 1rem; margin: 1.1rem 0 0; padding: 0; list-style: none; }
  .hc-roi-motto li { margin: 0; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.16em; color: #25B5FF; }
  .hc-roi-motto li:last-child { color: #7ddc3c; }
  .hc-roi-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1.25rem; }
  .hc-roi-final .hc-roi-btn { display: inline-block; padding: 0.7rem 1.3rem; border-radius: 999px; background: #ffffff; color: #0A1F6B; font-size: 0.88rem; font-weight: 800; text-decoration: none; }
  .hc-roi-final .hc-roi-btn-ghost { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.5); }
  .hc-roi-final .hc-roi-btn:hover { background: #eaf1ff; color: #0A1F6B; }
  .hc-roi-final .hc-roi-btn:focus-visible { outline: 2px solid #25B5FF; outline-offset: 3px; }

  @media (min-width: 640px) {
    .hc-roi-visual { padding: 1.5rem; }
    .hc-roi-cols-2, .hc-roi-toc ol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hc-roi-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .hc-roi-fns > li:last-child { grid-column: 1 / -1; }
    .hc-roi-benefits { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 1fr); align-items: center; }
    .hc-roi-benefit-col { flex-direction: column; align-items: stretch; }
    .hc-roi-benefit-bottom { grid-column: 1 / -1; flex-direction: row; justify-content: center; }
    .hc-roi-pilot { display: grid; grid-template-columns: minmax(0, 1fr) 2rem minmax(0, 1fr); align-items: stretch; }
    .hc-roi-phase-arrow::after { transform: rotate(-45deg) translate(-2px, -2px); }
  }

  @media (min-width: 768px) {
    .hc-roi-loop-wrap { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
    .hc-roi-path { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.5rem; }
    .hc-roi-path li { padding: 0.8rem 0.65rem; }
    .hc-roi-path strong { flex-direction: column; align-items: flex-start; font-size: 0.76rem; }
    .hc-roi-path p { font-size: 0.8rem; }
    .hc-roi-oversight { grid-template-columns: minmax(0, 1fr) 11rem; align-items: center; }
    .hc-roi-rail { flex-direction: column; flex-wrap: nowrap; align-items: stretch; text-align: center; }
    .hc-roi-calc { grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr); align-items: center; }
    .hc-roi-formula { order: 0; flex-direction: column; }
    .hc-roi-delivery { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hc-roi-orbit { display: block; animation: hc-roi-spin 9s linear infinite; }
    .hc-roi-ring .hc-roi-flowline { animation: hc-roi-dash 2.4s linear infinite; }
    .hc-roi-stages li.hc-roi-stage::before { animation: hc-roi-lit 9s linear infinite; }
    .hc-roi-stage:nth-child(2)::before { animation-delay: 1.5s; }
    .hc-roi-stage:nth-child(3)::before { animation-delay: 3s; }
    .hc-roi-stage:nth-child(4)::before { animation-delay: 4.5s; }
    .hc-roi-stage:nth-child(5)::before { animation-delay: 6s; }
    .hc-roi-stage:nth-child(6)::before { animation-delay: 7.5s; }
    .hc-roi-bars i { animation: hc-roi-grow 9s ease-in-out infinite; }
    .hc-roi-bars i:nth-child(2) { animation-delay: 0.3s; }
    .hc-roi-bars i:nth-child(3) { animation-delay: 0.6s; }
    .hc-roi-meter i { animation: hc-roi-fill 9s ease-in-out infinite; }
    .hc-roi-meters li:nth-child(2) .hc-roi-meter i { animation-delay: 0.4s; }
    .hc-roi-meters li:nth-child(3) .hc-roi-meter i { animation-delay: 0.8s; }
    .hc-roi-path li::after { animation: hc-roi-step 10s ease-in-out infinite; }
    .hc-roi-path li:nth-child(2)::after { animation-delay: 2s; }
    .hc-roi-path li:nth-child(3)::after { animation-delay: 4s; }
    .hc-roi-path li:nth-child(4)::after { animation-delay: 6s; }
    .hc-roi-path li:nth-child(5)::after { animation-delay: 8s; }
    @keyframes hc-roi-spin { to { transform: rotate(360deg); } }
    @keyframes hc-roi-dash { to { stroke-dashoffset: -10.4; } }
    @keyframes hc-roi-lit { 0% { opacity: 0; } 3% { opacity: 1; } 15% { opacity: 1; } 22% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes hc-roi-grow { 0% { transform: scaleY(0.35); } 70% { transform: scaleY(1); } 90% { transform: scaleY(1); } 100% { transform: scaleY(0.35); } }
    @keyframes hc-roi-fill { 0% { transform: scaleX(0.2); } 70% { transform: scaleX(0.9); } 90% { transform: scaleX(0.9); } 100% { transform: scaleX(0.2); } }
    @keyframes hc-roi-step { 0% { opacity: 0; } 5% { opacity: 1; } 20% { opacity: 1; } 28% { opacity: 0; } 100% { opacity: 0; } }
  }
</style>

<p class="hc-roi-subtitle">A practical framework for turning automation investment into measurable business value</p>

<p>Enterprise automation tools are easy to buy and harder to turn into lasting value. The return comes from how well automation improves the way work moves through the business, not from how many tasks a tool can run.</p>

<p>This guide sets out a practical framework for building the business case, choosing where to automate, combining rule-based automation with AI, keeping people in control, and measuring ROI across the whole process.</p>

<figure class="hc-roi-visual hc-roi-visual-dark" aria-labelledby="hc-roi-loop-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Animated overview</p>
      <p class="hc-roi-title" id="hc-roi-loop-title">The Automation Value Loop</p>
    </div>
  </div>
  <div class="hc-roi-loop-wrap">
    <div class="hc-roi-ring">
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <circle class="hc-roi-track" cx="50" cy="50" r="38" />
        <circle class="hc-roi-flowline" cx="50" cy="50" r="38" />
      </svg>
      <div class="hc-roi-orbit" aria-hidden="true"></div>
      <div class="hc-roi-core">
        ${logo}
        <p>Business<br />value</p>
        <div class="hc-roi-bars" aria-hidden="true"><i></i><i></i><i></i></div>
      </div>
      <ol class="hc-roi-stages" aria-label="Automation value loop stages">
${loopStages}
      </ol>
    </div>
    <div>
      <p class="hc-roi-label">Each turn of the loop improves</p>
      <ul class="hc-roi-meters">
        <li>Cycle time and throughput<span class="hc-roi-meter" aria-hidden="true"><i></i></span></li>
        <li>Quality and fewer exceptions<span class="hc-roi-meter" aria-hidden="true"><i></i></span></li>
        <li>Capacity to scale<span class="hc-roi-meter" aria-hidden="true"><i></i></span></li>
      </ul>
    </div>
  </div>
  <figcaption class="hc-roi-caption">Baseline, prioritize, automate, measure, improve and scale, then repeat. The meters are conceptual and do not represent measured results.</figcaption>
</figure>

<details class="hc-roi-toc" open>
  <summary>In this article</summary>
  <ol>
${toc}
  </ol>
</details>

<p class="hc-roi-eyebrow">01 | The ROI Question</p>
<h2 id="roi-question">Automation Is No Longer Just About Saving Time</h2>

<p>Enterprise automation has moved beyond isolated task automation. The larger opportunity is to connect workflows, applications, data and intelligent capabilities so that an entire business process works with less friction.</p>

<p>That distinction matters because the value of automation is rarely captured by the software alone. A task may become faster, but the business case becomes stronger when handoffs are reduced, exceptions are surfaced earlier, information reaches the right person sooner, and employees can spend more time on work that requires judgment.</p>

<div class="hc-roi-takeaway">
  <strong>Key idea</strong>
  <p>The strongest automation business cases connect technology activity to a business metric that leadership already cares about.</p>
</div>

<h3 class="hc-roi-h3">What ROI Should Mean in an Automation Program</h3>

<p>Return on investment should be viewed as a combination of financial, operational and strategic outcomes. A useful business case considers what the process costs today, what changes after automation, and how those changes affect capacity and service.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-framework-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Framework</p>
      <p class="hc-roi-title" id="hc-roi-framework-title">From Automation Investment to ROI</p>
    </div>
  </div>
  <div class="hc-roi-node hc-roi-node-start"><span class="hc-roi-node-tag">Step 1</span>Automation investment<small>Technology, integration and change effort</small></div>
  ${arrow}
  <div class="hc-roi-node"><span class="hc-roi-node-tag">Step 2</span>Process improvement<small>Fewer handoffs, faster flow, earlier exceptions</small></div>
  ${arrow}
  <div class="hc-roi-benefits">
    <ul class="hc-roi-benefit-col">
      <li>Lower operating cost</li>
      <li>Employee capacity</li>
      <li>Cycle time</li>
    </ul>
    <div class="hc-roi-node hc-roi-node-dark"><span class="hc-roi-node-tag">Step 3</span>Business benefits<small>Financial, operational and strategic outcomes</small></div>
    <ul class="hc-roi-benefit-col">
      <li>Throughput</li>
      <li>Quality</li>
      <li>Customer experience</li>
    </ul>
    <ul class="hc-roi-benefit-col hc-roi-benefit-bottom">
      <li>Scale</li>
    </ul>
  </div>
  ${arrow}
  <div class="hc-roi-node"><span class="hc-roi-node-tag">Step 4</span>Measurement<small>Compared against the baseline</small></div>
  ${arrow}
  <div class="hc-roi-node hc-roi-node-end"><span class="hc-roi-node-tag">Step 5</span>ROI<small>Value the business can see and manage</small></div>
</figure>

<p>Automation value can show up in several places:</p>

<ul class="hc-roi-grid hc-roi-cols-2">
  ${check('Lower operating cost and better use of employee capacity')}
  ${check('Shorter cycle times and higher throughput')}
  ${check('Fewer errors, exceptions and avoidable rework')}
  ${check('Improved employee productivity and experience')}
  ${check('More consistent customer and service delivery')}
  ${check('Greater ability to scale without proportional manual effort')}
</ul>

<p class="hc-roi-quote">The point is not simply to automate more tasks. It is to make the way work moves through the organization faster, clearer and more measurable.</p>

<p class="hc-roi-eyebrow">02 | Build the Business Case</p>
<h2 id="business-case">Start With the Process, Not the Tool</h2>

<p>A common automation mistake is choosing a platform before understanding the workflow. A stronger business case begins with the process itself: where work enters, where information moves, where decisions happen, and where delays or errors occur.</p>

${img('process', 'A business process map on a glass board with blue workflow steps and amber nodes marking a delay and rework loop under a magnifying lens', 'Mapping the current state exposes where delays, exceptions and rework actually happen.')}

<ul class="hc-roi-grid hc-roi-cols-3">
  <li class="hc-roi-fn">
    <div class="hc-roi-fn-head"><span class="hc-roi-icon" aria-hidden="true">${icon.map}</span>Map the current state</div>
    <ul class="hc-roi-chips">
      <li>People</li><li>Systems</li><li>Data sources</li><li>Approvals</li><li>Exceptions</li><li>Handoffs</li>
    </ul>
  </li>
  <li class="hc-roi-fn">
    <div class="hc-roi-fn-head"><span class="hc-roi-icon hc-roi-icon-navy" aria-hidden="true">${icon.target}</span>Identify the value pools</div>
    <ul class="hc-roi-chips">
      <li>High volume</li><li>Repetitive effort</li><li>Waiting periods</li><li>Manual reconciliation</li><li>Rework</li><li>Costly errors</li>
    </ul>
  </li>
  <li class="hc-roi-fn">
    <div class="hc-roi-fn-head"><span class="hc-roi-icon hc-roi-icon-green" aria-hidden="true">${icon.scales}</span>Prioritize value and feasibility</div>
    <ul class="hc-roi-chips">
      <li>Business impact</li><li>Data readiness</li><li>Integration complexity</li><li>Security</li><li>Change effort</li><li>Human judgment</li>
    </ul>
  </li>
</ul>

<h3 class="hc-roi-h3">Map the Current State</h3>
<p>Document the people, systems, data sources, approvals, exceptions and handoffs involved. This creates a baseline for measuring improvement and exposes the parts of the process where automation can have the greatest effect.</p>

<h3 class="hc-roi-h3">Identify the Value Pools</h3>
<p>High transaction volume, repetitive effort, long waiting periods, manual reconciliation, frequent rework and costly errors can all indicate potential value. The right opportunity is usually one where the business outcome can be measured.</p>

<h3 class="hc-roi-h3">Prioritize Value and Feasibility</h3>
<p>Compare expected impact with data readiness, integration complexity, security requirements, change effort, and the number of exceptions that still require human judgment.</p>

<p class="hc-roi-quote">A good automation roadmap does not ask, &ldquo;What can we automate?&rdquo; It asks, &ldquo;Where can automation improve the way the business works?&rdquo;</p>

<h2 id="value-path">A Simple Value Path</h2>

<p>Every automation initiative can follow the same five-step path, from understanding today&rsquo;s performance to expanding what works.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-path-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Value path</p>
      <p class="hc-roi-title" id="hc-roi-path-title">Baseline to Scale in Five Steps</p>
    </div>
  </div>
  <ol class="hc-roi-path">
    <li><strong>Baseline</strong><p>Understand current process performance</p></li>
    <li><strong>Prioritize</strong><p>Select valuable, feasible opportunities</p></li>
    <li><strong>Automate</strong><p>Connect workflows, systems and data</p></li>
    <li><strong>Measure</strong><p>Track business and operational outcomes</p></li>
    <li><strong>Scale</strong><p>Expand what creates measurable value</p></li>
  </ol>
</figure>

<p class="hc-roi-eyebrow">03 | Practical Use Cases</p>
<h2 id="use-cases">Where Enterprise Automation Creates Value</h2>

<p>Enterprise automation tools can create value across departments. The most durable opportunities tend to sit where repetitive work, multiple systems and a measurable business outcome meet.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-fn-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">By business function</p>
      <p class="hc-roi-title" id="hc-roi-fn-title">Five Areas Where Automation Pays Off</p>
    </div>
  </div>
  <ul class="hc-roi-grid hc-roi-cols-2 hc-roi-fns">
    <li class="hc-roi-fn">
      <div class="hc-roi-fn-head"><span class="hc-roi-icon" aria-hidden="true">${icon.calculator}</span>Finance &amp; back office</div>
      <ul class="hc-roi-chips"><li>Data entry</li><li>Document routing</li><li>Reconciliation</li><li>Approvals &amp; reporting</li></ul>
    </li>
    <li class="hc-roi-fn">
      <div class="hc-roi-fn-head"><span class="hc-roi-icon" aria-hidden="true">${icon.headset}</span>Customer operations</div>
      <ul class="hc-roi-chips"><li>Case classification</li><li>Routing</li><li>Response preparation</li><li>Record sync</li></ul>
    </li>
    <li class="hc-roi-fn">
      <div class="hc-roi-fn-head"><span class="hc-roi-icon hc-roi-icon-navy" aria-hidden="true">${icon.code}</span>IT &amp; software operations</div>
      <ul class="hc-roi-chips"><li>Deployment workflows</li><li>Monitoring</li><li>Ticket classification</li><li>Documentation</li></ul>
    </li>
    <li class="hc-roi-fn">
      <div class="hc-roi-fn-head"><span class="hc-roi-icon hc-roi-icon-navy" aria-hidden="true">${icon.data}</span>Data &amp; reporting</div>
      <ul class="hc-roi-chips"><li>Data connections</li><li>Validation</li><li>Reporting pipelines</li><li>Exception detection</li></ul>
    </li>
    <li class="hc-roi-fn">
      <div class="hc-roi-fn-head"><span class="hc-roi-icon hc-roi-icon-green" aria-hidden="true">${icon.book}</span>Knowledge &amp; employee workflows</div>
      <ul class="hc-roi-chips"><li>Document search</li><li>Recurring questions</li><li>Summaries</li><li>Team routing</li></ul>
    </li>
  </ul>
</figure>

<h3 class="hc-roi-h3">Finance and Back-Office Operations</h3>
<p>Automation can reduce manual data entry, document routing, reconciliation, approval chasing and recurring reporting while giving teams more capacity for analysis and exception handling.</p>

<h3 class="hc-roi-h3">Customer Operations</h3>
<p>Customer workflows often involve emails, cases, documents, knowledge and multiple applications. Automation can classify requests, route work, retrieve information, prepare responses and keep records synchronized.</p>

<h3 class="hc-roi-h3">IT and Software Operations</h3>
<p>Automation can support deployment workflows, monitoring, ticket classification, repetitive maintenance, documentation and developer processes. Connected observability and governance make these workflows easier to manage.</p>

<h3 class="hc-roi-h3">Data and Reporting</h3>
<p>Data automation can connect sources, validate information, transform data, refresh reporting pipelines and surface exceptions, creating a stronger foundation for analytics and faster access to trusted information.</p>

<h3 class="hc-roi-h3">Knowledge and Employee Workflows</h3>
<p>Internal processes often depend on searching documents, answering recurring questions, preparing summaries and moving requests between teams. Intelligent automation can reduce administrative friction while keeping people involved when judgment matters.</p>

<div class="hc-roi-takeaway">
  <strong>Takeaway</strong>
  <p>Automation creates more durable value when it improves an end-to-end process rather than optimizing one isolated task.</p>
</div>

<p class="hc-roi-eyebrow">04 | Automation + AI</p>
<h2 id="automation-ai">Traditional Automation Meets Intelligent Automation</h2>

<p>Rule-based automation remains highly effective for predictable, repeatable work. AI adds another layer for processes involving language, classification, summarization, context or less-structured information. Together, they can support workflows that were previously difficult to streamline.</p>

<h3 class="hc-roi-h3">Where AI Adds a New Layer</h3>
<p>AI can help interpret documents, classify requests, summarize information, retrieve enterprise knowledge, prepare drafts, identify exceptions and support employees before a human decision is made.</p>

<ul class="hc-roi-chips">
  <li>Interpret documents</li><li>Classify requests</li><li>Summarize information</li><li>Retrieve knowledge</li><li>Prepare drafts</li><li>Identify exceptions</li><li>Support employees</li>
</ul>

<h3 class="hc-roi-h3">Human Oversight Still Matters</h3>
<p>Automation should not remove judgment where accuracy, compliance, customer impact or financial consequences matter. A practical model can be AI-assisted preparation followed by human review and an authorized system action.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-oversight-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Operating model</p>
      <p class="hc-roi-title" id="hc-roi-oversight-title">Intelligent Automation with Human Oversight</p>
    </div>
  </div>
  <div class="hc-roi-oversight">
    <div>
      <div class="hc-roi-node hc-roi-node-start"><span class="hc-roi-node-tag">Input</span>Business input<small>Requests, documents, cases, data</small></div>
      ${arrow}
      <div class="hc-roi-split">
        <div class="hc-roi-branch"><strong>Rule-based automation</strong><span>Predictable, repeatable work</span></div>
        <div class="hc-roi-branch hc-roi-branch-ai"><strong>AI</strong><span>Language, classification, summarization, context</span></div>
      </div>
      ${arrow}
      <div class="hc-roi-node hc-roi-node-dark"><span class="hc-roi-node-tag">Prepare</span>AI-assisted preparation<small>Drafts, summaries, flagged exceptions</small></div>
      ${arrow}
      <div class="hc-roi-node hc-roi-node-human"><span class="hc-roi-node-tag">Decide</span>Human review<small>Accuracy, compliance, customer and financial impact</small><span class="hc-roi-badge">Retained for high-impact decisions</span></div>
      ${arrow}
      <div class="hc-roi-node"><span class="hc-roi-node-tag">Act</span>Authorized action</div>
      ${arrow}
      <div class="hc-roi-node"><span class="hc-roi-node-tag">Record</span>System update</div>
      ${arrow}
      <div class="hc-roi-node hc-roi-node-end"><span class="hc-roi-node-tag">Learn</span>Measurement</div>
    </div>
    <div class="hc-roi-rail">
      <p>Supported by</p>
      <span>APIs</span><span>Identity</span><span>Enterprise data</span><span>Applications</span><span>Cloud</span><span>Monitoring</span>
    </div>
  </div>
</figure>

<h2 id="integration">Integration Makes Automation Useful</h2>

<p>APIs, data platforms, identity, applications, workflow logic and cloud infrastructure form the integration layer that turns automation into an enterprise capability. A sophisticated tool has limited value if it remains disconnected from the systems where work actually happens.</p>

${img('integration', 'A glowing integration platform connecting business application windows above to a database, cloud and identity shield below, with an AI chip at the center', 'The integration layer connects automation and AI to the applications, data and identity systems where work happens.')}

<figure class="hc-roi-visual" aria-labelledby="hc-roi-layer-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Architecture</p>
      <p class="hc-roi-title" id="hc-roi-layer-title">The Integration Layer</p>
    </div>
  </div>
  <div class="hc-roi-layer hc-roi-layer-top">
    <p class="hc-roi-label">Automation &amp; AI capabilities</p>
    <ul class="hc-roi-chips hc-roi-chips-center"><li>Rules</li><li>AI</li><li>Workflow orchestration</li></ul>
  </div>
  ${arrow}
  <div class="hc-roi-layer hc-roi-layer-mid">
    <p class="hc-roi-label">Integration layer</p>
    <ul class="hc-roi-chips hc-roi-chips-center"><li>APIs</li><li>Data platforms</li><li>Identity</li><li>Applications</li><li>Workflow logic</li><li>Cloud infrastructure</li></ul>
  </div>
  ${arrow}
  <div class="hc-roi-layer hc-roi-layer-end">
    <p class="hc-roi-label">Real enterprise operations</p>
  </div>
</figure>

<p class="hc-roi-quote">AI can make automation more capable. Integration makes it useful inside the enterprise.</p>

<h2 id="pilot-to-production">From Pilot to Production</h2>

<p>A controlled pilot should establish what works, what needs adjustment and what governance is required. Scaling then becomes a matter of strengthening architecture, integration, security, adoption and measurement rather than simply adding more tools.</p>

<figure class="hc-roi-visual" aria-labelledby="hc-roi-pilot-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">Scaling</p>
      <p class="hc-roi-title" id="hc-roi-pilot-title">What a Pilot Proves, and What Scale Requires</p>
    </div>
  </div>
  <div class="hc-roi-pilot">
    <div class="hc-roi-phase">
      <p class="hc-roi-label">Controlled pilot establishes</p>
      <ul class="hc-roi-list"><li>What works</li><li>What needs adjustment</li><li>What governance is required</li></ul>
    </div>
    <div class="hc-roi-phase-arrow" aria-hidden="true"></div>
    <div class="hc-roi-phase hc-roi-phase-scale">
      <p class="hc-roi-label">Production scale strengthens</p>
      <ul class="hc-roi-list"><li>Architecture</li><li>Integration</li><li>Security</li><li>Adoption</li><li>Measurement</li></ul>
    </div>
  </div>
</figure>

<p class="hc-roi-eyebrow">05 | From Investment to Enterprise Value</p>
<h2 id="measure-roi">Measure ROI. Then Build for Scale.</h2>

<p>ROI becomes easier to manage when the baseline is established before implementation. The business should know what the process costs, how long it takes, how often errors occur, and what capacity is consumed.</p>

<p><strong>ROI = (Business Benefits − Automation Investment) ÷ Automation Investment</strong></p>

<figure class="hc-roi-visual hc-roi-visual-dark" aria-labelledby="hc-roi-calc-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">ROI measurement</p>
      <p class="hc-roi-title" id="hc-roi-calc-title">What Goes Into the Calculation</p>
    </div>
  </div>
  <div class="hc-roi-calc">
    <div class="hc-roi-side">
      <p class="hc-roi-label">Automation investment</p>
      <ul class="hc-roi-list"><li>Technology</li><li>Integration</li><li>Development</li><li>Security</li><li>Maintenance</li></ul>
    </div>
    <div class="hc-roi-formula" aria-label="ROI equals business benefits minus automation investment, divided by automation investment">
      <span class="hc-roi-formula-lhs" aria-hidden="true">ROI =</span>
      <span class="hc-roi-frac" aria-hidden="true"><span>Business Benefits − Automation Investment</span><span>Automation Investment</span></span>
    </div>
    <div class="hc-roi-side hc-roi-side-benefits">
      <p class="hc-roi-label">Business benefits</p>
      <ul class="hc-roi-list"><li>Capacity</li><li>Cycle time</li><li>Quality</li><li>Customer impact</li><li>Scalability</li><li>Risk reduction</li></ul>
    </div>
  </div>
  <figcaption class="hc-roi-caption">A conceptual model. Each organization should populate it with its own baseline and measured outcomes.</figcaption>
</figure>

<h3 class="hc-roi-h3">Measure the Whole Process</h3>
<p>A narrow calculation may count only labor hours saved. A stronger assessment also considers cycle time, throughput, quality, customer experience, risk, and the ability to handle higher volumes without proportional increases in manual effort.</p>

${img('measure', 'A laptop and analytics dashboard beside a balance with a smaller navy block stack for investment and a taller blue and green stack for benefits', 'A complete ROI view weighs every benefit against the full cost of technology, integration and maintenance.')}

<ul class="hc-roi-grid hc-roi-cols-2">
  ${check('Labor and capacity')}
  ${check('Cycle time and throughput')}
  ${check('Quality, rework and exceptions')}
  ${check('Customer and service impact')}
  ${check('Risk, auditability and compliance')}
  ${check('Technology, integration and maintenance cost')}
</ul>

<h2 id="hypercode">Where HyperCode Fits</h2>

<p>HyperCode engineers custom software, AI automation, cloud, data and enterprise platforms around real business operations. Its capabilities span AI &amp; Automation, Business Intelligence, Data Analytics, Data Warehousing, Custom Applications, Cloud &amp; DevOps and Digital Transformation.</p>

<p>For automation initiatives, this connected view matters. HyperCode&rsquo;s Discover → Architect → Engineer → Connect → Automate → Scale approach provides a practical path from business requirements to connected, production-ready solutions.</p>

<figure class="hc-roi-visual hc-roi-visual-dark" aria-labelledby="hc-roi-delivery-title">
  <div class="hc-roi-head">
    <div>
      <p class="hc-roi-kicker">HyperCode delivery model</p>
      <p class="hc-roi-title" id="hc-roi-delivery-title">From Business Requirement to Production-Ready Automation</p>
    </div>
    ${logo}
  </div>
  <ol class="hc-roi-delivery">
    <li><strong>Discover</strong><p>Business process + measurable outcome</p></li>
    <li><strong>Architect</strong><p>Systems + data + security + workflow</p></li>
    <li><strong>Engineer</strong><p>Applications + automation capabilities</p></li>
    <li><strong>Connect</strong><p>APIs + systems + enterprise data</p></li>
    <li><strong>Automate</strong><p>Rules + AI + workflow orchestration</p></li>
    <li><strong>Scale</strong><p>Measure + optimize + expand</p></li>
  </ol>
  <p class="hc-roi-label" style="margin-top:1rem">Capabilities</p>
  <ul class="hc-roi-chips">
    <li>AI &amp; Automation</li><li>Business Intelligence</li><li>Data Analytics</li><li>Data Warehousing</li><li>Custom Applications</li><li>Cloud &amp; DevOps</li><li>Digital Transformation</li>
  </ul>
</figure>

<p>Explore the services behind this approach: <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a>, <a href="/en/solutions/custom-software-development">custom software development</a>, <a href="/en/solutions/business-intelligence">business intelligence</a>, <a href="/en/solutions/data-warehousing">data warehousing</a>, <a href="/en/solutions/data-engineering-solutions">data engineering</a>, <a href="/en/solutions/cloud-migration">cloud migration</a> and <a href="/en/solutions/digital-transformation-consulting">digital transformation consulting</a>.</p>

<h2 id="final-test">The Final Test</h2>

<p>The strongest automation investment is one that:</p>

<ul class="hc-roi-grid hc-roi-cols-2">
  ${check('Improves a measurable business outcome')}
  ${check('Fits the way work actually happens')}
  ${check('Connects to the systems that matter')}
  ${check('Continues to create value after launch')}
</ul>

<div class="hc-roi-final">
  <p class="hc-roi-final-main">The goal is not to automate more work. It is to create a better way for the business to work.</p>
  <ul class="hc-roi-motto"><li>WE SOLVE.</li><li>WE BUILD.</li><li>YOU GROW.</li></ul>
  <div class="hc-roi-btns">
    <a class="hc-roi-btn" href="/en/consultation">Schedule Consultation</a>
    <a class="hc-roi-btn hc-roi-btn-ghost" href="/en/solutions/ai-workflow-automation">Explore AI &amp; Automation</a>
  </div>
</div>

<p>Related reading: <a href="/en/insights/top-5-ai-enterprise-software-use-cases-2026">Top 5 AI Enterprise Software Use Cases for 2026</a> and <a href="/en/insights/how-to-build-an-enterprise-ai-strategy">How to Build an Enterprise AI Strategy</a>.</p>
`;
