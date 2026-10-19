// Teste pentru funcțiile din v1.1.0: export CSV, cod QR pe carduri (legătură permanentă), căutare locală tolerantă la greșeli, 7 limbi + kit.
// Rulare: node tests/fff-r8.test.mjs   (Playwright din /opt/node-tools, Chromium din /opt/pw-browsers; rețea blocată)
import {createRequire} from 'module'; import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const require = createRequire('/opt/node-tools/package.json'); const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url)); const FILE = 'file://' + path.join(HERE, '..', 'index.html');
const AXE = process.env.FFF_AXE || '/tmp/claude-0/-home-claude/78529928-3825-51c3-b9bd-0e81655ab6bc/scratchpad/sweep/node_modules/axe-core/axe.min.js';
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x ?? ''); } };
const b = await chromium.launch({executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox']});
async function mk(w = 1280, h = 800, scheme = 'dark', hash = '', url = FILE) {
  const ctx = await b.newContext({viewport: {width: w, height: h}, colorScheme: scheme, acceptDownloads: true});
  const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || /Content Security Policy/.test(m.text())) errs.push(m.text()); });
  await p.goto(url + hash); await p.waitForTimeout(3600);
  return {ctx, p, errs, net};
}
const axeSrc = fs.readFileSync(AXE, 'utf8');
const runAxe = async p => { if (!(await p.evaluate(() => !!window.axe))) await p.evaluate(axeSrc + '\n;0'); return p.evaluate(async () => (await axe.run(document, {resultTypes: ['violations']})).violations.map(v => v.id + ':' + v.nodes.map(n => n.target.join(' ')).join(',').slice(0, 120))); };
async function dl(p, sel) { const [d] = await Promise.all([p.waitForEvent('download'), p.click(sel)]); return {name: d.suggestedFilename(), txt: fs.readFileSync(await d.path(), 'utf8')}; }
function parseCsv(txt) { // parser RFC 4180 minimal, independent of the app
  const rows = []; let row = [], f = '', q = false; txt = txt.replace(/^﻿/, '');
  for (let i = 0; i < txt.length; i++) { const c = txt[i];
    if (q) { if (c === '"') { if (txt[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\r') { /* skip */ } else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; } else f += c; }
  if (f || row.length) { row.push(f); rows.push(row); } return rows;
}

const {ctx, p, errs, net} = await mk(1280, 800, 'dark', '#en');
t('pornire fără erori/CSP', errs.length === 0, errs); t('0 cereri de rețea', net.length === 0, net);
t('kitul (core, label, bundle, qr, search) încărcat', await p.evaluate(() => !!(window.FFF && FFF.qr && FFF.label && FFF.bundle && FFF.search)));
// --- CSV
const c1 = await dl(p, '#export-csv'); const R = parseCsv(c1.txt);
t('CSV: nume fișier și BOM', c1.name === 'horizons-timeline-en.csv' && c1.txt.charCodeAt(0) === 0xfeff, c1.name);
t('CSV: antet în engleză', R[0].join('|') === 'era|domain|date|confidence|title|description', R[0].join('|'));
const md0 = (await dl(p, '#export-md')).txt, mdTitles = [...md0.matchAll(/^### (.*)$/gm)].map(m => m[1]);
t('CSV: 91 de evenimente + antet, toate rândurile cu 6 câmpuri', mdTitles.length === 91 && R.length === 92 && R.every(r => r.length === 6), [R.length, mdTitles.length]);
const titlesCsv = R.slice(1).map(r => r[4]);
t('CSV: titlurile și ordinea = cele din exportul Markdown existent (cod independent)', JSON.stringify(titlesCsv) === JSON.stringify(mdTitles));
const descMd = [...md0.matchAll(/^### .*\n\n\*.*\*\n\n(.*)$/gm)].map(m => m[1]); t('CSV: descrierile = cele din Markdown', descMd.length === 91 && R.slice(1).every((r, i) => r[5] === descMd[i]), descMd.length);
t('CSV: nicio celulă nu începe cu = + - @ (protecție formule)', R.every(r => r.every(c => !/^[=+\-@\t]/.test(c))));
// filtru de domeniu
await p.click('#chips .chip >> nth=0'); await p.waitForTimeout(300);
const cf = parseCsv((await dl(p, '#export-csv')).txt); const mdF = [...(await dl(p, '#export-md')).txt.matchAll(/^### (.*)$/gm)].length;
t('CSV: respectă filtrul de domeniu activ (aceleași rânduri ca exportul Markdown filtrat: ' + mdF + ')', cf.length === mdF + 1 && mdF > 0 && mdF < 91 && new Set(cf.slice(1).map(r => r[1])).size === 1, [cf.length, mdF]);
await p.click('#filter-clear'); await p.waitForTimeout(200);
t('Markdown-ul existent funcționează în continuare', (await dl(p, '#export-md')).txt.startsWith('# '));
// --- QR
await p.evaluate(() => window.scrollTo(0, 0));
const slug0 = await p.evaluate(() => document.querySelector('.qr-btn').getAttribute('data-qr-slug'));
t('butoane QR pe carduri (câte unul la fiecare ⧉), cu etichetă accesibilă', /^[a-z0-9-]+$/.test(slug0) && (await p.locator('.qr-btn').count()) === (await p.locator('.copy-btn').count()) && (await p.getAttribute('.qr-btn >> nth=0', 'aria-label')) === 'QR code for this card', slug0);
await p.click('.qr-btn >> nth=0'); await p.waitForTimeout(400);
const url = await p.textContent('#qr-url'); t('QR: dialog deschis, adresa = publică + #slug', await p.evaluate(() => document.getElementById('qr-dialog').open && !!document.querySelector('#qr-img svg')) && url === 'https://chiuta.github.io/Horizons.BeyondLimits/#' + slug0, url);
const dec = await p.evaluate(async () => { const svg = document.querySelector('#qr-img svg').outerHTML, u = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg), im = new Image(); await new Promise((r, j) => { im.onload = r; im.onerror = j; im.src = u; }); const c = document.createElement('canvas'); c.width = c.height = 420; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 420, 420); x.drawImage(im, 0, 0, 420, 420); const bl = await new Promise(r => c.toBlob(r, 'image/png')); try { const r = await FFF.qr.scan(new File([bl], 'q.png', {type: 'image/png'})); return r && (r.text || r); } catch (e) { return 'ERR ' + e.message; } });
t('QR: decodat înapoi = adresa afișată', dec === url, dec);
t('QR: axe 0 violări cu dialogul deschis', (await runAxe(p)).length === 0, await runAxe(p));
await p.keyboard.press('Escape'); await p.waitForTimeout(200); t('QR: Esc închide dialogul', await p.evaluate(() => !document.getElementById('qr-dialog').open));
// legătura permanentă din QR duce la carte: luăm un eveniment dintr-o altă eră (prin căutare), deschidem adresa din QR într-o pagină nouă
await p.fill('#search', 'mars'); await p.waitForTimeout(500);
const far = await p.evaluate(() => { const b = [...document.querySelectorAll('.event-card .qr-btn')]; return b.length ? b[b.length - 1].getAttribute('data-qr-slug') : null; }); await p.fill('#search', ''); await p.waitForTimeout(200);
{ const m = await mk(1280, 800, 'dark', '#' + far);
  const vis = await m.p.evaluate(s => { const el = document.querySelector('[data-track="event:' + s + '"]'); if (!el) return null; const r = el.getBoundingClientRect(); return {top: r.top, h: innerHeight}; }, far);
  t('legătura permanentă din QR (#' + far + ') deschide cartea în pagină nouă și o aduce în ecran', !!vis && vis.top > -50 && vis.top < vis.h, JSON.stringify(vis)); await m.ctx.close(); }
// --- căutare tolerantă
await p.fill('#search', 'Big Bangul'); await p.waitForTimeout(500);
let html = await p.evaluate(() => document.getElementById('content').innerText);
t('„Big Bangul” (greșit): nicio potrivire exactă, dar apar potriviri apropiate cu Big Bang', /close matches/i.test(html) && /Big Bang/.test(html) && /No exact match for/.test(html) && !/Nothing found/.test(html), html.slice(0, 300));
t('căutarea tolerantă: antet + nota cu interogarea', /No exact match for “Big Bangul”/.test(await p.textContent('#approx-note')), await p.textContent('#approx-note'));
t('axe 0 violări pe rezultatele apropiate', (await runAxe(p)).length === 0, await runAxe(p));
await p.fill('#search', 'nucleosynthesys primordial'); await p.waitForTimeout(500);
t('„nucleosynthesys primordial” (greșit): găsește nucleosinteza prin potrivire apropiată', await p.evaluate(() => /nucleosynthesis/i.test(document.getElementById('content').innerText) && /close matches/i.test(document.getElementById('content').innerText)));
await p.fill('#search', 'Big Bang'); await p.waitForTimeout(500); t('potrivire exactă: nu apare blocul „Close matches” (comportament neschimbat)', !/close matches/i.test(await p.evaluate(() => document.getElementById('content').innerText)));
await p.fill('#search', 'zzzqqqxx'); await p.waitForTimeout(500); html = await p.evaluate(() => document.getElementById('content').innerText); t('șir fără sens: mesajul „nimic găsit”, fără rezultate false', !/close matches/i.test(html) && /nothing found/i.test(html), html.slice(0, 200));
await p.fill('#search', ''); await p.waitForTimeout(300);
// --- 7 limbi
const lab = {};
const setLang = async l => { await p.evaluate(() => window.scrollTo(0, 0)); await p.click('#lang-toggle'); await p.locator('#lang-list-hero li[data-lang="' + l + '"]').dispatchEvent('click'); await p.waitForTimeout(400); };
for (const l of ['ro', 'en', 'fr', 'it', 'es', 'pt', 'de']) { await setLang(l); lab[l] = await p.evaluate(() => [document.getElementById('export-csv').textContent.trim(), document.getElementById('qr-title').textContent.trim(), document.getElementById('qr-copy').textContent.trim()]); }
t('toate cele 7 limbi au textele noi, distincte', Object.values(lab).every(a => a.every(x => x.length > 3)) && new Set(Object.values(lab).map(a => a[0])).size === 7, JSON.stringify(lab));
await setLang('ro'); const cro = await dl(p, '#export-csv'); t('CSV în română: antet „eră|domeniu|…” și nume .ro.csv', parseCsv(cro.txt)[0].join('|') === 'eră|domeniu|dată|încredere|titlu|descriere' && cro.name === 'horizons-timeline-ro.csv', cro.name);
await setLang('de'); await p.fill('#search', 'Urknalll'); await p.waitForTimeout(500); t('căutare apropiată în germană: textele traduse', /nahe treffer/i.test(await p.evaluate(() => document.getElementById('content').innerText)) && /Kein exakter Treffer/.test(await p.evaluate(() => document.getElementById('content').innerText)));
await p.fill('#search', ''); await setLang('en');
for (const dark of [true, false]) { if (!dark) { await p.evaluate(() => window.scrollTo(0, 0)); await p.click('#theme-toggle'); } await p.waitForTimeout(1800); /* tranziția de culoare la schimbarea temei depășește 900 ms */ t('axe 0 violări pagina principală (' + (dark ? 'întunecat' : 'luminos') + ')', (await runAxe(p)).length === 0, await runAxe(p)); }
t('fără erori pe parcurs', errs.length === 0, errs); t('0 cereri de rețea pe parcurs', net.length === 0, net);
await p.evaluate(() => window.scrollTo(0, 0)); await p.click('#app-version').catch(() => {}); await p.waitForTimeout(300);
await ctx.close();
{ const m = await mk(360, 740, 'light', '#en');
  t('360: fără depășire orizontală', await m.p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), await m.p.evaluate(() => document.documentElement.scrollWidth));
  t('360: butoanele de export încap în ecran', await m.p.evaluate(() => ['export-md', 'export-csv'].every(i => { const r = document.getElementById(i).getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; })));
  await m.p.click('.qr-btn >> nth=0'); await m.p.waitForTimeout(300); t('360: dialog QR încape', await m.p.evaluate(() => { const r = document.getElementById('qr-dialog').getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }));
  t('360: axe 0 violări (luminos, dialog)', (await runAxe(m.p)).length === 0, await runAxe(m.p)); t('360: fără erori', m.errs.length === 0, m.errs); await m.ctx.close(); }
{ const html = fs.readFileSync(path.join(HERE, '..', 'index.html'), 'utf8').replace(/<!--fff:kit:start[\s\S]*?<!--fff:kit:end-->/, '');
  const tmp = path.join(HERE, '..', '_nokit.tmp.html'); /* în directorul aplicației, ca manifestul și iconițele relative să existe */ fs.writeFileSync(tmp, html); const m = await mk(1280, 800, 'dark', '#en', 'file://' + tmp);
  await m.p.fill('#search', 'Big Bangul'); await m.p.waitForTimeout(400);
  const csv = await dl(m.p, '#export-csv');
  t('fără kit: fără erori, fără butoane QR, fără bloc „Close matches”, CSV funcționează', m.errs.length === 0 && (await m.p.locator('.qr-btn').count()) === 0 && !/close matches/i.test(await m.p.evaluate(() => document.getElementById('content').innerText)) && parseCsv(csv.txt).length >= 1, m.errs); await m.ctx.close(); fs.unlinkSync(tmp); }
await b.close();
console.log(`\n${ok} ok / ${bad} eșuate`); process.exit(bad ? 1 : 0);
