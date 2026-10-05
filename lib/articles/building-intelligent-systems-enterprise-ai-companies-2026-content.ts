const icon = {
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  data: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/><circle cx="12" cy="12" r="2.5"/></svg>',
  flow: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  plug: '<svg viewBox="0 0 24 24"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  code: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
  check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
};

const logo = '<img class="hc-isys-logo" src="/hypercodeit.logo.webp" width="40" height="40" alt="HyperCode" loading="lazy" decoding="async" />';

const img = (name: string, alt: string, caption: string) => `<figure class="hc-isys-photo">
  <img src="/images/articles/building-intelligent-systems-enterprise-ai-companies-2026-${name}.webp" width="1200" height="675" alt="${alt}" loading="lazy" decoding="async" />
  <figcaption>${caption}</figcaption>
</figure>`;

const toc = [
  ['the-shift', 'Enterprise AI Is Becoming a Systems Discipline'],
  ['architecture', 'What Makes an Enterprise AI System Intelligent?'],
  ['business-value', 'Where Enterprise AI Companies Create Business Value'],
  ['build-buy-partner', 'Build, Buy, or Partner?'],
  ['pilot-to-production', 'From AI Pilot to Production System'],
  ['hypercode', 'Building What the Enterprise Needs Next'],
]
  .map(([id, label]) => `      <li><a class="hc-isys-toc-link" href="#${id}">${label}</a></li>`)
  .join('\n');

const lifecycle = ['Discover', 'Design', 'Build', 'Integrate', 'Govern', 'Scale']
  .map((s, i) => `        <li class="hc-isys-stage"><span>0${i + 1}</span>${s}</li>`)
  .join('\n');

const check = (text: string) => `<li class="hc-isys-check"><span class="hc-isys-icon hc-isys-icon-green" aria-hidden="true">${icon.check}</span><p>${text}</p></li>`;

const capability = (ic: string, title: string, text: string, tone = '') => `<li class="hc-isys-cap"><span class="hc-isys-icon${tone}" aria-hidden="true">${ic}</span><div><strong>${title}</strong><p>${text}</p></div></li>`;

const lens = (title: string, text: string) => `<li class="hc-isys-lens"><strong>${title}</strong><p>${text}</p></li>`;

