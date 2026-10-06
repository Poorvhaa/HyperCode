const icon = {
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',
  app: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  plug: '<svg viewBox="0 0 24 24"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/></svg>',
  data: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
  cloud: '<svg viewBox="0 0 24 24"><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.5 13 3.5 3.5 0 0 0 6 19z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
  flow: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/></svg>',
  smile: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
};

const logo = '<img class="hc-esdm-logo" src="/hypercodeit.logo.webp" width="40" height="40" alt="HyperCode" loading="lazy" decoding="async" />';

const toc = [
  ['case-for-change', 'Your Core System Is Institutional Memory'],
  ['anatomy', 'Anatomy of a Core System'],
  ['map', 'Modernization Starts With a Map'],
  ['preserve', 'Preserve What Holds the Business Together'],
  ['route', 'Not Every System Needs the Same Future'],
  ['program', 'A Modernization Program Should Learn'],
  ['business-test', 'The Business Test'],
  ['hypercode', 'Where HyperCode Fits'],
  ['viewpoint', 'Build the Foundation. Then Build What Comes Next.'],
]
  .map(([id, label]) => `      <li><a class="hc-esdm-toc-link" href="#${id}">${label}</a></li>`)
  .join('\n');

const sceneStages = ['Legacy', 'Assess', 'Architect', 'Modernize', 'Connect', 'Cloud, data &amp; APIs', 'Scale']
  .map((s) => `        <li>${s}</li>`)
  .join('\n');

const layer = (ic: string, title: string, tone = '') =>
  `<li class="hc-esdm-layer${tone}"><span class="hc-esdm-icon" aria-hidden="true">${ic}</span><strong>${title}</strong></li>`;

const keep = (text: string) => `<li><span class="hc-esdm-mark hc-esdm-mark-keep" aria-hidden="true">${icon.check}</span>${text}</li>`;
const drop = (text: string) => `<li><span class="hc-esdm-mark hc-esdm-mark-drop" aria-hidden="true">${icon.x}</span>${text}</li>`;

const route = (name: string, text: string) => `<li><strong>${name}</strong><p>${text}</p></li>`;

const outcome = (ic: string, title: string, text: string, tone = '') =>
  `<li class="hc-esdm-outcome"><span class="hc-esdm-icon${tone}" aria-hidden="true">${ic}</span><strong>${title}</strong><p>${text}</p></li>`;

