const icon = {
  board: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17.5h7M17.5 14v7"/></svg>',
  layout: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  code: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  cloud: '<svg viewBox="0 0 24 24"><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.5 13 3.5 3.5 0 0 0 6 19z"/><path d="M12 16v-5M9.5 13.5 12 11l2.5 2.5"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  file: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
};

const logo = '<img class="hc-cslc-logo" src="/hypercodeit.logo.webp" width="40" height="40" alt="HyperCode" loading="lazy" decoding="async" />';

const toc = [
  ['starting-point', 'Good Software Starts Before Code'],
  ['lifecycle', 'Six Stages, One Connected Journey'],
  ['discovery', 'Discovery & Planning'],
  ['design', 'Design Is Where the Future System Becomes Visible'],
  ['testing', 'Testing & Quality Assurance'],
  ['deployment', 'Deployment Turns Software Into an Operating Capability'],
  ['security', 'Security Throughout the Lifecycle'],
  ['hypercode', 'From Business Requirement to Software That Can Grow'],
  ['lasting-value', 'The Lasting Value'],
]
  .map(([id, label]) => `      <li><a class="hc-cslc-toc-link" href="#${id}">${label}</a></li>`)
  .join('\n');

const ringStages: [string, string][] = [
  ['Discover', icon.board],
  ['Design', icon.layout],
  ['Develop', icon.code],
  ['Test', icon.check],
  ['Deploy', icon.cloud],
  ['Evolve', icon.chart],
];
const ring = ringStages
  .map(([s, ic]) => `        <li class="hc-cslc-node"><span class="hc-cslc-node-icon" aria-hidden="true">${ic}</span>${s}</li>`)
  .join('\n');

const stage = (n: string, title: string, items: string, ic: string) =>
  `<li class="hc-cslc-stage"><span class="hc-cslc-stage-num">${n}</span><span class="hc-cslc-icon" aria-hidden="true">${ic}</span><strong>${title}</strong><p>${items}</p></li>`;

const sec = (title: string, ic: string, chips: string[], text: string) =>
  `<li class="hc-cslc-sec"><div class="hc-cslc-sec-head"><span class="hc-cslc-icon" aria-hidden="true">${ic}</span>${title}</div><ul class="hc-cslc-chips">${chips.map((c) => `<li>${c}</li>`).join('')}</ul><p>${text}</p></li>`;

const check = (text: string) => `<li class="hc-cslc-check"><span class="hc-cslc-icon hc-cslc-icon-green" aria-hidden="true">${icon.check}</span><p>${text}</p></li>`;

