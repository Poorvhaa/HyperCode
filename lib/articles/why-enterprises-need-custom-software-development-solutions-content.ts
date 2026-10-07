const icon = {
  flow: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/></svg>',
  plug: '<svg viewBox="0 0 24 24"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/></svg>',
  rules: '<svg viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11"/><polyline points="3 6 4.5 7.5 7 5"/><polyline points="3 12 4.5 13.5 7 11"/><polyline points="3 18 4.5 19.5 7 17"/></svg>',
  smile: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
  data: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
  scale: '<svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><path d="M21 3l-7 7M3 21l7-7"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6z"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  code: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
};

const logo = '<img class="hc-cssd-logo" src="/hypercodeit.logo.webp" width="40" height="40" alt="HyperCode" loading="lazy" decoding="async" />';

const toc = [
  ['business-reality', 'When Off-the-Shelf Software Stops Being Enough'],
  ['business-problem', 'Custom Software Starts With the Business Problem'],
  ['real-workflows', 'A Closer Fit to Real Workflows'],
  ['integration', 'Integration by Design'],
  ['differentiation', 'Room for Differentiation'],
  ['evolve', 'A Foundation That Can Evolve'],
  ['impact', 'The Impact Goes Beyond the Application'],
  ['vision', 'From Business Vision to a Solution That Evolves'],
  ['hypercode', 'Where HyperCode Fits'],
]
  .map(([id, label]) => `      <li><a class="hc-cssd-toc-link" href="#${id}">${label}</a></li>`)
  .join('\n');

const sceneStages = ['Business problem', 'Discover', 'Design', 'Develop', 'Deploy', 'Evolve', 'Business value']
  .map((s) => `        <li>${s}</li>`)
  .join('\n');

const spoke = (ic: string, title: string) =>
  `<li><span class="hc-cssd-icon" aria-hidden="true">${ic}</span><strong>${title}</strong></li>`;

const value = (ic: string, title: string, text: string, tone = '') =>
  `<li class="hc-cssd-value"><span class="hc-cssd-icon${tone}" aria-hidden="true">${ic}</span><strong>${title}</strong><p>${text}</p></li>`;

const step = (name: string, text: string) => `<li><strong>${name}</strong><p>${text}</p></li>`;