export const enterpriseModernizationContentEn = `
<style>
  .hc-esdm-visual { margin: 2.25rem 0; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid #dbe5f5; background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%); max-width: 100%; overflow: hidden; }
  .hc-esdm-visual-dark { background: radial-gradient(circle at 50% 0%, #123a9c 0%, #0A1F6B 55%, #06123F 100%); border-color: #0A1F6B; color: #ffffff; }
  .hc-esdm-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 0 0 1rem; }
  .hc-esdm-kicker { margin: 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #145BFF; }
  .hc-esdm-title { margin: 0.2rem 0 0; font-size: 1.05rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-esdm-visual-dark .hc-esdm-kicker { color: #25B5FF; }
  .hc-esdm-visual-dark .hc-esdm-title { color: #ffffff; }
  .hc-esdm-logo { flex-shrink: 0; width: 40px; height: 40px; border-radius: 0.6rem; background: #ffffff; padding: 3px; box-shadow: 0 1px 3px rgba(10, 31, 107, 0.15); object-fit: contain; }
  ul.hc-esdm-grid, ol.hc-esdm-stages, ol.hc-esdm-layers, ul.hc-esdm-split-list, ol.hc-esdm-routes, ol.hc-esdm-road, ul.hc-esdm-chips, ol.hc-esdm-delivery, ul.hc-esdm-deps { list-style: none; margin: 0; padding: 0; }
  .hc-esdm-grid { display: grid; gap: 0.75rem; grid-template-columns: 1fr; }
  .hc-esdm-grid > li { margin: 0; min-width: 0; overflow-wrap: break-word; }
  .hc-esdm-icon { flex-shrink: 0; width: 2.1rem; height: 2.1rem; border-radius: 0.65rem; display: grid; place-items: center; color: #ffffff; background: linear-gradient(135deg, #145BFF, #25B5FF); }
  .hc-esdm-icon svg, .hc-esdm-mark svg { width: 1.05rem; height: 1.05rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-esdm-icon-green { background: linear-gradient(135deg, #2f9a00, #48B900); }
  .hc-esdm-icon-navy { background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-esdm-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .hc-esdm-chips li { margin: 0; padding: 0.25rem 0.6rem; border-radius: 999px; background: #eef4ff; color: #1e3a8a; font-size: 0.76rem; line-height: 1.3; font-weight: 700; }
  .hc-esdm-caption { margin: 0.9rem 0 0; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }
  .hc-esdm-visual-dark .hc-esdm-caption { color: #bcd3ff; }
  .hc-esdm-label { margin: 0 0 0.6rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #0A1F6B; }
  .hc-esdm-takeaway { margin: 1.75rem 0; padding: 0.95rem 1.15rem; border-radius: 0.9rem; border-left: 4px solid #48B900; background: linear-gradient(90deg, #eef4ff 0%, #f7faff 100%); }
  .hc-esdm-takeaway strong { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #2f7a00; }
  .hc-esdm-takeaway p { margin: 0; font-size: 0.98rem; line-height: 1.5; font-weight: 700; color: #0A1F6B; }
  p.hc-esdm-quote { margin: 1.75rem 0; padding: 1.1rem 1.25rem; border-radius: 1rem; background: #0A1F6B; color: #ffffff; font-size: 1.05rem; line-height: 1.45; font-weight: 800; }
  p.hc-esdm-quote::before { content: "\\201C"; display: block; font-size: 2rem; line-height: 1; color: #25B5FF; }
  p.hc-esdm-subtitle { margin: 0 0 0.4rem; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-esdm-eyebrow { margin: 3rem 0 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-esdm-eyebrow + h2 { margin-top: 0.35rem; }
  h2[id] { scroll-margin-top: 7rem; }
  h3.hc-esdm-h3 { margin: 1.5rem 0 0.6rem; font-size: 1.05rem; font-weight: 800; color: #0A1F6B; }

  .hc-esdm-toc { margin: 2rem 0; border-radius: 1rem; border: 1px solid #dbe5f5; background: #f7faff; }
  .hc-esdm-toc summary { cursor: pointer; padding: 0.95rem 1.2rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #0A1F6B; }
  .hc-esdm-toc summary:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; border-radius: 1rem; }
  .hc-esdm-toc ol { display: grid; gap: 0.1rem 1.25rem; margin: 0; padding: 0 1.2rem 1rem; list-style: none; }
  .hc-esdm-toc li { margin: 0; }
  .hc-esdm-toc .hc-esdm-toc-link { display: block; padding: 0.35rem 0.4rem; border-radius: 0.5rem; font-size: 0.9rem; line-height: 1.35; font-weight: 700; color: #0A1F6B; text-decoration: none; }
  .hc-esdm-toc .hc-esdm-toc-link:hover { background: #eaf1ff; color: #145BFF; }
  .hc-esdm-toc .hc-esdm-toc-link:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; }

  /* Animated modernization scene */
  .hc-esdm-scene { display: block; width: 100%; height: auto; border-radius: 0.9rem; background: rgba(6, 18, 63, 0.55); border: 1px solid rgba(37, 181, 255, 0.25); }
  .hc-esdm-scene .s-zone { fill: rgba(255, 255, 255, 0.04); stroke: rgba(255, 255, 255, 0.12); }
  .hc-esdm-scene .s-legacy { fill: #475569; stroke: #94a3b8; stroke-width: 1.5; }
  .hc-esdm-scene .s-legacy-line { fill: none; stroke: #94a3b8; stroke-width: 1.4; }
  .hc-esdm-scene .s-screen { fill: #0f172a; stroke: #94a3b8; stroke-width: 1.5; }
  .hc-esdm-scene .s-term { fill: none; stroke: #4ade80; stroke-width: 2; stroke-linecap: round; }
  .hc-esdm-scene .s-doc { fill: #e2e8f0; stroke: #94a3b8; }
  .hc-esdm-scene .s-tangle { fill: none; stroke: #94a3b8; stroke-width: 1.2; opacity: 0.45; }
  .hc-esdm-scene .s-dep { fill: none; stroke: #25B5FF; stroke-width: 1.6; stroke-linecap: round; }
  .hc-esdm-scene .s-flow { fill: none; stroke: #25B5FF; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 10 8; }
  .hc-esdm-scene .s-head { fill: #25B5FF; }
  .hc-esdm-scene .s-mod { fill: #145BFF; stroke: #8fd3ff; stroke-width: 1.2; transform-box: fill-box; transform-origin: center; }
  .hc-esdm-scene .s-api { fill: none; stroke: #8fd3ff; stroke-width: 1.4; stroke-linecap: round; }
  .hc-esdm-scene .s-node { fill: #25B5FF; }
  .hc-esdm-scene .s-cloud { fill: #ffffff; stroke: #25B5FF; stroke-width: 2; }
  .hc-esdm-scene .s-db { fill: #145BFF; stroke: #8fd3ff; stroke-width: 1.4; }
  .hc-esdm-scene .s-shield { fill: #48B900; }
  .hc-esdm-scene .s-bar { fill: #48B900; transform-box: fill-box; transform-origin: bottom; }
  ol.hc-esdm-stages { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-top: 1rem; counter-reset: hc-esdm-st; }
  .hc-esdm-stages li { position: relative; z-index: 0; margin: 0; padding: 0.35rem 0.7rem; border-radius: 999px; overflow: hidden; font-size: 0.74rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); }
  .hc-esdm-stages li::before { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(135deg, #145BFF, #25B5FF); opacity: 0; }
  .hc-esdm-stages li:first-child { color: #cbd5e1; }
  .hc-esdm-stages li:last-child::before { background: linear-gradient(135deg, #2f9a00, #48B900); }

  /* Anatomy */
  .hc-esdm-anatomy { display: grid; gap: 0.9rem; }
  .hc-esdm-layers { display: grid; gap: 0.5rem; }
  .hc-esdm-layer { margin: 0; display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0.9rem; border-radius: 0.9rem; background: #ffffff; border: 1px solid #cddcf5; }
  .hc-esdm-layer strong { font-size: 0.86rem; line-height: 1.3; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #0A1F6B; }
  .hc-esdm-layer-mid { background: #eef4ff; border-color: #145BFF; border-style: dashed; }
  .hc-esdm-callout { padding: 0.9rem 1rem; border-radius: 0.9rem; background: #0A1F6B; color: #ffffff; font-size: 0.9rem; line-height: 1.45; font-weight: 700; }
  .hc-esdm-callout span { display: block; margin-bottom: 0.25rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #25B5FF; }

  /* Dependency map */
  .hc-esdm-map { display: grid; gap: 0.75rem; justify-items: center; }
  .hc-esdm-hub { padding: 0.85rem 1.1rem; border-radius: 0.9rem; background: linear-gradient(135deg, #0A1F6B, #145BFF); color: #ffffff; text-align: center; font-size: 0.9rem; font-weight: 800; }
  .hc-esdm-hub small { display: block; font-size: 0.74rem; font-weight: 600; color: #cfe0ff; }
  .hc-esdm-deps { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.45rem; width: 100%; }
  .hc-esdm-deps li { position: relative; margin: 0; padding: 0.5rem 0.6rem; border-radius: 0.7rem; background: #ffffff; border: 1px dashed #145BFF; text-align: center; font-size: 0.78rem; line-height: 1.3; font-weight: 700; color: #0A1F6B; }
  .hc-esdm-deps li.hc-esdm-dep-hidden { border-color: #f59e0b; background: #fffbeb; color: #92400e; }

  /* Preserve vs change */
  .hc-esdm-split { display: grid; gap: 0.75rem; }
  .hc-esdm-side { padding: 1rem; border-radius: 1rem; background: #ffffff; border: 1px solid #dbe5f5; }
  .hc-esdm-side-keep { border: 2px solid #48B900; background: #f6fdf0; }
  .hc-esdm-side-change { border: 2px solid #145BFF; background: #f5f9ff; }
  .hc-esdm-side-keep .hc-esdm-label { color: #2f7a00; }
  .hc-esdm-side-change .hc-esdm-label { color: #145BFF; }
  .hc-esdm-split-list { display: grid; gap: 0.45rem; }
  .hc-esdm-split-list li { margin: 0; display: flex; align-items: center; gap: 0.55rem; font-size: 0.88rem; line-height: 1.35; font-weight: 700; color: #0A1F6B; }
  .hc-esdm-mark { flex-shrink: 0; width: 1.5rem; height: 1.5rem; border-radius: 999px; display: grid; place-items: center; color: #ffffff; }
  .hc-esdm-mark svg { width: 0.8rem; height: 0.8rem; stroke-width: 3; }
  .hc-esdm-mark-keep { background: #48B900; }
  .hc-esdm-mark-drop { background: #145BFF; }

  /* Decision tree */
  .hc-esdm-root { width: fit-content; max-width: 100%; margin: 0 auto; padding: 0.75rem 1.2rem; border-radius: 0.9rem; background: linear-gradient(135deg, #0A1F6B, #145BFF); color: #ffffff; text-align: center; font-size: 0.88rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
  .hc-esdm-routes { position: relative; display: grid; gap: 0.55rem; margin-top: 1rem; padding-left: 1.1rem; border-left: 2px solid #bcd3ff; }
  .hc-esdm-routes li { position: relative; margin: 0; padding: 0.75rem 0.85rem; border-radius: 0.9rem; background: #ffffff; border: 1px solid #cddcf5; }
  .hc-esdm-routes li::before { content: ""; position: absolute; left: calc(-1.1rem - 1px); top: 1.2rem; width: 1.1rem; height: 2px; background: #bcd3ff; }
  .hc-esdm-routes li:last-child { border-color: #a9dd84; background: #f6fdf0; }
  .hc-esdm-routes strong { display: block; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #145BFF; }
  .hc-esdm-routes li:last-child strong { color: #2f7a00; }
  .hc-esdm-routes p { margin: 0.3rem 0 0; font-size: 0.82rem; line-height: 1.4; font-weight: 600; color: #475569; }

  /* Roadmap */
  .hc-esdm-road { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.55rem; counter-reset: hc-esdm-road; }
  .hc-esdm-road li { position: relative; z-index: 0; margin: 0; padding: 0.8rem 0.75rem; border-radius: 0.9rem; overflow: hidden; background: #ffffff; border: 1px solid #dbe5f5; }
  .hc-esdm-road li::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(135deg, rgba(20, 91, 255, 0.14), rgba(37, 181, 255, 0.2)); opacity: 0; }
  .hc-esdm-road strong { display: flex; align-items: center; gap: 0.45rem; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #0A1F6B; }
  .hc-esdm-road strong::before { counter-increment: hc-esdm-road; content: counter(hc-esdm-road); flex-shrink: 0; width: 1.5rem; height: 1.5rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; letter-spacing: 0; color: #ffffff; background: #145BFF; }
  .hc-esdm-road li:last-child strong::before { background: #48B900; }
  .hc-esdm-road span { display: block; margin-top: 0.3rem; font-size: 0.8rem; font-weight: 600; color: #475569; }

  /* Outcomes */
  .hc-esdm-outcome { height: 100%; padding: 1rem; border-radius: 1rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-esdm-outcome strong { display: block; margin-top: 0.65rem; font-size: 0.88rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #0A1F6B; }
  .hc-esdm-outcome p { margin: 0.3rem 0 0; font-size: 0.84rem; line-height: 1.45; font-weight: 600; color: #475569; }

  /* Delivery path */
  .hc-esdm-delivery { display: grid; gap: 0.6rem; counter-reset: hc-esdm-del; }
  .hc-esdm-delivery li { margin: 0; padding: 0.85rem 0.9rem; border-radius: 0.95rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); }
  .hc-esdm-delivery strong { display: flex; align-items: center; gap: 0.5rem; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #ffffff; }
  .hc-esdm-delivery strong::before { counter-increment: hc-esdm-del; content: counter(hc-esdm-del); flex-shrink: 0; width: 1.6rem; height: 1.6rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; letter-spacing: 0; color: #06123F; background: #25B5FF; }
  .hc-esdm-delivery li:last-child strong::before { background: #48B900; color: #ffffff; }
  .hc-esdm-delivery p { margin: 0.35rem 0 0; font-size: 0.84rem; line-height: 1.4; font-weight: 600; color: #cfe0ff; }

  /* Final */
  .hc-esdm-final { margin: 1.5rem 0 0; padding: 1.75rem 1.25rem; border-radius: 1.25rem; text-align: center; color: #ffffff; background: radial-gradient(circle at 50% 0%, #1f5fe0 0%, #0A1F6B 60%, #06123F 100%); }
  .hc-esdm-final-main { margin: 0; font-size: 1.2rem; line-height: 1.4; font-weight: 800; color: #ffffff; }
  .hc-esdm-final-sub { margin: 0.6rem 0 0; font-size: 0.92rem; line-height: 1.5; font-weight: 600; color: #cfe0ff; }
  ul.hc-esdm-motto { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.35rem 1rem; margin: 1.1rem 0 0; padding: 0; list-style: none; }
  .hc-esdm-motto li { margin: 0; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.16em; color: #25B5FF; }
  .hc-esdm-motto li:last-child { color: #7ddc3c; }
  .hc-esdm-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1.25rem; }
  .hc-esdm-final .hc-esdm-btn { display: inline-block; padding: 0.7rem 1.3rem; border-radius: 999px; background: #ffffff; color: #0A1F6B; font-size: 0.88rem; font-weight: 800; text-decoration: none; }
  .hc-esdm-final .hc-esdm-btn-ghost { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.5); }
  .hc-esdm-final .hc-esdm-btn:hover { background: #eaf1ff; color: #0A1F6B; }
  .hc-esdm-final .hc-esdm-btn:focus-visible { outline: 2px solid #25B5FF; outline-offset: 3px; }

  @media (min-width: 640px) {
    .hc-esdm-visual { padding: 1.5rem; }
    .hc-esdm-cols-2, .hc-esdm-toc ol, .hc-esdm-split { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hc-esdm-deps { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .hc-esdm-road { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (min-width: 768px) {
    .hc-esdm-anatomy { grid-template-columns: minmax(0, 1fr) 12rem; align-items: center; }
    .hc-esdm-routes { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.5rem; margin-top: 2.4rem; padding-left: 0; border-left: 0; }
    .hc-esdm-routes::before { content: ""; position: absolute; left: 10%; right: 10%; top: -1.2rem; height: 2px; background: #bcd3ff; }
    .hc-esdm-routes::after { content: ""; position: absolute; left: 50%; top: -2.4rem; width: 2px; height: 1.2rem; background: #bcd3ff; }
    .hc-esdm-routes li { padding: 0.75rem 0.6rem; text-align: center; }
    .hc-esdm-routes li::before { left: 50%; top: -1.2rem; width: 2px; height: 1.2rem; }
    .hc-esdm-routes strong { font-size: 0.78rem; letter-spacing: 0.04em; }
    .hc-esdm-routes p { font-size: 0.78rem; }
    .hc-esdm-road { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.45rem; }
    .hc-esdm-road li { padding: 0.75rem 0.55rem; }
    .hc-esdm-road strong { flex-direction: column; align-items: flex-start; font-size: 0.74rem; letter-spacing: 0.03em; }
    .hc-esdm-delivery { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hc-esdm-scene .s-tangle { animation: hc-esdm-tangle 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-dep { stroke-dasharray: 1; animation: hc-esdm-draw-dep 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-flow { animation: hc-esdm-flow 10s linear infinite both; }
    .hc-esdm-scene .s-head { animation: hc-esdm-show-flow 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-mod { animation: hc-esdm-mod 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-api { stroke-dasharray: 1; animation: hc-esdm-draw-api 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-node { animation: hc-esdm-node 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-cloud, .hc-esdm-scene .s-db, .hc-esdm-scene .s-shield { animation: hc-esdm-cloud 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-bar { animation: hc-esdm-bar 10s ease-in-out infinite both; }
    .hc-esdm-scene .s-d1 { animation-delay: 0.25s; }
    .hc-esdm-scene .s-d2 { animation-delay: 0.5s; }
    .hc-esdm-scene .s-d3 { animation-delay: 0.75s; }
    .hc-esdm-stages li::before { animation: hc-esdm-lit 10s linear infinite both; }
    .hc-esdm-stages li:nth-child(2)::before { animation-delay: 1.4s; }
    .hc-esdm-stages li:nth-child(3)::before { animation-delay: 2.8s; }
    .hc-esdm-stages li:nth-child(4)::before { animation-delay: 4.2s; }
    .hc-esdm-stages li:nth-child(5)::before { animation-delay: 5.6s; }
    .hc-esdm-stages li:nth-child(6)::before { animation-delay: 7s; }
    .hc-esdm-stages li:nth-child(7)::before { animation-delay: 8.4s; }
    .hc-esdm-road li::after { animation: hc-esdm-step 9s ease-in-out infinite both; }
    .hc-esdm-road li:nth-child(2)::after { animation-delay: 1.5s; }
    .hc-esdm-road li:nth-child(3)::after { animation-delay: 3s; }
    .hc-esdm-road li:nth-child(4)::after { animation-delay: 4.5s; }
    .hc-esdm-road li:nth-child(5)::after { animation-delay: 6s; }
    .hc-esdm-road li:nth-child(6)::after { animation-delay: 7.5s; }
    @keyframes hc-esdm-tangle { 0%, 20% { opacity: 0.9; } 45%, 92% { opacity: 0.2; } 100% { opacity: 0.9; } }
    @keyframes hc-esdm-draw-dep { 0%, 6% { stroke-dashoffset: 1; opacity: 1; } 24%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-esdm-flow { 0%, 24% { opacity: 0; stroke-dashoffset: 0; } 30% { opacity: 1; } 92% { opacity: 1; stroke-dashoffset: -180; } 100% { opacity: 0; stroke-dashoffset: -200; } }
    @keyframes hc-esdm-show-flow { 0%, 24% { opacity: 0; } 30%, 92% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hc-esdm-mod { 0%, 34% { opacity: 0; transform: scale(0.6); } 44%, 92% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.6); } }
    @keyframes hc-esdm-draw-api { 0%, 48% { stroke-dashoffset: 1; } 60%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
    @keyframes hc-esdm-node { 0%, 52% { opacity: 0; } 60%, 92% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hc-esdm-cloud { 0%, 58% { opacity: 0.2; } 68%, 92% { opacity: 1; } 100% { opacity: 0.2; } }
    @keyframes hc-esdm-bar { 0%, 70% { transform: scaleY(0.1); } 84%, 92% { transform: scaleY(1); } 100% { transform: scaleY(0.1); } }
    @keyframes hc-esdm-lit { 0% { opacity: 0; } 3% { opacity: 1; } 13% { opacity: 1; } 18% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes hc-esdm-step { 0% { opacity: 0; } 5% { opacity: 1; } 18% { opacity: 1; } 25% { opacity: 0; } 100% { opacity: 0; } }
  }
</style>

<p class="hc-esdm-subtitle">A long-form editorial on the business and engineering of modernization</p>

<p>In an enterprise, the most important software is often the software customers never see. Core systems sit behind transactions, employee workflows, pricing decisions, reporting processes, customer records, inventory, compliance controls, and the integrations that allow one part of the organization to communicate with another.</p>

<p>These systems are more than old software. They hold business rules, transaction history, workflows, pricing logic, compliance controls, data relationships, integrations and years of operational knowledge. Effective <strong>enterprise software development</strong> modernizes the technology while preserving the capabilities that still matter.</p>

<figure class="hc-esdm-visual hc-esdm-visual-dark" aria-labelledby="hc-esdm-scene-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">Animated overview</p>
      <p class="hc-esdm-title" id="hc-esdm-scene-title">From Legacy Core to Connected Platform</p>
    </div>
  </div>
  <svg class="hc-esdm-scene" viewBox="0 0 640 240" aria-hidden="true" focusable="false">
    <rect class="s-zone" x="12" y="14" width="196" height="212" rx="14" />
    <rect class="s-zone" x="392" y="14" width="236" height="212" rx="14" />
    <path class="s-tangle" d="M100 60 C 150 40, 120 120, 160 110 S 110 190, 150 200" />
    <path class="s-tangle" d="M100 120 C 60 90, 170 80, 140 150 S 70 180, 100 190" />
    <path class="s-tangle" d="M100 185 C 140 160, 180 200, 165 140 S 120 70, 150 60" />
    <rect class="s-legacy" x="30" y="40" width="70" height="32" rx="4" />
    <path class="s-legacy-line" d="M38 51h40M38 61h30" />
    <rect class="s-legacy" x="30" y="104" width="70" height="32" rx="4" />
    <path class="s-legacy-line" d="M38 115h40M38 125h30" />
    <rect class="s-legacy" x="30" y="168" width="70" height="32" rx="4" />
    <path class="s-legacy-line" d="M38 179h40M38 189h30" />
    <rect class="s-screen" x="128" y="44" width="62" height="44" rx="4" />
    <path class="s-term" d="M136 56h20M136 66h30M136 76h14" />
    <rect class="s-doc" x="140" y="150" width="28" height="36" rx="3" />
    <rect class="s-doc" x="160" y="160" width="28" height="36" rx="3" />
    <path class="s-dep" pathLength="1" d="M100 56 C 180 56, 200 120, 236 120" />
    <path class="s-dep" pathLength="1" d="M100 120 L 236 120" />
    <path class="s-dep" pathLength="1" d="M100 184 C 180 184, 200 120, 236 120" />
    <path class="s-dep" pathLength="1" d="M190 66 C 215 80, 220 110, 236 120" />
    <circle class="s-head" cx="240" cy="120" r="6" />
    <path class="s-flow" d="M252 120 L 372 120" />
    <path class="s-head" d="M372 110 L 388 120 L 372 130 Z" />
    <rect class="s-mod" x="408" y="62" width="50" height="40" rx="8" />
    <rect class="s-mod s-d1" x="468" y="62" width="50" height="40" rx="8" />
    <rect class="s-mod s-d2" x="408" y="138" width="50" height="40" rx="8" />
    <rect class="s-mod s-d3" x="468" y="138" width="50" height="40" rx="8" />
    <path class="s-api" pathLength="1" d="M458 82 H 468 M 433 102 V 138 M 493 102 V 138 M 458 158 H 468" />
    <path class="s-api" pathLength="1" d="M518 82 C 540 82, 545 62, 560 56" />
    <path class="s-api" pathLength="1" d="M518 158 C 535 158, 540 140, 556 132" />
    <circle class="s-node" cx="463" cy="82" r="3.5" />
    <circle class="s-node" cx="433" cy="120" r="3.5" />
    <circle class="s-node" cx="493" cy="120" r="3.5" />
    <circle class="s-node" cx="463" cy="158" r="3.5" />
    <path class="s-cloud" d="M566 70 a 14 14 0 0 1 2 -27 a 18 18 0 0 1 34 4 a 12 12 0 0 1 4 23 z" />
    <ellipse class="s-db" cx="578" cy="114" rx="20" ry="6" />
    <path class="s-db" d="M558 114 v 26 a 20 6 0 0 0 40 0 v -26" />
    <path class="s-shield" d="M606 128 l 10 4 v 8 c 0 7 -10 11 -10 11 s -10 -4 -10 -11 v -8 z" />
    <rect class="s-bar" x="556" y="196" width="12" height="18" rx="2" />
    <rect class="s-bar s-d1" x="574" y="182" width="12" height="32" rx="2" />
    <rect class="s-bar s-d2" x="592" y="166" width="12" height="48" rx="2" />
  </svg>
  <ol class="hc-esdm-stages" aria-label="Modernization stages">
${sceneStages}
  </ol>
  <figcaption class="hc-esdm-caption">Legacy dependencies are mapped, capabilities become modular services, APIs and data connect them to the cloud, and business outcomes improve. The bars are conceptual and do not represent measured results.</figcaption>
</figure>

<details class="hc-esdm-toc" open>
  <summary>In this article</summary>
  <ol>
${toc}
  </ol>
</details>

<p class="hc-esdm-eyebrow">01 | The Case for Change</p>
<h2 id="case-for-change">Your Core System Is More Than Software. It Is Institutional Memory.</h2>

<p>Many core systems have been operating for years. They may have been extended rather than redesigned, connected to newer applications through additional interfaces, or adapted whenever the business entered a new market or introduced a new process. Over time, the technology becomes more than code. It becomes a record of how the organization learned to operate.</p>

<p class="hc-esdm-quote">The modernization challenge is not simply replacing old technology. It is changing the technology without losing the business knowledge inside it.</p>

<p>That distinction matters. A core system can be technically dated and still contain capabilities the business cannot afford to lose. Conversely, a system can be heavily customized, difficult to maintain, or surrounded by fragile integrations that make even a small change expensive. Modernization therefore begins with understanding, not with a predetermined technology choice.</p>

<p>Microsoft describes application modernization as a continuous lifecycle involving assessment, planning, execution and maintenance. AWS similarly emphasizes understanding the application portfolio, selecting modernization pathways deliberately, and establishing a foundation for modernization at scale. The practical principle is straightforward: modernization is a program of change, not a single migration event.</p>

<h2 id="anatomy">Anatomy of a Core System</h2>

<p>The application is only one layer. APIs, integrations, data, infrastructure, security and user experiences all influence whether modernization creates real freedom to change, so legacy system modernization has to consider the whole estate.</p>

<figure class="hc-esdm-visual" aria-labelledby="hc-esdm-anatomy-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">The whole estate</p>
      <p class="hc-esdm-title" id="hc-esdm-anatomy-title">Five Layers Modernization Must Consider</p>
    </div>
  </div>
  <div class="hc-esdm-anatomy">
    <ol class="hc-esdm-layers">
      ${layer(icon.user, 'Customer &amp; employee experience')}
      ${layer(icon.app, 'Applications &amp; business logic')}
      ${layer(icon.plug, 'APIs &bull; integrations &bull; workflows', ' hc-esdm-layer-mid')}
      ${layer(icon.data, 'Data &bull; reporting &bull; analytics')}
      ${layer(icon.cloud, 'Infrastructure &bull; cloud &bull; security')}
    </ol>
    <p class="hc-esdm-callout"><span>Look between the layers</span>Dependencies often reveal where the real modernization work is.</p>
  </div>
</figure>

<p class="hc-esdm-eyebrow">02 | Look Beneath the Application</p>
<h2 id="map">Modernization Starts With a Map</h2>

<p>Consider an order-management application. Replacing the application may appear straightforward until the surrounding environment is examined. The application may exchange data with a warehouse platform, a finance system, a customer portal, identity services, analytics pipelines and third-party partners.</p>

<p>Its database may feed operational reports. Its business rules may be embedded in scheduled jobs. Its failures may trigger manual processes that are not documented anywhere.</p>

<figure class="hc-esdm-visual" aria-labelledby="hc-esdm-map-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">Dependency map</p>
      <p class="hc-esdm-title" id="hc-esdm-map-title">What Surrounds a Single Core Application</p>
    </div>
  </div>
  <div class="hc-esdm-map">
    <div class="hc-esdm-hub">Order-management application<small>The visible part of the system</small></div>
    <ul class="hc-esdm-deps">
      <li>Warehouse platform</li><li>Finance system</li><li>Customer portal</li><li>Identity services</li><li>Analytics pipelines</li><li>Third-party partners</li><li>Database &amp; reports</li><li>Scheduled jobs</li><li class="hc-esdm-dep-hidden">Undocumented manual processes</li>
    </ul>
  </div>
  <figcaption class="hc-esdm-caption">An illustrative example. The amber item marks the kind of dependency that is easy to miss.</figcaption>
</figure>

<p>This is where modernization becomes an architectural exercise. The organization needs to understand dependencies, data flows, integration patterns, security requirements, operational constraints and the business importance of each workload.</p>

<div class="hc-esdm-takeaway">
  <strong>Key idea</strong>
  <p>A modern application inside an outdated ecosystem can still behave like a legacy system.</p>
</div>

<h2 id="preserve">Preserve What Holds the Business Together</h2>

<p>A common mistake is to treat modernization as a clean break with the past. In reality, many of the most valuable parts of a legacy environment are not the technologies themselves. They are the capabilities, rules, records and operating knowledge accumulated around them.</p>

<figure class="hc-esdm-visual" aria-labelledby="hc-esdm-split-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">Modernization balance</p>
      <p class="hc-esdm-title" id="hc-esdm-split-title">Preserve Value. Remove Constraints.</p>
    </div>
  </div>
  <div class="hc-esdm-split">
    <div class="hc-esdm-side hc-esdm-side-keep">
      <p class="hc-esdm-label">What should stay</p>
      <ul class="hc-esdm-split-list">
        ${keep('Business rules')}
        ${keep('Customer &amp; transaction history')}
        ${keep('Proven workflows')}
        ${keep('Valuable integrations')}
        ${keep('Differentiating capabilities')}
      </ul>
    </div>
    <div class="hc-esdm-side hc-esdm-side-change">
      <p class="hc-esdm-label">What should change</p>
      <ul class="hc-esdm-split-list">
        ${drop('Unsupported platforms')}
        ${drop('Brittle dependencies')}
        ${drop('Duplicated data')}
        ${drop('Manual handoffs')}
        ${drop('Difficult deployment processes')}
        ${drop('Architecture that blocks scalability')}
      </ul>
    </div>
  </div>
</figure>

<p>Modernization can preserve a stable core while changing the layers around it. It can introduce APIs around an existing capability, move a workload to a managed platform, separate tightly coupled components, improve data access, or rebuild only the part whose architecture genuinely prevents future change.</p>

<p class="hc-esdm-quote">Modernization does not always mean starting from scratch. Existing business capabilities can be carried forward into newer platforms, technologies and architecture patterns while changing the parts of the system that limit future growth.</p>

<p class="hc-esdm-eyebrow">03 | Choose the Route</p>
<h2 id="route">Not Every System Needs the Same Future</h2>

<p>Once the estate is understood, the next decision is the modernization pathway. Rehosting, replatforming, refactoring, rebuilding and retiring are different tools for different circumstances.</p>

<p>The right choice depends on what the organization is trying to achieve, how critical the workload is, how tightly it is connected to other systems, and how much change the business can realistically absorb. A system that is stable but difficult to operate may need a different path from one whose architecture actively prevents new capabilities from being introduced.</p>

<figure class="hc-esdm-visual" aria-labelledby="hc-esdm-tree-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">Decision tree</p>
      <p class="hc-esdm-title" id="hc-esdm-tree-title">Five Modernization Pathways</p>
    </div>
  </div>
  <p class="hc-esdm-root">Assess the workload</p>
  <ol class="hc-esdm-routes">
    ${route('Rehost', 'Move with limited application change when the immediate goal is an infrastructure or platform transition.')}
    ${route('Replatform', 'Change the underlying platform while keeping most application behavior intact.')}
    ${route('Refactor', 'Change internal architecture to improve maintainability, scalability, deployment or resilience.')}
    ${route('Rebuild', 'Implement the capability again when the existing design fundamentally limits the future state.')}
    ${route('Retire', 'Remove duplicated, obsolete or low-value workloads and reduce unnecessary complexity.')}
  </ol>
  <figcaption class="hc-esdm-caption">No single pathway is always right. Each workload gets the level of change it actually needs.</figcaption>
</figure>

<p>The goal is not to modernize every application in the same way. It is to choose the right level of change for the right workload, preserving what still creates value while removing the constraints that prevent the business from moving forward. Many of these routes depend on a sound <a href="/en/solutions/cloud-migration">cloud migration</a> and <a href="/en/solutions/custom-software-development">custom software development</a> capability.</p>

<h2 id="program">A Modernization Program Should Learn as It Moves</h2>

<p>Enterprise modernization becomes difficult when the program is framed as one enormous rewrite. A portfolio approach creates room for learning: assess workloads, identify priorities, establish standards, modernize in manageable waves, and use lessons from early work to improve later waves. AWS guidance recommends beginning with one or two applications and using that experience to establish a foundation for broader modernization.</p>

<figure class="hc-esdm-visual" aria-labelledby="hc-esdm-road-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">Modernization roadmap</p>
      <p class="hc-esdm-title" id="hc-esdm-road-title">Modernize in Waves, Not One Rewrite</p>
    </div>
  </div>
  <ol class="hc-esdm-road">
    <li><strong>Discover</strong><span>Understand</span></li>
    <li><strong>Prioritize</strong><span>Target</span></li>
    <li><strong>Architect</strong><span>Design</span></li>
    <li><strong>Modernize</strong><span>Change</span></li>
    <li><strong>Connect</strong><span>Integrate</span></li>
    <li><strong>Scale</strong><span>Repeat</span></li>
  </ol>
</figure>

<p>The sequence matters because modernization creates organizational change as well as technical change. Teams may need new deployment practices, ownership models, observability standards, security controls and ways of validating changes.</p>

<p class="hc-esdm-eyebrow">04 | The Business Test</p>
<h2 id="business-test">If Modernization Is Working, What Should the Business Notice?</h2>

<p class="hc-esdm-quote">The technology should become easier to change, and the business should feel the difference.</p>

<p>The value of modernization should not be measured only by whether a workload moved to the cloud or whether a new architecture diagram was approved. The more useful question is what changed for the people and processes that depend on the technology.</p>

<figure class="hc-esdm-visual" aria-labelledby="hc-esdm-outcome-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">Business outcomes</p>
      <p class="hc-esdm-title" id="hc-esdm-outcome-title">What the Business Should Notice</p>
    </div>
  </div>
  <ul class="hc-esdm-grid hc-esdm-cols-2">
    ${outcome(icon.bolt, 'Faster change', 'Improvements no longer navigate the same architectural bottlenecks. Releases become more predictable.')}
    ${outcome(icon.flow, 'Less operational friction', 'Fewer brittle integrations, manual workarounds, duplicated processes and maintenance effort.', ' hc-esdm-icon-navy')}
    ${outcome(icon.smile, 'Better experiences', 'Applications respond more reliably and support new workflows more easily.')}
    ${outcome(icon.chart, 'Stronger data foundation', 'Cleaner integration and accessible data improve reporting and prepare for automation and AI.', ' hc-esdm-icon-green')}
  </ul>
</figure>

<p>These outcomes also need measures. Depending on the workload, organizations may track:</p>

<ul class="hc-esdm-chips">
  <li>Deployment frequency</li><li>Release lead time</li><li>Incident rates</li><li>Recovery time</li><li>Infrastructure cost</li><li>Manual processing effort</li><li>Application performance</li><li>Data quality</li><li>Customer-facing service measures</li>
</ul>

<p>The specific metric matters less than establishing a baseline and checking whether modernization is actually changing it. A connected <a href="/en/solutions/data-engineering-solutions">data engineering</a> and <a href="/en/solutions/business-intelligence">business intelligence</a> foundation makes that measurement far easier.</p>

<p>Modernization is ultimately an investment in organizational adaptability. Technology becomes more valuable when it gives teams room to respond to new requirements instead of forcing every new requirement through yesterday&rsquo;s constraints.</p>

<p class="hc-esdm-eyebrow">05 | Where HyperCode Fits</p>
<h2 id="hypercode">Where HyperCode Fits</h2>

<p>HyperCode connects custom applications, cloud and DevOps, data and business intelligence, automation, and digital transformation to the practical work of modernizing enterprise systems. Enterprise application modernization works best when software engineering is connected to data, cloud, integrations, automation, security and business operations.</p>

<ul class="hc-esdm-chips">
  <li>Custom Applications</li><li>Cloud &amp; DevOps</li><li>Data &amp; Business Intelligence</li><li>Automation</li><li>Digital Transformation</li>
</ul>

<p class="hc-esdm-eyebrow">06 | HyperCode Viewpoint</p>
<h2 id="viewpoint">Build the Foundation. Then Build What Comes Next.</h2>

<p>Enterprise software development is ultimately about creating systems that can keep adapting. Modernization provides the opportunity to make that adaptability part of the technology foundation rather than something the business has to fight for every time its needs change.</p>

<p>At HyperCode, the work can move from understanding the current environment and defining the right architecture to engineering, connecting, automating and scaling the resulting systems. The goal is not modernization for its own sake. It is technology that supports the next stage of the business.</p>

<figure class="hc-esdm-visual hc-esdm-visual-dark" aria-labelledby="hc-esdm-delivery-title">
  <div class="hc-esdm-head">
    <div>
      <p class="hc-esdm-kicker">HyperCode modernization path</p>
      <p class="hc-esdm-title" id="hc-esdm-delivery-title">From Today&rsquo;s Estate to What Comes Next</p>
    </div>
    ${logo}
  </div>
  <ol class="hc-esdm-delivery">
    <li><strong>Discover</strong><p>Understand the current environment</p></li>
    <li><strong>Architect</strong><p>Design the right target architecture</p></li>
    <li><strong>Engineer</strong><p>Build and modernize the software</p></li>
    <li><strong>Connect</strong><p>Integrate applications, data and cloud</p></li>
    <li><strong>Automate</strong><p>Improve workflows and operations</p></li>
    <li><strong>Scale</strong><p>Extend what works across the estate</p></li>
  </ol>
</figure>

<p class="hc-esdm-quote">Modernization is successful when technology stops being the constraint on the next business idea.</p>

<p>The future of enterprise software development will not be defined only by newer technologies. It will be defined by how effectively organizations use engineering to connect those technologies to real business needs, with security, governance, observability and human judgment built into the lifecycle.</p>

<p>Explore the services behind this approach: <a href="/en/solutions/custom-software-development">custom software development</a>, <a href="/en/solutions/cloud-migration">cloud migration</a>, <a href="/en/solutions/data-engineering-solutions">data engineering</a>, <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a> and <a href="/en/solutions/digital-transformation-consulting">digital transformation consulting</a>. For the build side of the journey, read <a href="/en/insights/lifecycle-of-custom-software-design-and-development">The Lifecycle of Custom Software Design and Development</a>.</p>

<div class="hc-esdm-final">
  <p class="hc-esdm-final-main">Old systems carry the story. Modern engineering helps write what comes next.</p>
  <p class="hc-esdm-final-sub">Preserve the business knowledge that matters, remove the constraints that do not, and build a foundation ready for the next business idea.</p>
  <ul class="hc-esdm-motto"><li>WE SOLVE.</li><li>WE BUILD.</li><li>YOU GROW.</li></ul>
  <div class="hc-esdm-btns">
    <a class="hc-esdm-btn" href="/en/consultation">Schedule Consultation</a>
    <a class="hc-esdm-btn hc-esdm-btn-ghost" href="/en/solutions/custom-software-development">Explore Custom Software</a>
  </div>
</div>
`;