export const customSoftwareLifecycleContentEn = `
<style>
  .hc-cslc-visual { margin: 2.25rem 0; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid #dbe5f5; background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%); max-width: 100%; overflow: hidden; }
  .hc-cslc-visual-dark { background: radial-gradient(circle at 50% 0%, #123a9c 0%, #0A1F6B 55%, #06123F 100%); border-color: #0A1F6B; color: #ffffff; }
  .hc-cslc-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 0 0 1rem; }
  .hc-cslc-kicker { margin: 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #145BFF; }
  .hc-cslc-title { margin: 0.2rem 0 0; font-size: 1.05rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-cslc-visual-dark .hc-cslc-kicker { color: #25B5FF; }
  .hc-cslc-visual-dark .hc-cslc-title { color: #ffffff; }
  .hc-cslc-logo { flex-shrink: 0; width: 40px; height: 40px; border-radius: 0.6rem; background: #ffffff; padding: 3px; box-shadow: 0 1px 3px rgba(10, 31, 107, 0.15); object-fit: contain; }
  ul.hc-cslc-grid, ol.hc-cslc-ring-nodes, ol.hc-cslc-flow, ol.hc-cslc-stages, ol.hc-cslc-quality-nodes, ul.hc-cslc-chips, ol.hc-cslc-delivery, ul.hc-cslc-pills { list-style: none; margin: 0; padding: 0; }
  .hc-cslc-grid { display: grid; gap: 0.75rem; grid-template-columns: 1fr; }
  .hc-cslc-grid > li { margin: 0; min-width: 0; overflow-wrap: break-word; }
  .hc-cslc-icon { flex-shrink: 0; width: 2.1rem; height: 2.1rem; border-radius: 0.65rem; display: grid; place-items: center; color: #ffffff; background: linear-gradient(135deg, #145BFF, #25B5FF); }
  .hc-cslc-icon svg, .hc-cslc-node-icon svg { width: 1.05rem; height: 1.05rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-cslc-icon-green { background: linear-gradient(135deg, #2f9a00, #48B900); }
  .hc-cslc-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .hc-cslc-chips li { margin: 0; padding: 0.25rem 0.6rem; border-radius: 999px; background: #eef4ff; color: #1e3a8a; font-size: 0.76rem; line-height: 1.3; font-weight: 700; }
  .hc-cslc-caption { margin: 0.9rem 0 0; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }
  .hc-cslc-visual-dark .hc-cslc-caption { color: #bcd3ff; }
  .hc-cslc-takeaway { margin: 1.75rem 0; padding: 0.95rem 1.15rem; border-radius: 0.9rem; border-left: 4px solid #48B900; background: linear-gradient(90deg, #eef4ff 0%, #f7faff 100%); }
  .hc-cslc-takeaway strong { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #2f7a00; }
  .hc-cslc-takeaway p { margin: 0; font-size: 0.98rem; line-height: 1.5; font-weight: 700; color: #0A1F6B; }
  p.hc-cslc-quote { margin: 1.75rem 0; padding: 1.1rem 1.25rem; border-radius: 1rem; background: #0A1F6B; color: #ffffff; font-size: 1.05rem; line-height: 1.45; font-weight: 800; }
  p.hc-cslc-quote::before { content: "\\201C"; display: block; font-size: 2rem; line-height: 1; color: #25B5FF; }
  p.hc-cslc-subtitle { margin: 0 0 0.4rem; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-cslc-eyebrow { margin: 3rem 0 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-cslc-eyebrow + h2 { margin-top: 0.35rem; }
  h2[id] { scroll-margin-top: 7rem; }
  h3.hc-cslc-h3 { margin: 1.5rem 0 0.6rem; font-size: 1.05rem; font-weight: 800; color: #0A1F6B; }

  .hc-cslc-toc { margin: 2rem 0; border-radius: 1rem; border: 1px solid #dbe5f5; background: #f7faff; }
  .hc-cslc-toc summary { cursor: pointer; padding: 0.95rem 1.2rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #0A1F6B; }
  .hc-cslc-toc summary:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; border-radius: 1rem; }
  .hc-cslc-toc ol { display: grid; gap: 0.1rem 1.25rem; margin: 0; padding: 0 1.2rem 1rem; list-style: none; }
  .hc-cslc-toc li { margin: 0; }
  .hc-cslc-toc .hc-cslc-toc-link { display: block; padding: 0.35rem 0.4rem; border-radius: 0.5rem; font-size: 0.9rem; line-height: 1.35; font-weight: 700; color: #0A1F6B; text-decoration: none; }
  .hc-cslc-toc .hc-cslc-toc-link:hover { background: #eaf1ff; color: #145BFF; }
  .hc-cslc-toc .hc-cslc-toc-link:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; }

  /* Visual 1: animated lifecycle ring */
  .hc-cslc-loop-wrap { display: grid; gap: 1.25rem; align-items: center; }
  .hc-cslc-ring { position: relative; width: 100%; max-width: 22rem; aspect-ratio: 1 / 1; margin: 0 auto; }
  .hc-cslc-ring svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hc-cslc-track { fill: none; stroke: rgba(37, 181, 255, 0.25); stroke-width: 0.6; }
  .hc-cslc-flowline { fill: none; stroke: #25B5FF; stroke-width: 0.9; stroke-linecap: round; stroke-dasharray: 1.2 4; opacity: 0.85; }
  .hc-cslc-return { fill: none; stroke: #48B900; stroke-width: 1.4; stroke-linecap: round; opacity: 0.9; }
  .hc-cslc-orbit { position: absolute; inset: 0; display: none; }
  .hc-cslc-orbit::before { content: ""; position: absolute; left: 50%; top: 12%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 999px; background: #8fe1ff; box-shadow: 0 0 0 4px rgba(37, 181, 255, 0.25), 0 0 16px #25B5FF; }
  .hc-cslc-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 36%; aspect-ratio: 1 / 1; border-radius: 999px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; text-align: center; background: radial-gradient(circle at 50% 35%, #1f6bff 0%, #0f3fb8 60%, #0A1F6B 100%); border: 1px solid rgba(37, 181, 255, 0.7); box-shadow: 0 0 0 6px rgba(37, 181, 255, 0.1), 0 10px 30px rgba(6, 18, 63, 0.45); }
  .hc-cslc-core .hc-cslc-logo { width: 30px; height: 30px; padding: 2px; border-radius: 0.45rem; }
  .hc-cslc-core p { margin: 0; font-size: 0.72rem; line-height: 1.15; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #ffffff; }
  .hc-cslc-ring-nodes li.hc-cslc-node { position: absolute; z-index: 1; width: 5.6rem; margin: 0; padding: 0.4rem 0.3rem; display: flex; flex-direction: column; align-items: center; gap: 0.2rem; border-radius: 0.75rem; transform: translate(-50%, -50%); text-align: center; font-size: 0.72rem; line-height: 1.1; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #ffffff; background: rgba(10, 31, 107, 0.85); border: 1px solid rgba(255, 255, 255, 0.22); }
  .hc-cslc-ring-nodes li.hc-cslc-node::before { content: ""; position: absolute; inset: -1px; z-index: -1; border-radius: inherit; background: linear-gradient(135deg, #145BFF, #25B5FF); box-shadow: 0 0 18px rgba(37, 181, 255, 0.55); opacity: 0; }
  .hc-cslc-ring-nodes li.hc-cslc-node:last-child::before { background: linear-gradient(135deg, #2f9a00, #48B900); box-shadow: 0 0 18px rgba(72, 185, 0, 0.55); }
  .hc-cslc-node-icon { display: grid; place-items: center; color: #8fd3ff; }
  .hc-cslc-node:last-child .hc-cslc-node-icon { color: #9be86b; }
  .hc-cslc-node:nth-child(1) { left: 50%; top: 12%; }
  .hc-cslc-node:nth-child(2) { left: 82.9%; top: 31%; }
  .hc-cslc-node:nth-child(3) { left: 82.9%; top: 69%; }
  .hc-cslc-node:nth-child(4) { left: 50%; top: 88%; }
  .hc-cslc-node:nth-child(5) { left: 17.1%; top: 69%; }
  .hc-cslc-node:nth-child(6) { left: 17.1%; top: 31%; }
  .hc-cslc-side p { margin: 0 0 0.6rem; font-size: 0.88rem; line-height: 1.5; font-weight: 600; color: #e2e8f0; }
  .hc-cslc-side strong { color: #ffffff; }
  .hc-cslc-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .hc-cslc-pills li { margin: 0; padding: 0.3rem 0.65rem; border-radius: 999px; font-size: 0.76rem; font-weight: 800; color: #ffffff; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); }
  .hc-cslc-pills li:last-child { background: rgba(72, 185, 0, 0.25); border-color: rgba(125, 220, 60, 0.6); }

  /* Visual 2: idea to product */
  .hc-cslc-flow { display: grid; gap: 0.5rem; counter-reset: hc-cslc-flow; }
  .hc-cslc-flow li { position: relative; margin: 0; display: flex; align-items: center; gap: 0.6rem; padding: 0.65rem 0.8rem; border-radius: 0.85rem; background: #ffffff; border: 1px solid #cddcf5; font-size: 0.86rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-cslc-flow li::before { counter-increment: hc-cslc-flow; content: counter(hc-cslc-flow); flex-shrink: 0; width: 1.6rem; height: 1.6rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; color: #ffffff; background: #145BFF; }
  .hc-cslc-flow li:first-child { background: #eef4ff; }
  .hc-cslc-flow li:nth-last-child(-n+2) { background: #f3fbec; border-color: #a9dd84; }
  .hc-cslc-flow li:nth-last-child(-n+2)::before { background: #48B900; }
  .hc-cslc-flow small { display: block; font-size: 0.76rem; font-weight: 600; color: #64748b; }

  /* Visual 3: six stages */
  .hc-cslc-stages { position: relative; display: grid; gap: 0.7rem; }
  .hc-cslc-stages::before { content: ""; position: absolute; left: 1.05rem; top: 1rem; bottom: 1rem; width: 2px; background: linear-gradient(180deg, #145BFF, #25B5FF 70%, #48B900); }
  .hc-cslc-stage { position: relative; margin: 0; display: grid; grid-template-columns: 2.1rem minmax(0, 1fr); column-gap: 0.75rem; align-items: start; }
  .hc-cslc-stage .hc-cslc-icon { grid-row: 1 / span 3; position: relative; z-index: 1; box-shadow: 0 0 0 4px #ffffff; }
  .hc-cslc-stage:last-child .hc-cslc-icon { background: linear-gradient(135deg, #2f9a00, #48B900); }
  .hc-cslc-stage-num { grid-column: 2; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; color: #145BFF; }
  .hc-cslc-stage strong { grid-column: 2; display: block; font-size: 0.92rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-cslc-stage p { grid-column: 2; margin: 0.2rem 0 0; font-size: 0.82rem; line-height: 1.4; font-weight: 600; color: #475569; }

  /* Visual 4: quality is continuous */
  .hc-cslc-quality { position: relative; width: 100%; max-width: 22rem; aspect-ratio: 1 / 1; margin: 0 auto; }
  .hc-cslc-quality svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hc-cslc-qtrack { fill: none; stroke: #bcd3ff; stroke-width: 0.8; stroke-dasharray: 2 2.5; }
  .hc-cslc-qcore { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 34%; aspect-ratio: 1 / 1; border-radius: 999px; display: grid; place-items: center; text-align: center; background: linear-gradient(135deg, #2f9a00, #48B900); box-shadow: 0 0 0 8px rgba(72, 185, 0, 0.15); color: #ffffff; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
  .hc-cslc-quality-nodes li { position: absolute; z-index: 1; width: 5.4rem; margin: 0; padding: 0.45rem 0.3rem; border-radius: 0.75rem; transform: translate(-50%, -50%); text-align: center; font-size: 0.74rem; line-height: 1.15; font-weight: 800; color: #0A1F6B; background: #ffffff; border: 1px solid #bcd3ff; box-shadow: 0 2px 8px rgba(10, 31, 107, 0.08); }
  .hc-cslc-quality-nodes li:nth-child(1) { left: 50%; top: 16%; }
  .hc-cslc-quality-nodes li:nth-child(2) { left: 82.3%; top: 39.5%; }
  .hc-cslc-quality-nodes li:nth-child(3) { left: 70%; top: 77.5%; }
  .hc-cslc-quality-nodes li:nth-child(4) { left: 30%; top: 77.5%; }
  .hc-cslc-quality-nodes li:nth-child(5) { left: 17.7%; top: 39.5%; }

  /* Visual 5: security */
  .hc-cslc-sec { height: 100%; padding: 1rem; border-radius: 1rem; background: #ffffff; border: 1px solid #dbe5f5; border-top: 4px solid #145BFF; }
  .hc-cslc-sec:last-child { border-top-color: #48B900; }
  .hc-cslc-sec-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; font-size: 0.88rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #0A1F6B; }
  .hc-cslc-sec p { margin: 0.6rem 0 0; font-size: 0.84rem; line-height: 1.45; font-weight: 600; color: #475569; }

  /* Check cards */
  .hc-cslc-check { display: flex; gap: 0.7rem; align-items: flex-start; padding: 0.85rem; border-radius: 0.9rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-cslc-check .hc-cslc-icon { width: 1.8rem; height: 1.8rem; border-radius: 999px; }
  .hc-cslc-check .hc-cslc-icon svg { width: 0.95rem; height: 0.95rem; stroke-width: 3; }
  .hc-cslc-check p { margin: 0.15rem 0 0; font-size: 0.9rem; line-height: 1.4; font-weight: 700; color: #0A1F6B; }

  /* Visual 6: delivery path */
  .hc-cslc-delivery { display: grid; gap: 0.6rem; counter-reset: hc-cslc-del; }
  .hc-cslc-delivery li { margin: 0; padding: 0.85rem 0.9rem; border-radius: 0.95rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); }
  .hc-cslc-delivery strong { display: flex; align-items: center; gap: 0.5rem; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #ffffff; }
  .hc-cslc-delivery strong::before { counter-increment: hc-cslc-del; content: counter(hc-cslc-del); flex-shrink: 0; width: 1.6rem; height: 1.6rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; letter-spacing: 0; color: #06123F; background: #25B5FF; }
  .hc-cslc-delivery li:last-child strong::before { background: #48B900; color: #ffffff; }
  .hc-cslc-delivery p { margin: 0.35rem 0 0; font-size: 0.84rem; line-height: 1.4; font-weight: 600; color: #cfe0ff; }

  /* Final */
  .hc-cslc-final { margin: 1.5rem 0 0; padding: 1.75rem 1.25rem; border-radius: 1.25rem; text-align: center; color: #ffffff; background: radial-gradient(circle at 50% 0%, #1f5fe0 0%, #0A1F6B 60%, #06123F 100%); }
  .hc-cslc-final-main { margin: 0; font-size: 1.2rem; line-height: 1.4; font-weight: 800; color: #ffffff; }
  .hc-cslc-final-sub { margin: 0.6rem 0 0; font-size: 0.92rem; line-height: 1.5; font-weight: 600; color: #cfe0ff; }
  ul.hc-cslc-motto { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.35rem 1rem; margin: 1.1rem 0 0; padding: 0; list-style: none; }
  .hc-cslc-motto li { margin: 0; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.16em; color: #25B5FF; }
  .hc-cslc-motto li:last-child { color: #7ddc3c; }
  .hc-cslc-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1.25rem; }
  .hc-cslc-final .hc-cslc-btn { display: inline-block; padding: 0.7rem 1.3rem; border-radius: 999px; background: #ffffff; color: #0A1F6B; font-size: 0.88rem; font-weight: 800; text-decoration: none; }
  .hc-cslc-final .hc-cslc-btn-ghost { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.5); }
  .hc-cslc-final .hc-cslc-btn:hover { background: #eaf1ff; color: #0A1F6B; }
  .hc-cslc-final .hc-cslc-btn:focus-visible { outline: 2px solid #25B5FF; outline-offset: 3px; }

  @media (min-width: 640px) {
    .hc-cslc-visual { padding: 1.5rem; }
    .hc-cslc-cols-2, .hc-cslc-toc ol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hc-cslc-flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (min-width: 768px) {
    .hc-cslc-loop-wrap { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
    .hc-cslc-flow { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .hc-cslc-flow li { flex-direction: column; align-items: flex-start; }
    .hc-cslc-delivery { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (min-width: 1024px) {
    .hc-cslc-stages { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.6rem; }
    .hc-cslc-stages::before { left: 1rem; right: 1rem; top: 2.65rem; bottom: auto; width: auto; height: 2px; background: linear-gradient(90deg, #145BFF, #25B5FF 70%, #48B900); }
    .hc-cslc-stage { display: flex; flex-direction: column; align-items: flex-start; gap: 0.4rem; }
    .hc-cslc-stage strong { font-size: 0.84rem; }
    .hc-cslc-stage p { margin: 0; font-size: 0.78rem; }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hc-cslc-orbit { display: block; animation: hc-cslc-spin 9s linear infinite; }
    .hc-cslc-flowline { animation: hc-cslc-dash 2.4s linear infinite; }
    .hc-cslc-return { animation: hc-cslc-return 9s ease-in-out infinite; }
    .hc-cslc-ring-nodes li.hc-cslc-node::before { animation: hc-cslc-lit 9s linear infinite; }
    .hc-cslc-node-icon { animation: hc-cslc-pop 9s ease-in-out infinite; }
    .hc-cslc-node:nth-child(2)::before, .hc-cslc-node:nth-child(2) .hc-cslc-node-icon { animation-delay: 1.5s; }
    .hc-cslc-node:nth-child(3)::before, .hc-cslc-node:nth-child(3) .hc-cslc-node-icon { animation-delay: 3s; }
    .hc-cslc-node:nth-child(4)::before, .hc-cslc-node:nth-child(4) .hc-cslc-node-icon { animation-delay: 4.5s; }
    .hc-cslc-node:nth-child(5)::before, .hc-cslc-node:nth-child(5) .hc-cslc-node-icon { animation-delay: 6s; }
    .hc-cslc-node:nth-child(6)::before, .hc-cslc-node:nth-child(6) .hc-cslc-node-icon { animation-delay: 7.5s; }
    .hc-cslc-qtrack { animation: hc-cslc-qdash 6s linear infinite; }
    .hc-cslc-qcore { animation: hc-cslc-breathe 4s ease-in-out infinite; }
    @keyframes hc-cslc-spin { to { transform: rotate(360deg); } }
    @keyframes hc-cslc-dash { to { stroke-dashoffset: -10.4; } }
    @keyframes hc-cslc-qdash { to { stroke-dashoffset: -27; } }
    @keyframes hc-cslc-lit { 0% { opacity: 0; } 3% { opacity: 1; } 15% { opacity: 1; } 22% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes hc-cslc-pop { 0% { transform: scale(1); } 5% { transform: scale(1.25); } 15% { transform: scale(1); } 100% { transform: scale(1); } }
    @keyframes hc-cslc-return { 0%, 80% { opacity: 0.35; } 90% { opacity: 1; } 100% { opacity: 0.35; } }
    @keyframes hc-cslc-breathe { 0%, 100% { box-shadow: 0 0 0 8px rgba(72, 185, 0, 0.15); } 50% { box-shadow: 0 0 0 14px rgba(72, 185, 0, 0.08); } }
  }
</style>

<p class="hc-cslc-subtitle">From a business idea to a dependable digital product</p>

<p>Custom software design and development is not simply the process of writing an application. It is a structured journey for translating a business problem into a digital system that people can actually use and the organization can confidently operate.</p>

<p>That journey moves a business problem through a product concept, an architecture, working software and a production capability, and then keeps it evolving as the business changes. Along the way, thoughtful planning, design, engineering, testing and continuous improvement turn custom software into a long-term business capability.</p>

<details class="hc-cslc-toc" open>
  <summary>In this article</summary>
  <ol>
${toc}
  </ol>
</details>

<p class="hc-cslc-eyebrow">01 | The Starting Point</p>
<h2 id="starting-point">Good Software Starts Before Code</h2>

<p>The strongest projects begin by understanding the environment around the software: business goals, users, existing workflows, data, integrations, security requirements, and the outcomes the solution is expected to improve.</p>

<p>That early clarity reduces ambiguity later and gives design and engineering teams a shared direction. Microsoft describes the software development life cycle as a framework spanning planning, analysis, design, development, testing, deployment and maintenance.</p>

<ul class="hc-cslc-grid hc-cslc-cols-2">
  ${check('Business goals and expected outcomes')}
  ${check('Users and stakeholders')}
  ${check('Existing workflows')}
  ${check('Data and integration requirements')}
  ${check('Security needs')}
  ${check('How success will be measured')}
</ul>

<h3 class="hc-cslc-h3">Why Organizations Choose Custom Software</h3>
<p>Off-the-shelf products can be effective when requirements are standard. Custom software becomes relevant when workflows, integrations, user experiences or business rules require a solution shaped around the organization rather than the other way around. That is the core of <a href="/en/solutions/custom-software-development">custom software development</a>.</p>

<h3 class="hc-cslc-h3">The First Deliverable Is Clarity</h3>
<p>Before screens are designed or code is written, teams need a clear understanding of what the software must accomplish, who will use it, what systems it must connect to, and how success will be measured.</p>

<div class="hc-cslc-takeaway">
  <strong>A useful principle</strong>
  <p>Build around the business process first. Let technology serve the process, not force the process into a template.</p>
</div>

<p class="hc-cslc-eyebrow">02 | The Lifecycle</p>
<h2 id="lifecycle">Six Stages, One Connected Journey</h2>

<p>A custom software project may use different delivery methods, but the underlying work remains connected. Requirements influence architecture; architecture shapes development; development feeds testing; testing informs launch; and production feedback drives the next cycle of improvement.</p>

<figure class="hc-cslc-visual hc-cslc-visual-dark" aria-labelledby="hc-cslc-loop-title">
  <div class="hc-cslc-head">
    <div>
      <p class="hc-cslc-kicker">Animated overview</p>
      <p class="hc-cslc-title" id="hc-cslc-loop-title">The Custom Software Lifecycle</p>
    </div>
  </div>
  <div class="hc-cslc-loop-wrap">
    <div class="hc-cslc-ring">
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <circle class="hc-cslc-track" cx="50" cy="50" r="38" />
        <circle class="hc-cslc-flowline" cx="50" cy="50" r="38" />
        <path class="hc-cslc-return" d="M17.1 31 A38 38 0 0 1 50 12" />
      </svg>
      <div class="hc-cslc-orbit" aria-hidden="true"></div>
      <div class="hc-cslc-core">
        ${logo}
        <p>Business<br />capability</p>
      </div>
      <ol class="hc-cslc-ring-nodes" aria-label="Custom software lifecycle stages">
${ring}
      </ol>
    </div>
    <div class="hc-cslc-side">
      <p><strong>Connected, not sequential.</strong> Agile delivery makes these connections iterative rather than strictly sequential.</p>
      <p>The green arc shows Evolve reconnecting to Discover: production feedback starts the next cycle.</p>
      <ul class="hc-cslc-pills" aria-label="Lifecycle outcome">
        <li>Business idea</li><li>Software product</li><li>Production</li><li>Continuous improvement</li>
      </ul>
    </div>
  </div>
  <figcaption class="hc-cslc-caption">Discover, design, develop, test, deploy and evolve, then repeat as the business changes.</figcaption>
</figure>

<figure class="hc-cslc-visual" aria-labelledby="hc-cslc-stages-title">
  <div class="hc-cslc-head">
    <div>
      <p class="hc-cslc-kicker">Six stages</p>
      <p class="hc-cslc-title" id="hc-cslc-stages-title">What Happens at Each Stage</p>
    </div>
  </div>
  <ol class="hc-cslc-stages">
    ${stage('01', 'Discover &amp; Plan', 'Business goals, users, requirements, scope', icon.board)}
    ${stage('02', 'Design &amp; Architect', 'Experience, workflows, architecture, integrations', icon.layout)}
    ${stage('03', 'Develop &amp; Integrate', 'Code, services, APIs, data, environments', icon.code)}
    ${stage('04', 'Test &amp; Validate', 'Quality, security, usability, performance', icon.check)}
    ${stage('05', 'Deploy &amp; Launch', 'Production release, monitoring, handover', icon.cloud)}
    ${stage('06', 'Support &amp; Evolve', 'Fixes, optimization, enhancements, scale', icon.chart)}
  </ol>
</figure>

<p>These stages are not isolated boxes in a waterfall. Each one informs the next, and what is learned later, in testing or in production, feeds back into planning and design.</p>

<h2 id="discovery">Discovery &amp; Planning</h2>

<p>The journey begins with the business. Teams clarify the problem, map current workflows, identify users and stakeholders, gather requirements, assess feasibility, and establish scope, priorities, risks and success measures.</p>

<ul class="hc-cslc-chips">
  <li>Business challenge</li><li>Current workflows</li><li>Users &amp; stakeholders</li><li>Requirements</li><li>Feasibility</li><li>Scope</li><li>Priorities</li><li>Risks</li><li>Success measures</li>
</ul>

<figure class="hc-cslc-visual" aria-labelledby="hc-cslc-flow-title">
  <div class="hc-cslc-head">
    <div>
      <p class="hc-cslc-kicker">From idea to product</p>
      <p class="hc-cslc-title" id="hc-cslc-flow-title">How a Business Idea Becomes a Dependable Product</p>
    </div>
  </div>
  <ol class="hc-cslc-flow">
    <li><span>Business idea<small>The problem to solve</small></span></li>
    <li><span>Discovery<small>Goals, users, scope</small></span></li>
    <li><span>UX &amp; architecture<small>The blueprint</small></span></li>
    <li><span>Engineering<small>Working software</small></span></li>
    <li><span>Testing<small>Validated quality</small></span></li>
    <li><span>Production<small>Live capability</small></span></li>
    <li><span>Real user feedback<small>What should change</small></span></li>
    <li><span>Continuous improvement<small>The next cycle</small></span></li>
  </ol>
</figure>

<p class="hc-cslc-eyebrow">03 | From Blueprint to Product</p>
<h2 id="design">Design Is Where the Future System Becomes Visible</h2>

<h3 class="hc-cslc-h3">Design &amp; Solution Architecture</h3>
<p>The concept becomes a blueprint. UX and interface design define how people interact with the product, while architecture decisions establish how applications, data, APIs, cloud resources, security controls and integrations will work together.</p>

<ul class="hc-cslc-chips">
  <li>UX</li><li>UI</li><li>Workflows</li><li>Application structure</li><li>Data</li><li>APIs</li><li>Cloud</li><li>Security controls</li><li>Integrations</li>
</ul>

<p>That architecture becomes the blueprint for engineering. It is also where decisions about <a href="/en/solutions/web-development-services">web application development</a>, <a href="/en/solutions/cloud-migration">cloud infrastructure</a> and <a href="/en/solutions/data-engineering-solutions">data engineering</a> come together.</p>

<h3 class="hc-cslc-h3">Development &amp; Integration</h3>
<p>With the design and architecture established, engineers translate the blueprint into working software: application components, APIs, data flows, business logic, integrations and deployment environments.</p>

<p>Development is iterative. Teams review functionality, integrate components, manage changes through version control, and validate each increment against the intended user and business outcome.</p>

<h2 id="testing">Testing &amp; Quality Assurance</h2>

<p>Testing examines whether the software behaves as expected across functional, integration, system, usability, performance and security dimensions. The exact testing strategy depends on the solution, but quality is strongest when validation is built into delivery rather than postponed until the end.</p>

<figure class="hc-cslc-visual" aria-labelledby="hc-cslc-quality-title">
  <div class="hc-cslc-head">
    <div>
      <p class="hc-cslc-kicker">Quality model</p>
      <p class="hc-cslc-title" id="hc-cslc-quality-title">Quality Is Continuous</p>
    </div>
  </div>
  <div class="hc-cslc-quality">
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle class="hc-cslc-qtrack" cx="50" cy="50" r="34" />
    </svg>
    <div class="hc-cslc-qcore">Quality</div>
    <ol class="hc-cslc-quality-nodes" aria-label="Quality is a continuous conversation between">
      <li>Requirements</li>
      <li>Design</li>
      <li>Engineering</li>
      <li>Testing</li>
      <li>User feedback</li>
    </ol>
  </div>
  <figcaption class="hc-cslc-caption">Quality is not a final checkpoint. Each discipline informs the others throughout delivery.</figcaption>
</figure>

<ul class="hc-cslc-chips">
  <li>Functional</li><li>Integration</li><li>System</li><li>Usability</li><li>Performance</li><li>Security</li>
</ul>

<p class="hc-cslc-quote">Quality is not a final checkpoint. It is a continuous conversation between requirements, design, engineering, testing, and the people who will ultimately depend on the software.</p>

<p class="hc-cslc-eyebrow">04 | Launch Is a Beginning</p>
<h2 id="deployment">Deployment Turns Software Into an Operating Capability</h2>

<p>A finished build is not automatically a finished product. Deployment introduces the software into a live environment, where availability, security, performance, data integrity, user adoption and operational ownership all matter.</p>

<p>A responsible release therefore includes production preparation, configuration, monitoring, documentation, handover and, where appropriate, rollback planning.</p>

<h3 class="hc-cslc-h3">Deployment &amp; Launch</h3>
<p>The solution is moved into production through a controlled release. Teams validate the production environment, configure infrastructure and integrations, monitor the rollout, and support users through the transition.</p>

<ul class="hc-cslc-grid hc-cslc-cols-2">
  ${check('Production readiness and configuration')}
  ${check('Monitoring, security and performance')}
  ${check('Data integrity')}
  ${check('Documentation and handover')}
</ul>

<h3 class="hc-cslc-h3">Ongoing Support &amp; Enhancement</h3>
<p>Once people begin using the software, real-world feedback reveals what should change next. Maintenance includes bug fixes, security updates, performance monitoring, support, enhancements and continuous adaptation to evolving business needs.</p>

<p>That is why launch is not the end. It is the point where the software starts learning from the people and processes it was built to serve.</p>

<h2 id="security">Security Throughout the Lifecycle</h2>

<p>Security is not a single stage. It belongs in every part of the lifecycle, from the first requirements conversation to day-to-day operations.</p>

<figure class="hc-cslc-visual" aria-labelledby="hc-cslc-sec-title">
  <div class="hc-cslc-head">
    <div>
      <p class="hc-cslc-kicker">Secure by design</p>
      <p class="hc-cslc-title" id="hc-cslc-sec-title">Security at Every Stage</p>
    </div>
  </div>
  <ul class="hc-cslc-grid hc-cslc-cols-2">
    ${sec('Requirements', icon.file, ['Data', 'Access', 'Privacy', 'Compliance'], 'Identify data, access, privacy and compliance needs early.')}
    ${sec('Design', icon.layout, ['Architecture', 'Controls', 'User flows'], 'Build appropriate controls into architecture and user flows.')}
    ${sec('Development', icon.lock, ['Secure coding', 'Validation', 'Authentication'], 'Use secure coding, validation, authentication and controlled access.')}
    ${sec('Operations', icon.eye, ['Monitoring', 'Patching', 'Review', 'Response'], 'Monitor, patch, review and respond as the system evolves.')}
  </ul>
</figure>

<p class="hc-cslc-eyebrow">05 | The HyperCode Perspective</p>
<h2 id="hypercode">From Business Requirement to Software That Can Grow</h2>

<p>HyperCode positions custom applications and software engineering as part of a broader technology capability that connects software with data, cloud, AI, integrations and <a href="/en/solutions/digital-transformation-consulting">digital transformation</a>. Its delivery approach moves through scoping and roadmap, system architecture, agile engineering, and launch and scale.</p>

<figure class="hc-cslc-visual hc-cslc-visual-dark" aria-labelledby="hc-cslc-delivery-title">
  <div class="hc-cslc-head">
    <div>
      <p class="hc-cslc-kicker">HyperCode delivery path</p>
      <p class="hc-cslc-title" id="hc-cslc-delivery-title">From Requirement to Software That Can Grow</p>
    </div>
    ${logo}
  </div>
  <ol class="hc-cslc-delivery">
    <li><strong>Discover</strong><p>Business challenge, workflows, users and requirements</p></li>
    <li><strong>Architect</strong><p>System structure, integrations, data, security and technology</p></li>
    <li><strong>Engineer</strong><p>Build, integrate, test, review and iterate</p></li>
    <li><strong>Connect</strong><p>Applications, APIs, data, cloud services and workflows</p></li>
    <li><strong>Launch</strong><p>Production, monitoring, documentation and ownership</p></li>
    <li><strong>Evolve</strong><p>Feedback, performance data and new business needs</p></li>
  </ol>
</figure>

<p>Explore the services behind this approach: <a href="/en/solutions/custom-software-development">custom software development</a>, <a href="/en/solutions/web-development-services">web development</a>, <a href="/en/solutions/cloud-migration">cloud migration</a>, <a href="/en/solutions/data-engineering-solutions">data engineering</a> and <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a>. For a broader view of platform growth, read <a href="/en/insights/scaling-success-custom-enterprise-software">Scaling Success with Custom Enterprise Software</a>.</p>

<p class="hc-cslc-eyebrow">06 | The Lasting Value</p>
<h2 id="lasting-value">The Lasting Value</h2>

<p>The measure of a successful custom software project is not how much code was written. It is whether the finished system makes the intended work:</p>

<ul class="hc-cslc-chips">
  <li>Clearer</li><li>Faster</li><li>Safer</li><li>More connected</li><li>More scalable</li>
</ul>

<p>The next chapter of software is not only about building new applications. It is about building the right systems, with enough flexibility to change as the business changes.</p>

<p>The strongest custom software becomes part of the organization&rsquo;s everyday rhythm. It evolves with users, absorbs new requirements, connects with new systems, and creates new possibilities over time.</p>

<p class="hc-cslc-quote">Custom software design and development is a lifecycle, not a one-time project.</p>

<div class="hc-cslc-final">
  <p class="hc-cslc-final-main">Every great digital product begins with an idea.</p>
  <p class="hc-cslc-final-sub">But an idea becomes valuable only when it is thoughtfully designed, carefully engineered, and built to work in the real world. At HyperCode, we turn business challenges into custom software that evolves with your ambitions, from the first concept to what comes next.</p>
  <ul class="hc-cslc-motto"><li>WE SOLVE.</li><li>WE BUILD.</li><li>YOU GROW.</li></ul>
  <div class="hc-cslc-btns">
    <a class="hc-cslc-btn" href="/en/consultation">Schedule Consultation</a>
    <a class="hc-cslc-btn hc-cslc-btn-ghost" href="/en/solutions/custom-software-development">Explore Custom Software</a>
  </div>
</div>
`;
