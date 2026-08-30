/**
 * Deep verification: expected SVG fingerprint per capability step.
 */
import { chromium } from 'playwright';

const STEPS = [
  { step: '01', id: 'ai', minShapes: 15, mustInclude: ['polygon'] },
  { step: '02', id: 'bi', minShapes: 8, mustInclude: ['polyline'] },
  { step: '03', id: 'data', minShapes: 8, mustInclude: ['polyline', 'circle'] },
  { step: '04', id: 'platforms', minShapes: 10, mustInclude: ['ellipse'] },
  { step: '05', id: 'software', minShapes: 3, mustInclude: ['polygon'] },
  { step: '06', id: 'web', minShapes: 8, mustInclude: ['rect'] },
  { step: '07', id: 'mobile', minShapes: 6, mustInclude: ['rect', 'circle'] },
  { step: '08', id: 'cloud', minShapes: 12, mustInclude: ['rect', 'line'] },
  { step: '09', id: 'digital', minShapes: 10, mustInclude: ['circle', 'polygon'] },
  { step: '10', id: 'staffing', minShapes: 10, mustInclude: ['circle', 'line'] },
];

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

async function scrollToStep(page, stepIndex, stepCount) {
  await page.evaluate(
    ({ stepIndex, stepCount }) => {
      const section = document.getElementById('services');
      const track = section?.querySelector(':scope > div[style*="height"]');
      if (!section || !track) throw new Error('Missing services scroll track');
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const scrollSpan = window.innerHeight * Math.max(stepCount - 1, 1);
      const progress = (stepIndex + 0.55) / stepCount;
      window.scrollTo({ top: trackTop + progress * scrollSpan, behavior: 'instant' });
    },
    { stepIndex, stepCount },
  );
  await page.waitForTimeout(600);
}

async function inspectStep(page, expected) {
  const visual = page.locator('#services aside .relative.overflow-hidden').first();
  const svgHtml = (await visual.locator('svg').first().innerHTML().catch(() => '')) ?? '';
  const tags = ['rect', 'circle', 'line', 'polyline', 'polygon', 'path', 'ellipse'].filter((tag) =>
    svgHtml.includes(`<${tag}`),
  );
  const shapeCount = tags.reduce((sum, tag) => sum + (svgHtml.match(new RegExp(`<${tag}`, 'g'))?.length ?? 0), 0);
  const label = ((await visual.locator('p').first().textContent().catch(() => '')) ?? '').trim();
  const counter = ((await page.locator('#services aside [aria-live="polite"]').first().textContent()) ?? '')
    .replace(/\s+/g, ' ')
    .trim();

  const missingTags = expected.mustInclude.filter((tag) => !tags.includes(tag));
  const ok =
    shapeCount >= expected.minShapes &&
    missingTags.length === 0 &&
    counter.startsWith(expected.step);

  return { shapeCount, tags, label, counter, missingTags, ok, svgSnippet: svgHtml.slice(0, 120) };
}

async function runMode(page, modeName) {
  console.log(`\n=== ${modeName} ===`);
  const results = [];
  for (let i = 0; i < STEPS.length; i++) {
    const expected = STEPS[i];
    await scrollToStep(page, i, STEPS.length);
    const info = await inspectStep(page, expected);
    results.push({ ...expected, ...info });
    console.log(
      `[${info.ok ? 'PASS' : 'FAIL'}] Step ${expected.step} (${expected.id}): counter="${info.counter}" shapes=${info.shapeCount} tags=[${info.tags.join(',')}] label="${info.label}"`,
    );
    if (!info.ok) {
      console.log(`       missingTags=${JSON.stringify(info.missingTags)} snippet=${info.svgSnippet}`);
    }
  }
  return results;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  // Desktop scroll-pin + motion
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(`${BASE_URL}/en`, { waitUntil: 'networkidle', timeout: 120000 });
  await desktop.waitForSelector('#services');
  const desktopResults = await runMode(desktop, 'Desktop scroll-pin');

  // Reduced motion: article list + sticky visual (no scroll pin)
  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await reduced.emulateMedia({ reducedMotion: 'reduce' });
  await reduced.goto(`${BASE_URL}/en`, { waitUntil: 'networkidle', timeout: 120000 });
  await reduced.waitForSelector('#services article');
  const reducedResults = [];
  console.log('\n=== Reduced motion (article list) ===');
  for (let i = 0; i < STEPS.length; i++) {
    const expected = STEPS[i];
    const row = reduced.locator('#services article').nth(i);
    await row.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const target = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
      window.scrollTo({ top: target, behavior: 'instant' });
    });
    await reduced.waitForTimeout(500);
    const info = await inspectStep(reduced, expected);
    reducedResults.push({ ...expected, ...info });
    console.log(
      `[${info.ok ? 'PASS' : 'FAIL'}] Step ${expected.step} (${expected.id}): counter="${info.counter}" shapes=${info.shapeCount} tags=[${info.tags.join(',')}] label="${info.label}"`,
    );
  }

  await browser.close();

  const failed = [...desktopResults, ...reducedResults].filter((r) => !r.ok);
  if (failed.length) {
    console.error('\nFailures:', failed.map((r) => `${r.step}:${r.id}`).join(', '));
    process.exit(1);
  }
  console.log('\nAll steps verified in both modes.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
