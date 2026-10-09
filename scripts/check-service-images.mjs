import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const details = fs.readFileSync(path.join(REPO, 'lib/services-details.ts'), 'utf8');
const imagesTs = fs.readFileSync(path.join(REPO, 'lib/service-images.ts'), 'utf8');
const dir = path.join(REPO, 'public/images/services');

const regStart = details.indexOf('export const SERVICE_REGISTRY');
const regEnd = details.indexOf('\n};', regStart);
const registry = [...details.slice(regStart, regEnd).matchAll(/^  '([a-z0-9-]+)': \{/gm)].map(m => m[1]);
const block = (name) => {
  const s = details.indexOf(name);
  return details.slice(s, details.indexOf('};', s));
};
const pairs = (txt) => Object.fromEntries([...txt.matchAll(/'([a-z0-9-]+)': '([a-z0-9-]+)'/g)].map(m => [m[1], m[2]]));
const aliases = pairs(block('export const ALIAS_MAP'));
const dups = pairs(block('const DUPLICATE_SERVICE_SLUGS'));
const canon = (s) => aliases[s] || dups[s] || s;

const altStart = imagesTs.indexOf('SERVICE_IMAGE_ALTS');
const alts = [...imagesTs.slice(altStart).matchAll(/^  '([a-z0-9-]+)': \{/gm)].map(m => m[1]);
const altEn = [...imagesTs.slice(altStart).matchAll(/en: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
const altEs = [...imagesTs.slice(altStart).matchAll(/es: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);

const errors = [];
const allSlugs = [...registry, ...Object.keys(aliases)];
const canonicals = new Set(allSlugs.map(canon));
for (const c of canonicals) {
  if (!alts.includes(c)) errors.push(`missing alt: ${c}`);
  if (!fs.existsSync(path.join(dir, `${c}.webp`))) errors.push(`missing file: ${c}.webp`);
}
for (const a of alts) if (!canonicals.has(a)) errors.push(`alt for unknown slug: ${a}`);
const files = fs.readdirSync(dir);
for (const f of files) {
  if (!/^[a-z0-9-]+\.webp$/.test(f)) errors.push(`bad filename: ${f}`);
  else if (!canonicals.has(f.replace(/\.webp$/, ''))) errors.push(`stale file: ${f}`);
}
const hashes = new Map();
for (const f of files) {
  const h = crypto.createHash('sha1').update(fs.readFileSync(path.join(dir, f))).digest('hex');
  if (hashes.has(h)) errors.push(`identical images: ${f} = ${hashes.get(h)}`);
  hashes.set(h, f);
}
if (new Set(altEn).size !== altEn.length) errors.push('duplicate EN alt text');
if (new Set(altEs).size !== altEs.length) errors.push('duplicate ES alt text');
if (altEn.length !== alts.length || altEs.length !== alts.length) errors.push(`alt count mismatch en=${altEn.length} es=${altEs.length} slugs=${alts.length}`);

const kb = files.reduce((n, f) => n + fs.statSync(path.join(dir, f)).size, 0) / 1024;
console.log(`registry=${registry.length} aliases=${Object.keys(aliases).length} duplicates=${Object.keys(dups).length} canonical=${canonicals.size} alts=${alts.length} files=${files.length} totalKB=${kb.toFixed(0)}`);
console.log(errors.length ? errors.join('\n') : 'OK: every service has its own unique image and EN/ES alt');
process.exit(errors.length ? 1 : 0);