export const intelligentSystemsContentEn = `
<style>
  .hc-isys-visual { margin: 2.25rem 0; padding: 1.25rem; border-radius: 1.25rem; border: 1px solid #dbe5f5; background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%); max-width: 100%; overflow: hidden; }
  .hc-isys-visual-dark { background: radial-gradient(circle at 50% 0%, #123a9c 0%, #0A1F6B 55%, #06123F 100%); border-color: #0A1F6B; color: #ffffff; }
  .hc-isys-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 0 0 1rem; }
  .hc-isys-kicker { margin: 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #145BFF; }
  .hc-isys-title { margin: 0.2rem 0 0; font-size: 1.05rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-isys-visual-dark .hc-isys-kicker { color: #25B5FF; }
  .hc-isys-visual-dark .hc-isys-title { color: #ffffff; }
  .hc-isys-logo { flex-shrink: 0; width: 40px; height: 40px; border-radius: 0.6rem; background: #ffffff; padding: 3px; box-shadow: 0 1px 3px rgba(10, 31, 107, 0.15); object-fit: contain; }
  ul.hc-isys-grid, ol.hc-isys-stages, ol.hc-isys-stack, ul.hc-isys-chips, ul.hc-isys-list, ol.hc-isys-delivery, ul.hc-isys-meters { list-style: none; margin: 0; padding: 0; }
  .hc-isys-grid { display: grid; gap: 0.75rem; grid-template-columns: 1fr; }
  .hc-isys-grid > li { margin: 0; min-width: 0; overflow-wrap: break-word; }
  .hc-isys-icon { flex-shrink: 0; width: 2.1rem; height: 2.1rem; border-radius: 0.65rem; display: grid; place-items: center; color: #ffffff; background: linear-gradient(135deg, #145BFF, #25B5FF); }
  .hc-isys-icon svg { width: 1.05rem; height: 1.05rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hc-isys-icon-green { background: linear-gradient(135deg, #2f9a00, #48B900); }
  .hc-isys-icon-navy { background: linear-gradient(135deg, #0A1F6B, #145BFF); }
  .hc-isys-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .hc-isys-chips li { margin: 0; padding: 0.25rem 0.6rem; border-radius: 999px; background: #eef4ff; color: #1e3a8a; font-size: 0.76rem; line-height: 1.3; font-weight: 700; }
  .hc-isys-visual-dark .hc-isys-chips li { background: rgba(255, 255, 255, 0.12); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.18); }
  .hc-isys-caption { margin: 0.9rem 0 0; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }
  .hc-isys-visual-dark .hc-isys-caption { color: #bcd3ff; }
  .hc-isys-label { margin: 0 0 0.5rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #0A1F6B; }
  .hc-isys-visual-dark .hc-isys-label { color: #bfe3ff; }
  .hc-isys-takeaway { margin: 1.75rem 0; padding: 0.95rem 1.15rem; border-radius: 0.9rem; border-left: 4px solid #48B900; background: linear-gradient(90deg, #eef4ff 0%, #f7faff 100%); }
  .hc-isys-takeaway strong { display: block; margin-bottom: 0.2rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #2f7a00; }
  .hc-isys-takeaway p { margin: 0; font-size: 0.98rem; line-height: 1.5; font-weight: 700; color: #0A1F6B; }
  p.hc-isys-quote { margin: 1.75rem 0; padding: 1.1rem 1.25rem; border-radius: 1rem; background: #0A1F6B; color: #ffffff; font-size: 1.05rem; line-height: 1.45; font-weight: 800; }
  p.hc-isys-quote::before { content: "\\201C"; display: block; font-size: 2rem; line-height: 1; color: #25B5FF; }
  p.hc-isys-subtitle { margin: 0 0 0.4rem; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-isys-eyebrow { margin: 3rem 0 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #145BFF; }
  p.hc-isys-eyebrow + h2 { margin-top: 0.35rem; }
  h2[id] { scroll-margin-top: 7rem; }
  h3.hc-isys-h3 { margin: 1.5rem 0 0.6rem; font-size: 1.05rem; font-weight: 800; color: #0A1F6B; }

  .hc-isys-photo { margin: 2rem 0; }
  .hc-isys-photo img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 1rem; border: 1px solid #e2e8f0; background: #f1f5f9; }
  .hc-isys-photo figcaption { margin-top: 0.55rem; font-size: 0.8rem; line-height: 1.45; font-weight: 600; color: #64748b; }

  .hc-isys-toc { margin: 2rem 0; border-radius: 1rem; border: 1px solid #dbe5f5; background: #f7faff; }
  .hc-isys-toc summary { cursor: pointer; padding: 0.95rem 1.2rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #0A1F6B; }
  .hc-isys-toc summary:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; border-radius: 1rem; }
  .hc-isys-toc ol { display: grid; gap: 0.1rem 1.25rem; margin: 0; padding: 0 1.2rem 1rem; list-style: none; }
  .hc-isys-toc li { margin: 0; }
  .hc-isys-toc .hc-isys-toc-link { display: block; padding: 0.35rem 0.4rem; border-radius: 0.5rem; font-size: 0.9rem; line-height: 1.35; font-weight: 700; color: #0A1F6B; text-decoration: none; }
  .hc-isys-toc .hc-isys-toc-link:hover { background: #eaf1ff; color: #145BFF; }
  .hc-isys-toc .hc-isys-toc-link:focus-visible { outline: 2px solid #145BFF; outline-offset: 2px; }

  /* Lifecycle ring (animated) */
  .hc-isys-loop-wrap { display: grid; gap: 1.25rem; align-items: center; }
  .hc-isys-ring { position: relative; width: 100%; max-width: 21rem; aspect-ratio: 1 / 1; margin: 0 auto; }
  .hc-isys-ring svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hc-isys-ring .hc-isys-track { fill: none; stroke: rgba(37, 181, 255, 0.25); stroke-width: 0.6; }
  .hc-isys-ring .hc-isys-flowline { fill: none; stroke: #25B5FF; stroke-width: 0.9; stroke-linecap: round; stroke-dasharray: 1.2 4; opacity: 0.85; }
  .hc-isys-orbit { position: absolute; inset: 0; display: none; }
  .hc-isys-orbit::before { content: ""; position: absolute; left: 50%; top: 12%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 999px; background: #8fe1ff; box-shadow: 0 0 0 4px rgba(37, 181, 255, 0.25), 0 0 16px #25B5FF; }
  .hc-isys-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 36%; aspect-ratio: 1 / 1; border-radius: 999px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; text-align: center; background: radial-gradient(circle at 50% 35%, #1f6bff 0%, #0f3fb8 60%, #0A1F6B 100%); border: 1px solid rgba(37, 181, 255, 0.7); box-shadow: 0 0 0 6px rgba(37, 181, 255, 0.1), 0 10px 30px rgba(6, 18, 63, 0.45); }
  .hc-isys-core .hc-isys-logo { width: 30px; height: 30px; padding: 2px; border-radius: 0.45rem; }
  .hc-isys-core p { margin: 0; font-size: 0.72rem; line-height: 1.15; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #ffffff; }
  .hc-isys-stages li.hc-isys-stage { position: absolute; z-index: 1; width: 6rem; margin: 0; padding: 0.4rem 0.3rem; border-radius: 0.7rem; transform: translate(-50%, -50%); text-align: center; font-size: 0.72rem; line-height: 1.15; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); }
  .hc-isys-stages li.hc-isys-stage::before { content: ""; position: absolute; inset: -1px; z-index: -1; border-radius: inherit; background: linear-gradient(135deg, #145BFF, #25B5FF); box-shadow: 0 0 18px rgba(37, 181, 255, 0.55); opacity: 0; }
  .hc-isys-stages li.hc-isys-stage:last-child::before { background: linear-gradient(135deg, #2f9a00, #48B900); box-shadow: 0 0 18px rgba(72, 185, 0, 0.55); }
  .hc-isys-stage span { display: block; font-size: 0.72rem; letter-spacing: 0.1em; color: #8fd3ff; }
  .hc-isys-stage:nth-child(1) { left: 50%; top: 12%; }
  .hc-isys-stage:nth-child(2) { left: 82.9%; top: 31%; }
  .hc-isys-stage:nth-child(3) { left: 82.9%; top: 69%; }
  .hc-isys-stage:nth-child(4) { left: 50%; top: 88%; }
  .hc-isys-stage:nth-child(5) { left: 17.1%; top: 69%; }
  .hc-isys-stage:nth-child(6) { left: 17.1%; top: 31%; }
  .hc-isys-meters { display: grid; gap: 0.7rem; }
  .hc-isys-meters li { margin: 0; font-size: 0.8rem; font-weight: 800; color: #e2e8f0; }
  .hc-isys-meter { display: block; margin-top: 0.35rem; height: 0.5rem; border-radius: 999px; background: rgba(255, 255, 255, 0.12); overflow: hidden; }
  .hc-isys-meter i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #145BFF, #25B5FF 60%, #48B900); transform-origin: left; transform: scaleX(0.85); }

  /* Model vs system */
  .hc-isys-compare { display: grid; gap: 0.75rem; }
  .hc-isys-side { padding: 1rem; border-radius: 1rem; background: #ffffff; border: 1px solid #dbe5f5; }
  .hc-isys-side-system { background: linear-gradient(135deg, #0A1F6B, #145BFF); border-color: transparent; }
  .hc-isys-side-system .hc-isys-label { color: #bfe3ff; }
  .hc-isys-list { display: grid; gap: 0.4rem; }
  .hc-isys-list li { margin: 0; display: flex; gap: 0.45rem; align-items: baseline; font-size: 0.88rem; line-height: 1.4; font-weight: 700; color: #0A1F6B; }
  .hc-isys-list li::before { content: ""; flex-shrink: 0; width: 0.5rem; height: 0.5rem; border-radius: 999px; background: #145BFF; transform: translateY(-1px); }
  .hc-isys-side-system .hc-isys-list li { color: #ffffff; }
  .hc-isys-side-system .hc-isys-list li::before { background: #48B900; }

  /* Architecture stack (animated signal) */
  .hc-isys-stack { position: relative; display: grid; gap: 0.6rem; }
  .hc-isys-stack li { position: relative; z-index: 0; margin: 0; display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.85rem 0.95rem; border-radius: 0.95rem; background: #ffffff; border: 1px solid #cddcf5; overflow: hidden; }
  .hc-isys-stack li::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(20, 91, 255, 0.14), rgba(37, 181, 255, 0.2)); opacity: 0; }
  .hc-isys-stack li.hc-isys-gov { background: #f3fbec; border: 2px dashed #48B900; }
  .hc-isys-stack li.hc-isys-gov::after { background: linear-gradient(90deg, rgba(72, 185, 0, 0.14), rgba(72, 185, 0, 0.24)); }
  .hc-isys-stack strong { display: block; font-size: 0.9rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-isys-stack strong span { display: inline-block; margin-right: 0.35rem; font-size: 0.72rem; letter-spacing: 0.1em; color: #145BFF; }
  .hc-isys-gov strong span { color: #2f7a00; }
  .hc-isys-stack p { margin: 0.2rem 0 0; font-size: 0.82rem; line-height: 1.4; font-weight: 600; color: #475569; }

  /* Capability cards */
  .hc-isys-cap { display: flex; gap: 0.7rem; align-items: flex-start; height: 100%; padding: 0.9rem; border-radius: 1rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-isys-cap strong { display: block; font-size: 0.86rem; line-height: 1.3; font-weight: 800; color: #0A1F6B; }
  .hc-isys-cap p { margin: 0.2rem 0 0; font-size: 0.8rem; line-height: 1.4; font-weight: 600; color: #475569; }

  /* Build / buy / partner */
  .hc-isys-choice { height: 100%; padding: 1rem; border-radius: 1rem; background: #ffffff; border: 1px solid #dbe5f5; }
  .hc-isys-choice-partner { border: 2px solid #145BFF; background: #f5f9ff; }
  .hc-isys-choice-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.55rem; font-size: 0.92rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #0A1F6B; }
  .hc-isys-choice p { margin: 0 0 0.6rem; font-size: 0.84rem; line-height: 1.45; font-weight: 600; color: #475569; }

  /* Evaluation lens */
  .hc-isys-lens { padding: 0.85rem 0.95rem; border-radius: 0.9rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); }
  .hc-isys-lens strong { display: block; font-size: 0.82rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #25B5FF; }
  .hc-isys-lens p { margin: 0.3rem 0 0; font-size: 0.86rem; line-height: 1.4; font-weight: 600; color: #e2e8f0; }

  /* Check cards */
  .hc-isys-check { display: flex; gap: 0.7rem; align-items: flex-start; padding: 0.85rem; border-radius: 0.9rem; background: #ffffff; border: 1px solid #e2e8f0; }
  .hc-isys-check .hc-isys-icon { width: 1.8rem; height: 1.8rem; border-radius: 999px; }
  .hc-isys-check .hc-isys-icon svg { width: 0.95rem; height: 0.95rem; stroke-width: 3; }
  .hc-isys-check p { margin: 0.15rem 0 0; font-size: 0.9rem; line-height: 1.4; font-weight: 700; color: #0A1F6B; }

  /* Delivery path */
  .hc-isys-delivery { display: grid; gap: 0.6rem; counter-reset: hc-isys-del; }
  .hc-isys-delivery li { position: relative; margin: 0; padding: 0.85rem 0.9rem; border-radius: 0.95rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); }
  .hc-isys-delivery strong { display: flex; align-items: center; gap: 0.5rem; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #ffffff; }
  .hc-isys-delivery strong::before { counter-increment: hc-isys-del; content: counter(hc-isys-del); flex-shrink: 0; width: 1.6rem; height: 1.6rem; border-radius: 999px; display: grid; place-items: center; font-size: 0.72rem; letter-spacing: 0; color: #06123F; background: #25B5FF; }
  .hc-isys-delivery li:last-child strong::before { background: #48B900; color: #ffffff; }
  .hc-isys-delivery p { margin: 0.35rem 0 0; font-size: 0.84rem; line-height: 1.4; font-weight: 600; color: #cfe0ff; }

  /* Final */
  .hc-isys-final { margin: 1.5rem 0 0; padding: 1.75rem 1.25rem; border-radius: 1.25rem; text-align: center; color: #ffffff; background: radial-gradient(circle at 50% 0%, #1f5fe0 0%, #0A1F6B 60%, #06123F 100%); }
  .hc-isys-final-main { margin: 0; font-size: 1.2rem; line-height: 1.4; font-weight: 800; color: #ffffff; }
  .hc-isys-final-sub { margin: 0.6rem 0 0; font-size: 0.92rem; line-height: 1.5; font-weight: 600; color: #cfe0ff; }
  ul.hc-isys-motto { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.35rem 1rem; margin: 1.1rem 0 0; padding: 0; list-style: none; }
  .hc-isys-motto li { margin: 0; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.16em; color: #25B5FF; }
  .hc-isys-motto li:last-child { color: #7ddc3c; }
  .hc-isys-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1.25rem; }
  .hc-isys-final .hc-isys-btn { display: inline-block; padding: 0.7rem 1.3rem; border-radius: 999px; background: #ffffff; color: #0A1F6B; font-size: 0.88rem; font-weight: 800; text-decoration: none; }
  .hc-isys-final .hc-isys-btn-ghost { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.5); }
  .hc-isys-final .hc-isys-btn:hover { background: #eaf1ff; color: #0A1F6B; }
  .hc-isys-final .hc-isys-btn:focus-visible { outline: 2px solid #25B5FF; outline-offset: 3px; }

  @media (min-width: 640px) {
    .hc-isys-visual { padding: 1.5rem; }
    .hc-isys-cols-2, .hc-isys-toc ol, .hc-isys-compare { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hc-isys-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (min-width: 768px) {
    .hc-isys-loop-wrap { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
    .hc-isys-delivery { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hc-isys-orbit { display: block; animation: hc-isys-spin 9s linear infinite; }
    .hc-isys-ring .hc-isys-flowline { animation: hc-isys-dash 2.4s linear infinite; }
    .hc-isys-stages li.hc-isys-stage::before { animation: hc-isys-lit 9s linear infinite; }
    .hc-isys-stage:nth-child(2)::before { animation-delay: 1.5s; }
    .hc-isys-stage:nth-child(3)::before { animation-delay: 3s; }
    .hc-isys-stage:nth-child(4)::before { animation-delay: 4.5s; }
    .hc-isys-stage:nth-child(5)::before { animation-delay: 6s; }
    .hc-isys-stage:nth-child(6)::before { animation-delay: 7.5s; }
    .hc-isys-meter i { animation: hc-isys-fill 9s ease-in-out infinite; }
    .hc-isys-meters li:nth-child(2) .hc-isys-meter i { animation-delay: 0.4s; }
    .hc-isys-meters li:nth-child(3) .hc-isys-meter i { animation-delay: 0.8s; }
    .hc-isys-stack li::after { animation: hc-isys-step 7.5s ease-in-out infinite; }
    .hc-isys-stack li:nth-child(2)::after { animation-delay: 1.5s; }
    .hc-isys-stack li:nth-child(3)::after { animation-delay: 3s; }
    .hc-isys-stack li:nth-child(4)::after { animation-delay: 4.5s; }
    .hc-isys-stack li:nth-child(5)::after { animation-delay: 6s; }
    @keyframes hc-isys-spin { to { transform: rotate(360deg); } }
    @keyframes hc-isys-dash { to { stroke-dashoffset: -10.4; } }
    @keyframes hc-isys-lit { 0% { opacity: 0; } 3% { opacity: 1; } 15% { opacity: 1; } 22% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes hc-isys-fill { 0% { transform: scaleX(0.2); } 70% { transform: scaleX(0.9); } 90% { transform: scaleX(0.9); } 100% { transform: scaleX(0.2); } }
    @keyframes hc-isys-step { 0% { opacity: 0; } 5% { opacity: 1; } 22% { opacity: 1; } 30% { opacity: 0; } 100% { opacity: 0; } }
  }
</style>

<p class="hc-isys-subtitle">How enterprise AI companies move beyond models to build connected, intelligent systems</p>

<p>Enterprise AI companies are moving beyond models. The organizations creating measurable business value are the ones building intelligent, connected systems: AI that works with enterprise data, follows rules, fits existing technology and produces an outcome that matters to the business.</p>

<p>This guide explains what makes an enterprise AI system intelligent, where enterprise AI companies create value, how to decide whether to build, buy or partner, and what it takes to move from an AI pilot to a production system that keeps working.</p>

<figure class="hc-isys-visual hc-isys-visual-dark" aria-labelledby="hc-isys-loop-title">
  <div class="hc-isys-head">
    <div>
      <p class="hc-isys-kicker">Animated overview</p>
      <p class="hc-isys-title" id="hc-isys-loop-title">The Intelligent System Lifecycle</p>
    </div>
  </div>
  <div class="hc-isys-loop-wrap">
    <div class="hc-isys-ring">
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <circle class="hc-isys-track" cx="50" cy="50" r="38" />
        <circle class="hc-isys-flowline" cx="50" cy="50" r="38" />
      </svg>
      <div class="hc-isys-orbit" aria-hidden="true"></div>
      <div class="hc-isys-core">
        ${logo}
        <p>Intelligent<br />system</p>
      </div>
      <ol class="hc-isys-stages" aria-label="Intelligent system lifecycle stages">
${lifecycle}
      </ol>
    </div>
    <div>
      <p class="hc-isys-label">Each cycle strengthens</p>
      <ul class="hc-isys-meters">
        <li>Connection to data and workflows<span class="hc-isys-meter" aria-hidden="true"><i></i></span></li>
        <li>Trust, control and governance<span class="hc-isys-meter" aria-hidden="true"><i></i></span></li>
        <li>Ability to scale and adapt<span class="hc-isys-meter" aria-hidden="true"><i></i></span></li>
      </ul>
    </div>
  </div>
  <figcaption class="hc-isys-caption">Discover, design, build, integrate, govern and scale, then repeat as the business changes. The meters are conceptual and do not represent measured results.</figcaption>
</figure>

<details class="hc-isys-toc" open>
  <summary>In this article</summary>
  <ol>
${toc}
  </ol>
</details>

<p class="hc-isys-eyebrow">01 | The Shift</p>
<h2 id="the-shift">Enterprise AI Is Becoming a Systems Discipline</h2>

<p>The first wave of enterprise AI was largely about access: giving employees copilots, adding generative AI to applications, and proving that a model could solve a useful task. The next phase is broader. Businesses are asking how AI can become part of the operating system of the enterprise, connected to data, workflows, applications, controls and decisions.</p>

<p>That is why the phrase <strong>enterprise AI companies</strong> increasingly describes more than companies that provide an AI model. The relevant capability is the ability to turn intelligence into something an organization can operate reliably: a system that understands context, works with enterprise data, follows rules, interacts with existing technology, and produces an outcome that matters to the business.</p>

<h3 class="hc-isys-h3">From Models to Intelligent Systems</h3>

<p>A model is an important component, but it is only one layer. An enterprise system also needs data access, identity, workflow logic, application integration, observability, security, governance and a clear human role. Without those surrounding capabilities, an impressive AI demonstration can remain disconnected from day-to-day operations.</p>

<figure class="hc-isys-visual" aria-labelledby="hc-isys-compare-title">
  <div class="hc-isys-head">
    <div>
      <p class="hc-isys-kicker">Comparison</p>
      <p class="hc-isys-title" id="hc-isys-compare-title">An AI Model vs. an Intelligent System</p>
    </div>
  </div>
  <div class="hc-isys-compare">
    <div class="hc-isys-side">
      <p class="hc-isys-label">An AI model</p>
      <ul class="hc-isys-list">
        <li>Generates an answer</li>
        <li>Solves a useful task in isolation</li>
        <li>Can impress in a demonstration</li>
      </ul>
    </div>
    <div class="hc-isys-side hc-isys-side-system">
      <p class="hc-isys-label">An intelligent system</p>
      <ul class="hc-isys-list">
        <li>Knows what the answer is for</li>
        <li>Knows what it can access</li>
        <li>Knows what it is allowed to do</li>
        <li>Knows what happens next</li>
      </ul>
    </div>
  </div>
</figure>

<p>Recent enterprise research points in the same direction. IBM reported in 2026 that many technology leaders are being held accountable for AI systems they do not fully control, while teams are deploying technology faster than IT can track. McKinsey likewise describes a shift toward operating models that combine data, AI models and decision systems as an enterprise intelligence layer.</p>

<h3 class="hc-isys-h3">Why the Change Matters</h3>

<p>The practical question for leadership is no longer only &ldquo;Which AI can we use?&rdquo; It is &ldquo;What intelligent system should this business build?&rdquo; That question produces better decisions about architecture, investment, talent, governance and the role of automation. If you are still shaping that direction, our guide on <a href="/en/insights/how-to-build-an-enterprise-ai-strategy">how to build an enterprise AI strategy</a> covers the groundwork.</p>

<p class="hc-isys-quote">The enterprise AI opportunity is not simply to add intelligence to software. It is to build software and workflows that can use intelligence responsibly, repeatedly and at scale.</p>

${img('workflow', 'A HyperCode consultant maps a business workflow on a glass whiteboard with two business stakeholders, marking where AI assists and where a person reviews', 'Intelligent systems start with the real workflow: where work enters, where AI helps and where people decide.')}

<p class="hc-isys-eyebrow">02 | The Architecture</p>
<h2 id="architecture">What Makes an Enterprise AI System Intelligent?</h2>

<p>Intelligent systems are designed as connected layers rather than isolated AI features. Each layer has a different responsibility, and the value appears when they work together.</p>

<figure class="hc-isys-visual" aria-labelledby="hc-isys-stack-title">
  <div class="hc-isys-head">
    <div>
      <p class="hc-isys-kicker">Reference architecture</p>
      <p class="hc-isys-title" id="hc-isys-stack-title">The Five Layers of an Intelligent Enterprise System</p>
    </div>
    ${logo}
  </div>
  <ol class="hc-isys-stack">
    <li><span class="hc-isys-icon" aria-hidden="true">${icon.target}</span><div><strong><span>01</span>Business context</strong><p>A defined customer journey, workflow, decision or knowledge process tied to a measurable outcome</p></div></li>
    <li><span class="hc-isys-icon" aria-hidden="true">${icon.data}</span><div><strong><span>02</span>Data and knowledge</strong><p>Governed operational data, documents, policies, product information and customer records</p></div></li>
    <li><span class="hc-isys-icon hc-isys-icon-navy" aria-hidden="true">${icon.spark}</span><div><strong><span>03</span>Intelligence layer</strong><p>Models, retrieval, classification, reasoning, prediction and AI agents</p></div></li>
    <li><span class="hc-isys-icon hc-isys-icon-navy" aria-hidden="true">${icon.flow}</span><div><strong><span>04</span>Workflow and action</strong><p>Route, prepare, update, analyze, recommend, or hand a decision to a person</p></div></li>
    <li class="hc-isys-gov"><span class="hc-isys-icon hc-isys-icon-green" aria-hidden="true">${icon.shield}</span><div><strong><span>05</span>Governance and observability</strong><p>Identity, access, auditability, evaluation, monitoring, policy and ownership across every layer</p></div></li>
  </ol>
</figure>

<h3 class="hc-isys-h3">1. Business Context</h3>
<p>The system begins with a clearly defined business problem: a customer journey, operational workflow, decision or knowledge process. This keeps AI tied to a measurable outcome instead of becoming technology in search of a use case.</p>

<h3 class="hc-isys-h3">2. Data and Knowledge</h3>
<p>Enterprise AI needs access to relevant, governed information. That may include structured operational data, documents, policies, product information, customer records or specialized knowledge. The quality and context of this layer often determine how useful the system can be, which is why <a href="/en/solutions/data-engineering-solutions">data engineering</a> and <a href="/en/solutions/data-warehousing">data warehousing</a> are part of the AI conversation.</p>

<h3 class="hc-isys-h3">3. Intelligence Layer</h3>
<p>Models, retrieval, classification, reasoning, prediction and AI agents provide the intelligence. The right architecture may use one model or several, depending on the task, risk, cost and latency requirements.</p>

<h3 class="hc-isys-h3">4. Workflow and Action</h3>
<p>An intelligent system becomes operational when it can trigger the next step: route a request, prepare a response, update a record, generate an analysis, recommend an action, or hand a decision to a person.</p>

<h3 class="hc-isys-h3">5. Governance and Observability</h3>
<p>Enterprise systems need identity, access controls, auditability, evaluation, monitoring, policy enforcement and clear ownership. These are not afterthoughts; they determine whether an AI capability can be trusted in production.</p>

<p class="hc-isys-quote">A model can generate an answer. An intelligent system knows what the answer is for, what it can access, what it is allowed to do, and what happens next.</p>

<p class="hc-isys-eyebrow">03 | The Value Layer</p>
<h2 id="business-value">Where Enterprise AI Companies Create Business Value</h2>

<p>The most useful enterprise AI companies do not sell intelligence as an abstract capability. They help connect intelligence to the places where work happens. That means embedding AI into business processes, applications, data environments and decisions where it can produce a measurable difference.</p>

<p>The value often begins with something practical: reducing repetitive work, helping teams find information faster, improving the quality of decisions, or creating more responsive customer experiences. Instead of treating AI as another layer of technology, organizations can use it as part of the systems they already depend on.</p>

<p>This is where enterprise AI moves from experimentation to impact. When intelligence is connected to reliable data and real workflows, it can support people at the right moment, automate processes where appropriate, and create insights that would otherwise take significantly more time to uncover.</p>

<figure class="hc-isys-visual" aria-labelledby="hc-isys-cap-title">
  <div class="hc-isys-head">
    <div>
      <p class="hc-isys-kicker">Building blocks</p>
      <p class="hc-isys-title" id="hc-isys-cap-title">What an Intelligent Enterprise System Brings Together</p>
    </div>
  </div>
  <ul class="hc-isys-grid hc-isys-cols-2">
    ${capability(icon.target, 'Strategy', 'A defined business problem and outcome')}
    ${capability(icon.data, 'Data foundation', 'Relevant, governed information')}
    ${capability(icon.spark, 'AI models', 'The right intelligence for the task', ' hc-isys-icon-navy')}
    ${capability(icon.flow, 'Automation', 'Workflows that trigger the next step', ' hc-isys-icon-navy')}
    ${capability(icon.plug, 'Integration', 'Connection to existing applications')}
    ${capability(icon.shield, 'Governance', 'Access, auditability and control', ' hc-isys-icon-green')}
    ${capability(icon.user, 'User experience', 'A clear role for the people involved')}
    ${capability(icon.chart, 'Business value', 'Outcomes the business can measure', ' hc-isys-icon-green')}
  </ul>
</figure>

<p>Over time, these individual improvements can become part of a larger transformation. The goal is not simply to introduce AI into the enterprise, but to build systems that continuously turn data, intelligence and human expertise into better business outcomes. For practical examples, see <a href="/en/insights/top-5-ai-enterprise-software-use-cases-2026">the top AI enterprise software use cases for 2026</a>.</p>

<h3 class="hc-isys-h3">The Difference Is in the Connection</h3>

<p>A customer-service assistant becomes more valuable when it can securely retrieve relevant knowledge, understand the customer context, follow service rules, and update the appropriate system. A financial AI capability becomes more useful when it can work with governed data, explain its output, and fit into the review process.</p>

<p>This connected approach is consistent with HyperCode&rsquo;s own enterprise positioning: AI and automation sit alongside <a href="/en/solutions/business-intelligence">business intelligence</a>, data analytics, data warehousing, <a href="/en/solutions/custom-software-development">custom applications</a>, cloud and DevOps, and <a href="/en/solutions/digital-transformation-consulting">digital transformation</a> rather than being treated as isolated capabilities.</p>

<div class="hc-isys-takeaway">
  <strong>Value in practice</strong>
  <p>Decision support &bull; Intelligent automation &bull; Knowledge systems &bull; Customer experiences</p>
</div>

<p class="hc-isys-eyebrow">04 | The Enterprise Test</p>
<h2 id="build-buy-partner">Build, Buy, or Partner?</h2>

<p>Choosing an enterprise AI company should begin with the system the organization needs, not with a vendor&rsquo;s feature list. Different organizations will need different combinations of platforms, models, custom engineering, data capabilities and implementation support.</p>

<figure class="hc-isys-visual" aria-labelledby="hc-isys-choice-title">
  <div class="hc-isys-head">
    <div>
      <p class="hc-isys-kicker">Decision guide</p>
      <p class="hc-isys-title" id="hc-isys-choice-title">Three Ways to Source Enterprise AI Capability</p>
    </div>
  </div>
  <ul class="hc-isys-grid hc-isys-cols-3">
    <li class="hc-isys-choice">
      <div class="hc-isys-choice-head"><span class="hc-isys-icon hc-isys-icon-navy" aria-hidden="true">${icon.code}</span>Build</div>
      <p>When the differentiation is yours</p>
      <ul class="hc-isys-chips"><li>Proprietary data</li><li>Unique decision logic</li><li>Competitive experience</li><li>Full control</li></ul>
    </li>
    <li class="hc-isys-choice">
      <div class="hc-isys-choice-head"><span class="hc-isys-icon" aria-hidden="true">${icon.box}</span>Buy</div>
      <p>When the capability is commodity</p>
      <ul class="hc-isys-chips"><li>Standardized function</li><li>Faster implementation</li><li>Lower engineering effort</li></ul>
    </li>
    <li class="hc-isys-choice hc-isys-choice-partner">
      <div class="hc-isys-choice-head"><span class="hc-isys-icon hc-isys-icon-green" aria-hidden="true">${icon.link}</span>Partner</div>
      <p>When the challenge is integration</p>
      <ul class="hc-isys-chips"><li>Data pipelines</li><li>Workflow integration</li><li>Cloud architecture</li><li>Secure operating model</li></ul>
    </li>
  </ul>
</figure>

<h3 class="hc-isys-h3">Build When the Differentiation Is Yours</h3>
<p>A custom approach can make sense when the business process, proprietary data, decision logic or customer experience represents a meaningful competitive capability. Building also provides greater control over architecture, integration and the evolution of the system.</p>

<h3 class="hc-isys-h3">Buy When the Capability Is Commodity</h3>
<p>For standardized functions, a mature product may provide faster implementation and lower engineering effort. The important question is whether the product can meet enterprise requirements for data, security, integration, governance and change. Our guide to <a href="/en/insights/choosing-right-enterprise-ai-platform-for-scale">choosing the right enterprise AI platform for scale</a> goes deeper on that evaluation.</p>

<h3 class="hc-isys-h3">Partner When the Challenge Is Integration</h3>
<p>Many enterprise AI programs sit between these two choices. The organization may need existing AI platforms but also require custom data pipelines, applications, workflow integration, cloud architecture or a secure operating model. This is where an experienced engineering partner can close the gap between technology and production.</p>

<figure class="hc-isys-visual hc-isys-visual-dark" aria-labelledby="hc-isys-lens-title">
  <div class="hc-isys-head">
    <div>
      <p class="hc-isys-kicker">Evaluation checklist</p>
      <p class="hc-isys-title" id="hc-isys-lens-title">A Practical Evaluation Lens</p>
    </div>
  </div>
  <ul class="hc-isys-grid hc-isys-cols-2">
    ${lens('Business fit', 'Does it solve a defined operational problem?')}
    ${lens('Data fit', 'Can it work with the information the business actually needs?')}
    ${lens('Integration fit', 'Can it connect to existing systems and workflows?')}
    ${lens('Control', 'Can the organization govern access, behavior and changes?')}
    ${lens('Economics', 'Can value, operating cost and scalability be measured?')}
    ${lens('Adaptability', 'Can models, vendors or components evolve without rebuilding everything?')}
  </ul>
</figure>

<p class="hc-isys-eyebrow">05 | The Operating Model</p>
<h2 id="pilot-to-production">From AI Pilot to Production System</h2>

<p>The hardest part of enterprise AI is often not proving that a model can work. It is creating the conditions in which the system can operate repeatedly, safely and at scale.</p>

<h3 class="hc-isys-h3">Design for the Real Workflow</h3>
<p>Start with the full journey. Map where data enters, where decisions are made, where people intervene, what systems must be updated, and what evidence needs to be retained. Then place AI where it creates a meaningful improvement. <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a> is most effective when it follows this map rather than replacing it.</p>

<h3 class="hc-isys-h3">Keep Humans Where Judgment Matters</h3>
<p>Not every decision should be automated. High-impact actions may require review, escalation or explicit authorization. A strong system makes the human role clearer rather than simply trying to remove it.</p>

<h3 class="hc-isys-h3">Engineer for Change</h3>
<p>Enterprise AI will evolve quickly. Architecture should therefore preserve options: modular services, portable workloads, replaceable models where practical, strong interfaces and clear ownership. IBM&rsquo;s 2026 research has highlighted workload portability and adaptability as important factors in scaling AI, and a sound <a href="/en/solutions/cloud-migration">cloud foundation</a> helps keep those options open.</p>

${img('production', 'An enterprise platform team reviews production monitoring dashboards with status tiles, a governance shield and connected service nodes', 'Production AI is operated like any business system: monitored, governed and improved over time.')}

<h3 class="hc-isys-h3">Measure the System, Not Just the Model</h3>
<p>Useful measures can include cycle time, resolution time, quality, adoption, cost per transaction, revenue influence, risk reduction or employee capacity released. The metric should connect to the reason the system exists.</p>

<ul class="hc-isys-grid hc-isys-cols-2">
  ${check('Cycle time and resolution time')}
  ${check('Quality and adoption')}
  ${check('Cost per transaction')}
  ${check('Revenue influence')}
  ${check('Risk reduction')}
  ${check('Employee capacity released')}
</ul>

<div class="hc-isys-takeaway">
  <strong>Production principle</strong>
  <p>Production AI is not a demo that works. It is a business system that keeps working when data changes, users adapt, integrations fail, and the organization evolves.</p>
</div>

<p class="hc-isys-eyebrow">06 | The HyperCode Perspective</p>
<h2 id="hypercode">Building What the Enterprise Needs Next</h2>

<p>HyperCode positions enterprise AI as part of a broader digital system: custom software, AI automation, cloud, data, analytics and enterprise platforms designed around real business operations. Its AI &amp; Automation capability includes architecting generative AI agent pipelines and models, while its wider technology capabilities provide the surrounding engineering foundation.</p>

<p>That matters because intelligent systems rarely live inside one technology layer. They depend on the quality of data, the reliability of applications, the design of integrations, the security model, the workflow, and the way people use the result.</p>

<h3 class="hc-isys-h3">A Practical Path</h3>
<p>HyperCode&rsquo;s delivery approach moves through Scoping &amp; Roadmap, System Architecture, Agile Engineering, and Launch &amp; Scale. For enterprise AI, that structure translates into a disciplined path from business case to architecture, implementation, integration and continuous improvement.</p>

<figure class="hc-isys-visual hc-isys-visual-dark" aria-labelledby="hc-isys-delivery-title">
  <div class="hc-isys-head">
    <div>
      <p class="hc-isys-kicker">HyperCode delivery approach</p>
      <p class="hc-isys-title" id="hc-isys-delivery-title">From Business Case to Intelligent System</p>
    </div>
    ${logo}
  </div>
  <ol class="hc-isys-delivery">
    <li><strong>Scoping &amp; Roadmap</strong><p>Business case, priorities and measurable outcomes</p></li>
    <li><strong>System Architecture</strong><p>Data, intelligence, workflow, integration and governance</p></li>
    <li><strong>Agile Engineering</strong><p>Implementation and integration in focused increments</p></li>
    <li><strong>Launch &amp; Scale</strong><p>Production operation and continuous improvement</p></li>
  </ol>
</figure>

<p>Explore the services behind this approach: <a href="/en/solutions/ai-consulting">AI consulting</a>, <a href="/en/solutions/ai-workflow-automation">AI workflow automation</a>, <a href="/en/solutions/custom-software-development">custom software development</a>, <a href="/en/solutions/data-engineering-solutions">data engineering</a> and <a href="/en/solutions/cloud-migration">cloud migration</a>.</p>

<p class="hc-isys-quote">The next generation of enterprise AI will be defined less by who has the most powerful model, and more by who can turn intelligence into a reliable business system.</p>

<p>For enterprises, the opportunity is not to follow every new AI capability. It is to understand the work that matters, connect the right intelligence to it, and build systems that can improve with the business. That is where strategy becomes architecture, architecture becomes execution, and technology becomes lasting value.</p>

<div class="hc-isys-final">
  <p class="hc-isys-final-main">A smarter tomorrow is built, not predicted.</p>
  <p class="hc-isys-final-sub">Turn intelligence into a reliable business system with an engineering partner that connects strategy, data, architecture and automation.</p>
  <ul class="hc-isys-motto"><li>WE SOLVE.</li><li>WE BUILD.</li><li>YOU GROW.</li></ul>
  <div class="hc-isys-btns">
    <a class="hc-isys-btn" href="/en/consultation">Schedule Consultation</a>
    <a class="hc-isys-btn hc-isys-btn-ghost" href="/en/solutions/ai-consulting">Explore AI Consulting</a>
  </div>
</div>
`;