export const customSoftwareSolutionsContentEn = `
<style>
  .hc-cssd-visual { margin: 2.25rem 0; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid #dbe5f5; background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%); max-width: 100%; overflow: hidden; }
  .hc-cssd-visual-dark { background: radial-gradient(circle at 50% 0%, #123a9c 0%, #0A1F6B 55%, #06123F 100%); border-color: #0A1F6B; color: #ffffff; }
  .hc-cssd-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 0 0 1rem; }
  .hc-cssd-kicker { margin: 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #145BFF; }
  .hc-cssd-title { margin: 0.2rem 0 0; font-size: 1.05rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-cssd-visual-dark .hc-cssd-kicker { color: #25B5FF; }
  .hc-cssd-visual-dark .hc-cssd-title { color: #ffffff; }
  .hc-cssd-logo { flex-shrink: 0; width: 40px; height: 40px; border-radius: 0.6rem; background: #ffffff; padding: 3px; box-shadow: 0 1px 3px rgba(10, 31, 107, 0.15); object-fit: contain; }
  ol.hc-cssd-stages, ul.hc-cssd-list, ul.hc-cssd-spokes, ul.hc-cssd-values, ol.hc-cssd-journey, ol.hc-cssd-approach, ul.hc-cssd-chips, ul.hc-cssd-motto { list-style: none; margin: 0; padding: 0; }
  .hc-cssd-icon { flex-shrink: 0; width: 2.1rem; height: 2.1rem; border-radius: 0.65rem; display: grid; place-items: center; color: #ffffff; background: linear-gradient(135deg, #145BFF, #25B5FF); }
  .hc-cssd-icon svg { width: 1.05rem; height: 1.05rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-cssd-icon-green { background: linear-gradient(135deg, #2f9a00, #48B900); }
  .hc-cssd-icon-navy { background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-cssd-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .hc-cssd-chips li { margin: 0; padding: 0.25rem 0.6rem; border-radius: 999px; background: #eef4ff; color: #1e3a8a; font-size: 0.76rem; line-height: 1.3; font-weight: 700; }
  .hc-cssd-caption { margin: 0.9rem 0 0; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }
  .hc-cssd-visual-dark .hc-cssd-caption { color: #bcd3ff; }
  .hc-cssd-label { margin: 0 0 0.6rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #0A1F6B; }
  .hc-cssd-takeaway { margin: 1.75rem 0; padding: 0.95rem 1.15rem; border-radius: 0.9rem; border-left: 4px solid #48B900; background: linear-gradient(90deg, #eef4ff 0%, #f7faff 100%); }
  .hc-cssd-takeaway strong { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #2f7a00; }
  .hc-cssd-takeaway p { margin: 0; font-size: 0.98rem; line-height: 1.5; font-weight: 700; color: #0A1F6B; }
  p.hc-cssd-quote { margin: 1.75rem 0; padding: 1.1rem 1.25rem; border-radius: 1rem; background: #0A1F6B; color: #ffffff; font-size: 1.05rem; line-height: 1.45; font-weight: 800; }
  p.hc-cssd-quote::before { content: "\\201C"; display: block; font-size: 2rem; line-height: 1; color: #25B5FF; }
  p.hc-cssd-subtitle { margin: 0 0 1.25rem; font-size: 1.05rem; line-height: 1.55; font-weight: 600; color: #475569; }
  p.hc-cssd-eyebrow { margin: 3rem 0 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-cssd-eyebrow + h2 { margin-top: 0.35rem; }
  h2[id] { scroll-margin-top: 7rem; }
  h3.hc-cssd-h3 { margin: 1.5rem 0 0.4rem; font-size: 1.05rem; font-weight: 800; color: #0A1F6B; }

  .hc-cssd-toc { margin: 2rem 0; border-radius: 1rem; border: 1px solid #dbe5f5; background: #f7faff; }
  .hc-cssd-toc summary { cursor: pointer; padding: 0.95rem 1.2rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #0A1F6B; }
  .hc-cssd-toc summary:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; border-radius: 1rem; }
  .hc-cssd-toc ol { display: grid; gap: 0.1rem 1.25rem; margin: 0; padding: 0 1.2rem 1rem; list-style: none; }
  .hc-cssd-toc li { margin: 0; }
  .hc-cssd-toc .hc-cssd-toc-link { display: block; padding: 0.35rem 0.4rem; border-radius: 0.5rem; font-size: 0.9rem; line-height: 1.35; font-weight: 700; color: #0A1F6B; text-decoration: none; }
  .hc-cssd-toc .hc-cssd-toc-link:hover { background: #eaf1ff; color: #145BFF; }
  .hc-cssd-toc .hc-cssd-toc-link:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; }

  /* Animated scene */
  .hc-cssd-scene { display: block; width: 100%; height: auto; border-radius: 0.9rem; background: rgba(6, 18, 63, 0.55); border: 1px solid rgba(37, 181, 255, 0.25); }
  .hc-cssd-scene .s-doc { fill: #334155; stroke: #f59e0b; stroke-width: 1.5; }
  .hc-cssd-scene .s-doc-line { fill: none; stroke: #fbbf24; stroke-width: 1.4; stroke-linecap: round; }
  .hc-cssd-scene .s-warn { fill: #f59e0b; }
  .hc-cssd-scene .s-win { fill: rgba(255, 255, 255, 0.06); stroke: #8fd3ff; stroke-width: 1.5; }
  .hc-cssd-scene .s-blk { fill: #145BFF; stroke: #8fd3ff; stroke-width: 1; }
  .hc-cssd-scene .s-top { fill: #25B5FF; }
  .hc-cssd-scene .s-line { fill: none; stroke: #ffffff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-cssd-scene .s-link { fill: none; stroke: #25B5FF; stroke-width: 1.8; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
  .hc-cssd-scene .s-int { fill: #ffffff; stroke: #25B5FF; stroke-width: 1.6; }
  .hc-cssd-scene .s-int-db { fill: #145BFF; stroke: #8fd3ff; stroke-width: 1.4; }
  .hc-cssd-scene .s-int-mark { fill: none; stroke: #145BFF; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-cssd-scene .s-bar { fill: #48B900; transform-box: fill-box; transform-origin: bottom; }
  .hc-cssd-scene .s-check { fill: #48B900; }
  .hc-cssd-scene .s-check-mark { fill: none; stroke: #ffffff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  .hc-cssd-scene .s-track { fill: none; stroke: rgba(255, 255, 255, 0.18); stroke-width: 4; stroke-linecap: round; }
  .hc-cssd-scene .s-progress { fill: none; stroke: #25B5FF; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
  .hc-cssd-scene .s-node { fill: #25B5FF; stroke: #06123F; stroke-width: 3; transform-box: fill-box; transform-origin: center; }
  .hc-cssd-scene .s-node-end { fill: #48B900; }
  .hc-cssd-scene .s-loop { fill: none; stroke: #7ddc3c; stroke-width: 2; stroke-dasharray: 1; stroke-dashoffset: 0; stroke-linecap: round; }
  .hc-cssd-scene .s-loop-head { fill: #7ddc3c; }
  ol.hc-cssd-stages { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-top: 1rem; }
  .hc-cssd-stages li { position: relative; z-index: 0; margin: 0; padding: 0.35rem 0.7rem; border-radius: 999px; overflow: hidden; font-size: 0.74rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); }
  .hc-cssd-stages li::before { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(135deg, #145BFF, #25B5FF); opacity: 0; }
  .hc-cssd-stages li:first-child { color: #fde68a; }
  .hc-cssd-stages li:last-child::before { background: linear-gradient(135deg, #2f9a00, #48B900); }

  /* Comparison */
  .hc-cssd-compare { display: grid; gap: 0.75rem; }
  .hc-cssd-side { display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem; border-radius: 1rem; background: #ffffff; border: 1px solid #dbe5f5; min-width: 0; }
  .hc-cssd-side-pack { border: 2px solid #94a3b8; }
  .hc-cssd-side-custom { border: 2px solid #145BFF; background: #f5f9ff; }
  .hc-cssd-side h3 { margin: 0; font-size: 1rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-cssd-side-custom .hc-cssd-label { color: #145BFF; }
  .hc-cssd-list { display: grid; gap: 0.4rem; }
  .hc-cssd-list li { position: relative; margin: 0; padding-left: 1.1rem; font-size: 0.88rem; line-height: 1.4; font-weight: 600; color: #334155; }
  .hc-cssd-list li::before { content: ""; position: absolute; left: 0; top: 0.5em; width: 0.45rem; height: 0.45rem; border-radius: 999px; background: #145BFF; }
  .hc-cssd-side-pack .hc-cssd-list li::before { background: #64748b; }
  .hc-cssd-verdict { margin-top: auto; padding: 0.75rem 0.85rem; border-radius: 0.8rem; background: #f1f5f9; }
  .hc-cssd-verdict span { display: block; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #475569; }
  .hc-cssd-verdict strong { display: block; margin-top: 0.2rem; font-size: 0.95rem; line-height: 1.35; font-weight: 800; color: #0A1F6B; }
  .hc-cssd-side-custom .hc-cssd-verdict { background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-cssd-side-custom .hc-cssd-verdict span { color: #8fd3ff; }
  .hc-cssd-side-custom .hc-cssd-verdict strong { color: #ffffff; }

  /* Value of fit hub */
  .hc-cssd-hub { position: relative; display: grid; gap: 0.75rem; }
  .hc-cssd-core { justify-self: center; margin: 0; padding: 0.9rem 1.3rem; border-radius: 999px; background: linear-gradient(135deg, #0A1F6B, #145BFF); color: #ffffff; text-align: center; font-size: 0.9rem; line-height: 1.25; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; box-shadow: 0 0 0 6px #dbe8ff; }
  .hc-cssd-spokes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem; }
  .hc-cssd-spokes li { margin: 0; display: flex; align-items: center; gap: 0.55rem; min-width: 0; padding: 0.6rem 0.65rem; border-radius: 0.85rem; background: #ffffff; border: 1px solid #cddcf5; }
  .hc-cssd-spokes .hc-cssd-icon { width: 1.8rem; height: 1.8rem; border-radius: 0.55rem; }
  .hc-cssd-spokes .hc-cssd-icon svg { width: 0.95rem; height: 0.95rem; }
  .hc-cssd-spokes strong { min-width: 0; overflow-wrap: break-word; font-size: 0.8rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }

  /* Business value cards */
  .hc-cssd-values { display: grid; gap: 0.75rem; grid-template-columns: 1fr; }
  .hc-cssd-value { margin: 0; min-width: 0; padding: 1rem; border-radius: 1rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-cssd-value strong { display: block; margin-top: 0.65rem; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #0A1F6B; }
  .hc-cssd-value p { margin: 0.3rem 0 0; font-size: 0.86rem; line-height: 1.45; font-weight: 600; color: #475569; }

  /* Journey */
  .hc-cssd-journey { position: relative; display: grid; gap: 0.6rem; padding-left: 1.4rem; counter-reset: hc-cssd-j; }
  .hc-cssd-journey::before { content: ""; position: absolute; left: 0.45rem; top: 0.6rem; bottom: 0.6rem; width: 2px; background: linear-gradient(180deg, #145BFF, #25B5FF, #48B900); }
  .hc-cssd-journey li { position: relative; margin: 0; padding: 0.75rem 0.85rem; border-radius: 0.9rem; background: #ffffff; border: 1px solid #cddcf5; }
  .hc-cssd-journey li::before { content: ""; position: absolute; left: calc(-1.4rem + 0.1rem); top: 1rem; width: 0.8rem; height: 0.8rem; border-radius: 999px; background: #145BFF; box-shadow: 0 0 0 3px #ffffff; }
  .hc-cssd-journey li:last-child::before { background: #48B900; }
  .hc-cssd-journey strong { display: flex; align-items: center; gap: 0.45rem; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A1F6B; }
  .hc-cssd-journey strong::before { counter-increment: hc-cssd-j; content: "0" counter(hc-cssd-j); font-size: 0.72rem; letter-spacing: 0.04em; color: #145BFF; }
  .hc-cssd-journey p { margin: 0.3rem 0 0; font-size: 0.82rem; line-height: 1.4; font-weight: 600; color: #475569; }
  .hc-cssd-loopnote { display: flex; align-items: center; gap: 0.5rem; margin: 0.9rem 0 0; font-size: 0.8rem; line-height: 1.4; font-weight: 700; color: #2f7a00; }
  .hc-cssd-loopnote::before { content: "\\21BB"; font-size: 1.1rem; line-height: 1; }

  /* HyperCode approach */
  .hc-cssd-approach { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem; counter-reset: hc-cssd-a; }
  .hc-cssd-approach li { margin: 0; display: flex; align-items: center; gap: 0.5rem; min-width: 0; padding: 0.7rem 0.75rem; border-radius: 0.9rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); font-size: 0.8rem; line-height: 1.3; font-weight: 800; color: #ffffff; overflow-wrap: break-word; }
  .hc-cssd-approach li::before { counter-increment: hc-cssd-a; content: counter(hc-cssd-a); flex-shrink: 0; width: 1.5rem; height: 1.5rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; color: #06123F; background: #25B5FF; }
  .hc-cssd-approach li:first-child::before { background: #ffffff; }
  .hc-cssd-approach li:last-child { border-color: rgba(125, 220, 60, 0.6); background: rgba(72, 185, 0, 0.18); }
  .hc-cssd-approach li:last-child::before { background: #48B900; color: #ffffff; }

  /* Final */
  .hc-cssd-final { margin: 1.5rem 0 0; padding: 1.75rem 1.25rem; border-radius: 1.25rem; text-align: center; color: #ffffff; background: radial-gradient(circle at 50% 0%, #1f5fe0 0%, #0A1F6B 60%, #06123F 100%); }
  .hc-cssd-final-main { margin: 0; font-size: 1.2rem; line-height: 1.4; font-weight: 800; color: #ffffff; }
  .hc-cssd-final-sub { margin: 0.6rem 0 0; font-size: 0.92rem; line-height: 1.5; font-weight: 600; color: #cfe0ff; }
  ul.hc-cssd-motto { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.35rem 1rem; margin: 1.1rem 0 0; }
  .hc-cssd-motto li { margin: 0; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.16em; color: #25B5FF; }
  .hc-cssd-motto li:last-child { color: #7ddc3c; }
  .hc-cssd-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1.25rem; }
  .hc-cssd-final .hc-cssd-btn { display: inline-block; padding: 0.7rem 1.3rem; border-radius: 999px; background: #ffffff; color: #0A1F6B; font-size: 0.88rem; font-weight: 800; text-decoration: none; }
  .hc-cssd-final .hc-cssd-btn-ghost { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.5); }
  .hc-cssd-final .hc-cssd-btn:hover { background: #eaf1ff; color: #0A1F6B; }
  .hc-cssd-final .hc-cssd-btn:focus-visible { outline: 2px solid #25B5FF; outline-offset: 3px; }

  @media (min-width: 640px) {
    .hc-cssd-visual { padding: 1.5rem; }
    .hc-cssd-toc ol, .hc-cssd-compare { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hc-cssd-values { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hc-cssd-values li:last-child { grid-column: 1 / -1; }
  }

  @media (min-width: 768px) {
    .hc-cssd-hub { display: block; }
    .hc-cssd-spokes { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: auto minmax(6.5rem, auto) auto; gap: 0.6rem; }
    .hc-cssd-spokes li:nth-child(4), .hc-cssd-spokes li:nth-child(5) { align-self: center; }
    .hc-cssd-spokes li:nth-child(5) { grid-column: 3; }
    .hc-cssd-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 30%; max-width: 12rem; padding: 1.1rem 0.75rem; }
    .hc-cssd-journey { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.5rem; padding-left: 0; padding-top: 1.6rem; }
    .hc-cssd-journey::before { left: 10%; right: 10%; top: 0.55rem; bottom: auto; width: auto; height: 2px; background: linear-gradient(90deg, #145BFF, #25B5FF, #48B900); }
    .hc-cssd-journey li { padding: 0.75rem 0.6rem; }
    .hc-cssd-journey li::before { left: 50%; top: -1.4rem; transform: translateX(-50%); }
    .hc-cssd-journey strong { flex-direction: column; align-items: flex-start; gap: 0.15rem; font-size: 0.78rem; letter-spacing: 0.05em; }
    .hc-cssd-journey p { font-size: 0.78rem; }
    .hc-cssd-approach { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hc-cssd-scene .s-doc, .hc-cssd-scene .s-doc-line, .hc-cssd-scene .s-warn { animation: hc-cssd-problem 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-win { animation: hc-cssd-frame 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-build { animation: hc-cssd-build 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-link { animation: hc-cssd-link 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-int-grp { animation: hc-cssd-int 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-bar { animation: hc-cssd-bar 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-value { animation: hc-cssd-value 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-progress { animation: hc-cssd-progress 10s linear infinite both; }
    .hc-cssd-scene .s-node { animation: hc-cssd-node 10s linear infinite both; }
    .hc-cssd-scene .s-loop { animation: hc-cssd-loop 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-loop-head { animation: hc-cssd-loop-head 10s ease-in-out infinite both; }
    .hc-cssd-scene .s-d1 { animation-delay: 0.4s; }
    .hc-cssd-scene .s-d2 { animation-delay: 0.8s; }
    .hc-cssd-scene .s-d3 { animation-delay: 1.2s; }
    .hc-cssd-scene .s-n1 { animation-delay: 1.25s; }
    .hc-cssd-scene .s-n2 { animation-delay: 2.5s; }
    .hc-cssd-scene .s-n3 { animation-delay: 3.75s; }
    .hc-cssd-scene .s-n4 { animation-delay: 5s; }
    .hc-cssd-scene .s-n5 { animation-delay: 6.25s; }
    .hc-cssd-scene .s-n6 { animation-delay: 7.5s; }
    .hc-cssd-stages li::before { animation: hc-cssd-lit 10s linear infinite both; }
    .hc-cssd-stages li:nth-child(2)::before { animation-delay: 1.25s; }
    .hc-cssd-stages li:nth-child(3)::before { animation-delay: 2.5s; }
    .hc-cssd-stages li:nth-child(4)::before { animation-delay: 3.75s; }
    .hc-cssd-stages li:nth-child(5)::before { animation-delay: 5s; }
    .hc-cssd-stages li:nth-child(6)::before { animation-delay: 6.25s; }
    .hc-cssd-stages li:nth-child(7)::before { animation-delay: 7.5s; }
    @keyframes hc-cssd-problem { 0%, 10% { opacity: 1; } 24%, 92% { opacity: 0.3; } 100% { opacity: 1; } }
    @keyframes hc-cssd-frame { 0%, 18% { opacity: 0.2; } 26%, 92% { opacity: 1; } 100% { opacity: 0.2; } }
    @keyframes hc-cssd-build { 0%, 30% { opacity: 0; } 38%, 92% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hc-cssd-link { 0%, 46% { stroke-dashoffset: 1; opacity: 1; } 56%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-cssd-int { 0%, 44% { opacity: 0.15; } 54%, 92% { opacity: 1; } 100% { opacity: 0.15; } }
    @keyframes hc-cssd-bar { 0%, 72% { transform: scaleY(0.1); } 82%, 92% { transform: scaleY(1); } 100% { transform: scaleY(0.1); } }
    @keyframes hc-cssd-value { 0%, 74% { opacity: 0.15; } 80%, 92% { opacity: 1; } 100% { opacity: 0.15; } }
    @keyframes hc-cssd-progress { 0% { stroke-dashoffset: 1; opacity: 1; } 75%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-cssd-node { 0% { transform: scale(1); stroke: #06123F; } 4%, 12% { transform: scale(1.5); stroke: #ffffff; } 18%, 100% { transform: scale(1); stroke: #06123F; } }
    @keyframes hc-cssd-loop { 0%, 78% { stroke-dashoffset: 1; opacity: 1; } 90%, 95% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-cssd-loop-head { 0%, 88% { opacity: 0; } 90%, 95% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hc-cssd-lit { 0% { opacity: 0; } 3% { opacity: 1; } 12% { opacity: 1; } 16% { opacity: 0; } 100% { opacity: 0; } }
  }
</style>

<p class="hc-cssd-subtitle">Why tailored technology is becoming essential for organizations whose processes, customers, data, and ambitions no longer fit neatly inside generic software.</p>

<p>Enterprise software decisions used to be framed as a simple choice: buy a product or build one. Today the more useful question is how well the technology fits the business it is meant to serve. <strong>Custom software development solutions</strong> matter when processes, customers, data and integrations are too important or too distinctive to be forced into generic functionality.</p>

<figure class="hc-cssd-visual hc-cssd-visual-dark" aria-labelledby="hc-cssd-scene-title">
  <div class="hc-cssd-head">
    <div>
      <p class="hc-cssd-kicker">Animated overview</p>
      <p class="hc-cssd-title" id="hc-cssd-scene-title">From Business Problem to Business Value</p>
    </div>
  </div>
  <svg class="hc-cssd-scene" viewBox="0 0 720 260" aria-hidden="true" focusable="false">
    <rect class="s-doc" x="22" y="58" width="62" height="44" rx="4" />
    <path class="s-doc-line" d="M30 70h40M30 80h30M30 90h44" />
    <rect class="s-doc" x="40" y="112" width="62" height="44" rx="4" />
    <path class="s-doc-line" d="M48 124h40M48 134h26M48 144h36" />
    <circle class="s-warn" cx="92" cy="58" r="8" />
    <rect class="s-win" x="150" y="28" width="300" height="152" rx="10" />
    <rect class="s-top s-build" x="150" y="28" width="300" height="18" rx="9" />
    <rect class="s-blk s-build s-d1" x="160" y="56" width="60" height="114" rx="6" />
    <rect class="s-blk s-build s-d2" x="230" y="56" width="100" height="48" rx="6" />
    <rect class="s-blk s-build s-d2" x="340" y="56" width="100" height="48" rx="6" />
    <rect class="s-blk s-build s-d3" x="230" y="112" width="210" height="58" rx="6" />
    <polyline class="s-line s-build s-d3" points="242,158 290,138 330,148 380,124 428,130" />
    <path class="s-link" pathLength="1" d="M450 52 H 500" />
    <path class="s-link" pathLength="1" d="M450 104 C 472 104, 482 104, 500 104" />
    <path class="s-link" pathLength="1" d="M450 156 C 472 156, 482 156, 500 156" />
    <g class="s-int-grp">
      <rect class="s-int" x="500" y="38" width="52" height="28" rx="7" />
      <path class="s-int-mark" d="M514 46 l -6 6 l 6 6 M538 46 l 6 6 l -6 6 M529 44 l -6 16" />
    </g>
    <g class="s-int-grp s-d1">
      <ellipse class="s-int-db" cx="526" cy="94" rx="22" ry="6" />
      <path class="s-int-db" d="M504 94 v 20 a 22 6 0 0 0 44 0 v -20" />
    </g>
    <g class="s-int-grp s-d2">
      <path class="s-int" d="M512 168 a 12 12 0 0 1 2 -23 a 15 15 0 0 1 28 3 a 10 10 0 0 1 2 20 z" />
    </g>
    <rect class="s-bar" x="596" y="138" width="16" height="32" rx="2" />
    <rect class="s-bar s-d1" x="620" y="116" width="16" height="54" rx="2" />
    <rect class="s-bar s-d2" x="644" y="92" width="16" height="78" rx="2" />
    <g class="s-value">
      <circle class="s-check" cx="680" cy="56" r="18" />
      <path class="s-check-mark" d="M671 56 l 6 6 l 11 -12" />
    </g>
    <path class="s-track" d="M40 214 H 680" />
    <path class="s-progress" pathLength="1" d="M40 214 H 680" />
    <path class="s-loop" pathLength="1" d="M565 226 C 540 252, 170 252, 147 230" />
    <path class="s-loop-head" d="M140 222 l 14 4 l -9 10 z" />
    <circle class="s-node" cx="40" cy="214" r="7" />
    <circle class="s-node s-n1" cx="145" cy="214" r="7" />
    <circle class="s-node s-n2" cx="250" cy="214" r="7" />
    <circle class="s-node s-n3" cx="355" cy="214" r="7" />
    <circle class="s-node s-n4" cx="460" cy="214" r="7" />
    <circle class="s-node s-n5" cx="565" cy="214" r="7" />
    <circle class="s-node s-node-end s-n6" cx="680" cy="214" r="7" />
  </svg>
  <ol class="hc-cssd-stages" aria-label="Custom software journey">
${sceneStages}
  </ol>
  <figcaption class="hc-cssd-caption">Workarounds give way to a solution that is discovered, designed, developed and deployed around the business, connected to APIs, data and cloud services, and then evolved as needs change. The bars are conceptual and do not represent measured results.</figcaption>
</figure>

<details class="hc-cssd-toc" open>
  <summary>In this article</summary>
  <ol>
${toc}
  </ol>
</details>

<p class="hc-cssd-eyebrow">01 | The Business Reality</p>
<h2 id="business-reality">When Off-the-Shelf Software Stops Being Enough</h2>

<p>Off-the-shelf software has helped organizations solve common business problems quickly. It provides established features, familiar interfaces, and a defined product roadmap. For many standard requirements, that approach can be entirely appropriate.</p>

<p>The difficulty begins when the organization itself is not standard. Enterprise processes are shaped by years of operating experience, customer expectations, industry requirements, internal approvals, data structures, and integrations with other systems. As those factors become more complex, a generic product can start creating friction rather than removing it.</p>

<p>The first signs are often small: employees export data into spreadsheets, enter the same information more than once, maintain workarounds outside the official system, or depend on manual steps because the software cannot quite support the way work actually happens.</p>

<p class="hc-cssd-quote">The real challenge is not the lack of software. It is the lack of software that truly understands the business.</p>

<p>Over time, these compromises can become expensive. They consume employee time, make processes harder to change, introduce additional points of failure, and make it more difficult to respond when customers, regulations, or business priorities change.</p>

<p>This is where custom software development solutions become relevant: not because every enterprise should build everything itself, but because some business capabilities are too important, too distinctive, or too constrained by existing tools to remain dependent on generic functionality.</p>

<figure class="hc-cssd-visual" aria-labelledby="hc-cssd-compare-title">
  <div class="hc-cssd-head">
    <div>
      <p class="hc-cssd-kicker">Two valid approaches</p>
      <p class="hc-cssd-title" id="hc-cssd-compare-title">Off-the-Shelf vs. Custom Software</p>
    </div>
  </div>
  <div class="hc-cssd-compare">
    <div class="hc-cssd-side hc-cssd-side-pack">
      <h3>Off-the-shelf software</h3>
      <div>
        <p class="hc-cssd-label">Best for</p>
        <ul class="hc-cssd-list">
          <li>Common, well-understood capabilities</li>
          <li>Standard requirements that fit established features</li>
          <li>Capabilities that are not strategically differentiating</li>
        </ul>
      </div>
      <p class="hc-cssd-verdict"><span>Potential constraint</span><strong>Business adapts to software</strong></p>
    </div>
    <div class="hc-cssd-side hc-cssd-side-custom">
      <h3>Custom software</h3>
      <div>
        <p class="hc-cssd-label">Best for</p>
        <ul class="hc-cssd-list">
          <li>Important or distinctive business capabilities</li>
          <li>Complex workflows, data and integrations</li>
          <li>Processes that need greater control over how they evolve</li>
        </ul>
      </div>
      <p class="hc-cssd-verdict"><span>Core advantage</span><strong>Software adapts to the business</strong></p>
    </div>
  </div>
  <figcaption class="hc-cssd-caption">Both have a place in an enterprise. The right choice depends on how common, important and distinctive the capability is.</figcaption>
</figure>

<p class="hc-cssd-eyebrow">02 | The Value of Fit</p>
<h2 id="business-problem">Custom Software Starts With the Business Problem</h2>

<p>Custom software is not simply a decision to write code instead of buying a product. It is a decision to design technology around a particular business context. The starting point is not a feature catalogue. It is the problem the organization needs to solve and the outcome it needs to create.</p>

<p>That distinction changes the development conversation. Instead of asking which existing product comes closest to the requirement, the team can ask what the ideal workflow should look like, what information needs to move through it, which systems must connect, where decisions happen, and where technology can remove unnecessary effort.</p>

<div class="hc-cssd-takeaway">
  <strong>Key idea</strong>
  <p>The value is in the fit.</p>
</div>

<figure class="hc-cssd-visual" aria-labelledby="hc-cssd-hub-title">
  <div class="hc-cssd-head">
    <div>
      <p class="hc-cssd-kicker">The value of fit</p>
      <p class="hc-cssd-title" id="hc-cssd-hub-title">What Custom Software Is Designed Around</p>
    </div>
  </div>
  <div class="hc-cssd-hub">
    <p class="hc-cssd-core">Custom software</p>
    <ul class="hc-cssd-spokes">
      ${spoke(icon.flow, 'Real workflows')}
      ${spoke(icon.plug, 'Integration by design')}
      ${spoke(icon.rules, 'Business rules')}
      ${spoke(icon.smile, 'Customer experience')}
      ${spoke(icon.data, 'Data')}
      ${spoke(icon.scale, 'Scalability')}
      ${spoke(icon.shield, 'Security')}
      ${spoke(icon.bolt, 'Automation &amp; AI readiness')}
    </ul>
  </div>
</figure>

<h2 id="real-workflows">A Closer Fit to Real Workflows</h2>

<p>A tailored system can reflect the actual sequence of work rather than asking employees to adapt their process to a generic configuration. That can reduce workarounds and make the software feel like part of the operation.</p>

<h2 id="integration">Integration by Design</h2>

<p>Enterprise software rarely stands alone. Custom development can be designed around existing databases, APIs, identity services, finance platforms, partner systems, cloud environments, and other applications that already matter to the business.</p>

<ul class="hc-cssd-chips" aria-label="Systems custom software can be designed around">
  <li>Databases</li><li>APIs</li><li>Identity services</li><li>Finance platforms</li><li>Partner systems</li><li>Cloud environments</li><li>Existing applications</li>
</ul>

<p>When integration is part of the design rather than an afterthought, information can move between systems with less manual effort. That same foundation supports <a href="/en/solutions/data-engineering-solutions">data engineering</a>, <a href="/en/solutions/business-intelligence">business intelligence</a> and <a href="/en/solutions/cloud-migration">cloud migration</a> work as the environment grows.</p>

<h2 id="differentiation">Room for Differentiation</h2>

<p>Some capabilities are simply necessary to operate. Others are what make an organization distinctive. Custom development gives enterprises greater control over the technology behind those differentiated processes, products, and experiences.</p>

<h2 id="evolve">A Foundation That Can Evolve</h2>

<p>Requirements change. New channels appear, teams grow, data volumes increase, and business priorities shift. A solution designed for maintainability, scalability, security, and integration can evolve instead of becoming another constraint.</p>

<p class="hc-cssd-quote">The best custom software does not make the business adapt to technology. It makes technology adapt to the business.</p>

<p>That does not mean packaged software has no place in an enterprise. Standard products can be valuable where the capability is common, well understood, and not strategically differentiating. The case for custom development is strongest where the organization needs greater control over an important capability.</p>

<p class="hc-cssd-eyebrow">03 | From Technology to Business Value</p>
<h2 id="impact">The Impact Goes Beyond the Application</h2>

<p>The strongest custom software projects are not technology projects in isolation. They change the way work gets done. A well-designed solution can connect information, remove unnecessary handoffs, improve visibility, and make it easier for teams to respond when the business changes.</p>

<figure class="hc-cssd-visual" aria-labelledby="hc-cssd-value-title">
  <div class="hc-cssd-head">
    <div>
      <p class="hc-cssd-kicker">Business value</p>
      <p class="hc-cssd-title" id="hc-cssd-value-title">Five Outcomes Beyond the Application</p>
    </div>
  </div>
  <ul class="hc-cssd-values">
    ${value(icon.smile, 'Customer experience', 'More consistent and responsive journeys.')}
    ${value(icon.flow, 'Operational efficiency', 'Fewer manual handoffs and duplicate steps.', ' hc-cssd-icon-navy')}
    ${value(icon.chart, 'Decision-making', 'Better access to useful operational information.')}
    ${value(icon.scale, 'Agility', 'Technology easier to change as business needs change.', ' hc-cssd-icon-navy')}
    ${value(icon.bolt, 'Automation &amp; AI foundation', 'Reliable workflows, data and integrations ready for future intelligence.', ' hc-cssd-icon-green')}
  </ul>
</figure>

<h3 class="hc-cssd-h3">Stronger customer experiences</h3>
<p>When technology is built around the customer journey, organizations can create more consistent interactions, faster responses, and experiences that reflect how customers actually engage with the business.</p>

<h3 class="hc-cssd-h3">Greater operational efficiency</h3>
<p>Connected workflows can reduce duplicate entry, repetitive approvals, manual handoffs, and unnecessary movement between disconnected tools.</p>

<h3 class="hc-cssd-h3">Better decision-making</h3>
<p>A well-designed system can organize operational information so teams can access, interpret, and use it more effectively when decisions need to be made.</p>

<h3 class="hc-cssd-h3">Higher agility</h3>
<p>Technology becomes easier to adapt when architecture, integrations, data, and deployment practices are designed with change in mind.</p>

<h3 class="hc-cssd-h3">A stronger foundation for automation and AI</h3>
<p>When workflows, data, security, and integrations are intentionally engineered, future automation and AI initiatives have a more reliable environment in which to operate. That is the groundwork <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a> depends on.</p>

<div class="hc-cssd-takeaway">
  <strong>Key idea</strong>
  <p>The important measure is not how much technology was built. It is what became possible because the technology fit the business better.</p>
</div>

<p class="hc-cssd-eyebrow">04 | Building for What Comes Next</p>
<h2 id="vision">From Business Vision to a Solution That Evolves</h2>

<p>A successful custom software development solution begins long before the first line of production code. It starts with understanding the business problem, the people affected by it, the existing technology environment, and the future the organization is trying to reach.</p>

<figure class="hc-cssd-visual" aria-labelledby="hc-cssd-journey-title">
  <div class="hc-cssd-head">
    <div>
      <p class="hc-cssd-kicker">The journey</p>
      <p class="hc-cssd-title" id="hc-cssd-journey-title">Discover, Design, Develop, Deploy, Evolve</p>
    </div>
  </div>
  <ol class="hc-cssd-journey">
    ${step('Discover', 'Goals, users, workflows and constraints')}
    ${step('Design', 'Experience and architecture')}
    ${step('Develop', 'Manageable, validated increments')}
    ${step('Deploy', 'Integrate, test, observe and adopt')}
    ${step('Evolve', 'Improve as needs change')}
  </ol>
  <p class="hc-cssd-loopnote">Evolve feeds the next round of discovery. Custom does not mean static.</p>
</figure>

<p><strong>Discover.</strong> Understand goals, users, workflows, constraints, dependencies, and opportunities before deciding what to build.</p>

<p><strong>Design.</strong> Translate those findings into an experience and architecture that balance business value, usability, security, integration, and maintainability.</p>

<p><strong>Develop.</strong> Build in manageable increments, validating assumptions while keeping quality, scalability, and maintainability part of the engineering process.</p>

<p><strong>Deploy.</strong> Integrate, test, observe, and introduce the solution into the real operating environment with the support needed for reliable adoption.</p>

<p><strong>Evolve.</strong> Continue improving the product as users provide feedback, business requirements change, and new opportunities emerge. Custom does not mean static; its value is the ability to evolve.</p>

<p>The real opportunity is not simply to replace an existing tool. It is to build a digital capability that gives the organization more control over how it serves customers, operates internally, and responds to what comes next. For a deeper look at each stage, read <a href="/en/insights/lifecycle-of-custom-software-design-and-development">The Lifecycle of Custom Software Design and Development</a>.</p>

<p class="hc-cssd-eyebrow">05 | Where HyperCode Fits</p>
<h2 id="hypercode">Where HyperCode Fits</h2>

<p>At HyperCode, custom software development connects business goals with practical engineering, from discovery and architecture through development, integration, deployment, and continued evolution.</p>

<figure class="hc-cssd-visual hc-cssd-visual-dark" aria-labelledby="hc-cssd-approach-title">
  <div class="hc-cssd-head">
    <div>
      <p class="hc-cssd-kicker">The HyperCode approach</p>
      <p class="hc-cssd-title" id="hc-cssd-approach-title">From Business Goals to Business Value</p>
    </div>
    ${logo}
  </div>
  <ol class="hc-cssd-approach">
    <li>Business goals</li>
    <li>Discovery</li>
    <li>Architecture</li>
    <li>Custom engineering</li>
    <li>Integration</li>
    <li>Deployment</li>
    <li>Continuous evolution</li>
    <li>Business value</li>
  </ol>
</figure>

<p>Explore the services behind this approach: <a href="/en/solutions/custom-software-development">custom software development</a>, <a href="/en/solutions/web-development-services">web development services</a>, <a href="/en/solutions/digital-transformation-consulting">digital transformation consulting</a> and <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a>. When existing platforms are part of the picture, read <a href="/en/insights/enterprise-software-development-modernizing-core-systems">Enterprise Software Development: Modernizing Core Systems</a> and <a href="/en/insights/scaling-success-custom-enterprise-software">Scaling Success with Custom Enterprise Software</a>.</p>

<div class="hc-cssd-final">
  <p class="hc-cssd-final-main">When the business is unique, the technology should have room to be unique too.</p>
  <p class="hc-cssd-final-sub">Start with the business problem, design around the way work actually happens, and build a solution that can keep evolving.</p>
  <ul class="hc-cssd-motto"><li>WE BUILD.</li><li>WE SOLVE.</li><li>WE GROW.</li></ul>
  <div class="hc-cssd-btns">
    <a class="hc-cssd-btn" href="/en/consultation">Schedule Consultation</a>
    <a class="hc-cssd-btn hc-cssd-btn-ghost" href="/en/solutions/custom-software-development">Explore Custom Software</a>
  </div>
</div>
`;
