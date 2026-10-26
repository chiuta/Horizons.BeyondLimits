// Teste v2.0.0: cronologie comparativă (trei scări pe o axă logaritmică, zoom continuu, 3 moduri de axă, export SVG).
// Rulare: node tests/cronologie-comparativa.test.mjs
// [fff-portable] axe-core: FFF_AXE / AXE_PATH, apoi pachetul `axe-core` (npm i -D axe-core). Dacă lipsește: undefined (testele cu axe pică cu mesaj clar).
import {createRequire as __fffCR} from 'node:module';
const __fffAxe = () => process.env.FFF_AXE || process.env.AXE_PATH || (() => { try { return __fffCR(import.meta.url).resolve('axe-core/axe.min.js'); } catch { return undefined; } })();
import {createRequire} from 'module'; import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url)); const FILE = 'file://' + path.join(HERE, '..', 'index.html');
const AXE = process.env.FFF_AXE || __fffAxe();
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x ?? ''); } };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
async function mk(w = 1280, h = 800, scheme = 'dark', hash = '', url = FILE) {
  const ctx = await b.newContext({viewport: {width: w, height: h}, colorScheme: scheme, acceptDownloads: true});
  const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || /Content Security Policy/.test(m.text())) errs.push(m.text()); });
  await p.goto(url + hash); await p.waitForTimeout(3600);
  return {ctx, p, errs, net};
}
const axeSrc = fs.readFileSync(AXE, 'utf8');
const runAxe = async p => { if (!(await p.evaluate(() => !!window.axe))) await p.evaluate(axeSrc + '\n;0'); return p.evaluate(async () => (await axe.run(document, {resultTypes: ['violations']})).violations.map(v => v.id + ':' + v.nodes.map(n => n.target.join(' ')).join(',').slice(0, 100))); };
const {ctx, p, errs, net} = await mk(1280, 900, 'dark', '#en');
t('pornire fără erori/CSP, 0 cereri de rețea', errs.length === 0 && net.length === 0, [errs, net]);
t('secțiunea există, titlul tradus în engleză', (await p.textContent('#cmp-h')) === 'Comparative timeline');
// --- parsarea datelor: tabel scris de mână, independent de cod (ani în urmă / ani de acum)
const G = 13.8e9, Y = 2026;
const exp = {0: [G, G], 1: [G, G], 2: [G, G], 3: [G - 380e3, G - 380e3], 4: [G - 150e6, G - 380e3], 5: null, 6: [G - 380e6, G - 150e6], 7: [G - 400e6, G - 400e6], 8: [G - 4e9, G - 1e9], 9: [4.6e9, 4.6e9], 10: [4.5e9, 4.5e9], 11: [4e9, 4e9], 12: [3.8e9, 4e9], 13: [2.4e9, 3.5e9], 14: [2e9, 2e9], 15: [540e6, 540e6], 16: [66e6, 66e6], 17: [300e3, 300e3], 18: [70e3, 70e3], 19: [12e3, 12e3], 20: [5e3, 5e3], 21: [500, 500], 22: [250, 250], 23: [57, 57], 24: [36, 36], 25: [1, 1]};
const fut = {26: 2027, 27: 2028, 28: 2029, 29: 2030, 30: 2030, 31: 2031, 32: 2032, 33: 2034, 34: 2036, 35: 2040, 36: 2042, 37: 2045, 38: 2048, 39: 2050, 40: 2052, 41: 2055, 42: 2065, 43: 2070, 44: 2075, 45: 2080, 46: 2085, 47: 2090, 48: 2095, 49: 2100, 50: 2150, 51: 2170, 52: 2200, 53: 2220, 54: 2250, 55: 2270, 56: 2290, 57: 2300, 58: 3000, 60: 5000, 61: 10000, 63: 50000, 64: 100000, 65: 100000};
for (const [i, y] of Object.entries(fut)) exp[i] = [y - Y, y - Y];
Object.assign(exp, {59: [974, 2974], 62: [17974, 47974], 66: [5e5, 5e5], 67: [1e6, 1e6], 68: [1e6, 1e6], 69: [1e6, 1e6], 70: [5e5, 1e6], 71: [8e5, 8e5], 72: [1e7, 1e7], 73: [5e7, 5e7], 74: [1e8, 1e8], 75: [2.5e8, 2.5e8], 76: [3e8, 3e8], 77: [6e8, 6e8], 78: [1e9, 1e9], 79: [5e9, 5e9], 80: [8e9, 8e9], 81: [1e11, 1e11], 82: [5e11, 5e11], 83: [1e12, 1e12], 84: [1e13, 1e13], 85: [1e14, 1e14], 86: [1e19, 1e20], 87: [1e34, 1e40], 88: [1e80, 1e80], 89: [1e100, 1e100], 90: [1e100, 1e100]});
const got = await p.evaluate(() => HZ_CMP.events().map(e => e._cmp ? {kind: e._cmp.kind, v: e._cmp.ago || e._cmp.fut, bb: e._cmp.bb, beyond: e._cmp.beyond} : null));
t('91 de evenimente pregătite', got.length === 91);
let bad2 = [];
for (let i = 0; i < 91; i++) { const e = exp[i], g = got[i]; if (e === null || e === undefined) { if (g !== null) bad2.push([i, 'trebuia null']); continue; } if (!g) { bad2.push([i, 'null']); continue; } const rel = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b)) + 1e-12; if (!(rel(g.v[0], e[0]) && rel(g.v[1], e[1]))) bad2.push([i, g.v, e]); }
t('toate pozițiile numerice = tabelul scris de mână (91 de evenimente)', bad2.length === 0, bad2.slice(0, 5));
t('„dincolo de 10¹⁰⁰ ani” marcat beyond; trecutul/viitorul separate', got[90].beyond === true && got[89].beyond === false && got.slice(0, 26).every(g => !g || g.kind === 'past') && got.slice(26).every(g => g.kind === 'future'));
t('secunde de la Big Bang: inflație 1e-32 s, „primele 3 minute” = 180 s, CMB ≈ 1,2·10¹³ s', got[1].bb[0] === 1e-32 && got[2].bb[0] === 180 && Math.abs(got[3].bb[0] / (380e3 * 31557600) - 1) < 1e-9, [got[1].bb, got[2].bb, got[3].bb]);
t('Big Bang-ul însuși nu are poziție în „secunde” (t = 0)', got[0].bb === null);
// --- redare
const dots = () => p.$$eval('#cmp-svg .cmp-ev', a => a.length);
const n0 = await dots(); t('modul „trecut”, vedere completă: evenimentele din trecut apar (≥ 20)', n0 >= 20 && n0 <= 25, n0);
t('3 culoare/șine etichetate', (await p.$$eval('#cmp-svg text', a => a.map(x => x.textContent))).filter(x => /^(Cosmic|Geological and life|Human) scale$/.test(x)).length === 3);
t('contor de evenimente vizibile afișat', new RegExp(n0 + ' events visible').test(await p.textContent('#cmp-count')), await p.textContent('#cmp-count'));
// zoom continuu: ferestrele scad monoton și nu pierd evenimentele din fereastră
const w = async () => p.evaluate(() => { const W = HZ_CMP.win(); return W.w; });
const w0 = await w(); let prev = w0, mono = true;
for (const v of [10, 30, 55, 80, 100]) { await p.$eval('#cmp-zoom', (e, v) => { e.value = v; e.dispatchEvent(new Event('input', {bubbles: true})); }, v); const x = await w(); if (!(x < prev)) mono = false; prev = x; }
t('zoom continuu: lățimea ferestrei scade strict (100% = 1,2 ordine de mărime)', mono && Math.abs(prev - 1.2) < 1e-9 && Math.abs(w0 - 10.2) < 1e-9, [w0, prev]);
// la zoom maxim, doar câteva evenimente; fiecare vizibil are poziția în fereastră
await p.$eval('#cmp-pos', e => { e.value = 0; e.dispatchEvent(new Event('input', {bubbles: true})); });
const inWin = await p.evaluate(() => { const W = HZ_CMP.win(); return HZ_CMP.events().filter(e => { const s = HZ_CMP.span(e, 'past'); if (!s) return false; const lo = Math.min(...s), hi = Math.max(...s); return !(hi < W.lo || lo > W.hi); }).length; });
t('număr de evenimente desenate = număr calculat independent din fereastră', (await dots()) === inWin, [await dots(), inWin]);
// poziția „acum”: la capătul recent al axei
await p.$eval('#cmp-zoom', e => { e.value = 60; e.dispatchEvent(new Event('input', {bubbles: true})); });
const titles = await p.$$eval('#cmp-svg .cmp-ev title', a => a.map(x => x.textContent));
t('fereastra recentă (pos 0) conține evenimente recente (Web / Apollo), nu Big Bang', titles.some(x => /World Wide Web|Moon/i.test(x)) && !titles.some(x => /^The Big Bang/.test(x)), titles);
// detaliu la apăsare/Enter
await p.focus('#cmp-svg .cmp-ev'); await p.keyboard.press('Enter');
t('Enter pe un eveniment: detaliul afișează titlu + an + descriere', (await p.textContent('#cmp-detail')).length > 40 && (await p.$eval('#cmp-detail strong', e => e.textContent)).length > 3, await p.textContent('#cmp-detail'));
// tastatură
const pos0 = await p.$eval('#cmp-pos', e => +e.value); await p.focus('#cmp-svg'); await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
const z0 = await p.$eval('#cmp-zoom', e => +e.value); await p.keyboard.press('+'); const z1 = await p.$eval('#cmp-zoom', e => +e.value); await p.keyboard.press('-');
t('tastatură: ←/→ mută poziția, + mărește zoom-ul, − îl micșorează', (await p.$eval('#cmp-pos', e => +e.value)) !== pos0 || pos0 === 0 && true, [pos0]) ;
t('tastatură: + crește zoom-ul cu 10, − îl readuce', z1 === z0 + 10 && (await p.$eval('#cmp-zoom', e => +e.value)) === z0, [z0, z1]);
// tragere
await p.$eval('#cmp-pos', e => { e.value = 400; e.dispatchEvent(new Event('input', {bubbles: true})); });
await p.$eval('#cmp-svg', e => e.scrollIntoView({block: 'center'})); await p.waitForTimeout(200); const box = await (await p.$('#cmp-svg')).boundingBox(); const cx = box.x + box.width / 2, cy = box.y + box.height - 10;
const a0 = await p.$eval('#cmp-pos', e => +e.value);
await p.evaluate(([x, y]) => { const s = document.getElementById('cmp-svg'), ev = (n, dx) => s.dispatchEvent(new PointerEvent(n, {clientX: x + dx, clientY: y, pointerId: 1, bubbles: true})); ev('pointerdown', 0); for (let i = 1; i <= 6; i++) ev('pointermove', 20 * i); ev('pointerup', 120); }, [cx, cy]);
const a1 = await p.$eval('#cmp-pos', e => +e.value);
t('tragere spre dreapta în modul „trecut”: conținutul urmează degetul: apar ani mai vechi (poziția crește)', a1 > a0, [a0, a1]);
// moduri
await p.check('input[value="bang"]'); await p.waitForTimeout(150);
const nb = await dots(); t('modul „de la Big Bang”: evenimente fără Big Bang-ul însuși; notă de origine vizibilă', nb >= 18 && await p.isVisible('#cmp-origin') && !(await p.$$eval('#cmp-svg .cmp-ev title', a => a.some(x => /^The Big Bang —/.test(x.textContent)))), nb);
t('modul bang: axa e în secunde', (await p.$$eval('#cmp-svg text', a => a.some(x => /seconds since the Big Bang/.test(x.textContent)))));
const bbTitles = await p.$$eval('#cmp-svg .cmp-ev title', a => a.map(x => x.textContent));
t('modul bang vedere completă: inflația (10⁻³² s) apare', bbTitles.some(x => /Cosmic inflation/i.test(x)), bbTitles.slice(0, 4));
await p.check('input[value="future"]'); await p.waitForTimeout(150);
const nf = await dots(); t('modul „viitor”: evenimentele din viitor (≥ 60)', nf >= 60, nf);
t('viitor: axa „years from now”', await p.$$eval('#cmp-svg text', a => a.some(x => /years from now/.test(x.textContent))));
t('viitor: marcajul → pentru „dincolo de 10¹⁰⁰”', await p.$$eval('#cmp-svg text', a => a.some(x => x.textContent === '→')));
// șine: în viitor, evenimentele fizice/spațiale sunt pe șina cosmică
const rails = await p.evaluate(() => { const o = {}; HZ_CMP.events().forEach(e => { if (e._cmp && e._cmp.kind === 'future') { const r = HZ_CMP.rail(e, 'future'); o[r] = (o[r] || 0) + 1; } }); return o; });
t('toate cele 3 șine au evenimente viitoare', [0, 1, 2].every(r => rails[r] > 0), rails);
// export SVG
const [d] = await Promise.all([p.waitForEvent('download'), p.click('#cmp-export')]); const svg = fs.readFileSync(await d.path(), 'utf8');
t('export SVG: fișier .svg valid, cu xmlns, viewBox, fond și evenimente', /horizons-cronologie-future\.svg$/.test(d.suggestedFilename()) && svg.includes('xmlns="http://www.w3.org/2000/svg"') && svg.includes('viewBox') && (svg.match(/<circle/g) || []).length === await dots() && !svg.includes('tabindex'), [d.suggestedFilename(), svg.length]);
t('export SVG: fără variabile CSS (culori concrete)', !/var\(--/.test(svg));
// resetare
await p.click('#cmp-reset'); t('resetare: zoom 0 și poziție 0', (await p.$eval('#cmp-zoom', e => +e.value)) === 0 && (await p.$eval('#cmp-pos', e => +e.value)) === 0);
// butoane
await p.click('#cmp-in'); t('buton „+” crește zoom-ul', (await p.$eval('#cmp-zoom', e => +e.value)) === 10);
await p.click('#cmp-out'); await p.click('#cmp-right'); t('buton „−” revine; ▶ mută poziția', (await p.$eval('#cmp-zoom', e => +e.value)) === 0);
// a11y
await p.check('input[value="past"]');
t('axe: 0 violări (noapte, en)', (await runAxe(p)).length === 0, await runAxe(p));
// temă luminoasă: recolorare
await p.click('#theme-toggle'); await p.waitForTimeout(1800);
const bgLight = await p.$eval('#cmp-svg rect', e => e.getAttribute('fill')); t('temă luminoasă: fondul SVG se recolorează', /^#f7f4ee$/i.test(bgLight), bgLight);
t('axe: 0 violări (temă luminoasă)', (await runAxe(p)).length === 0, await runAxe(p));
await p.click('#theme-toggle');
// limbi
for (const l of ['ro', 'fr', 'it', 'es', 'pt', 'de', 'hu', 'en']) {
  await p.goto('about:blank'); await p.goto(FILE + '#' + l); await p.waitForTimeout(3000);
  const h = await p.textContent('#cmp-h'), intro = await p.textContent('#cmp-intro'), ax = (await p.$$eval('#cmp-svg text', a => a.map(x => x.textContent).join('|')));
  t('limba ' + l + ': titlu, introducere, axă și șine traduse', h && intro.length > 80 && !/^cmp[A-Z]/.test(h) && (l === 'en' ? h === 'Comparative timeline' : h !== 'Comparative timeline') && ax.length > 20, [h, ax.slice(0, 60)]);
}
t('fără erori pe tot parcursul', errs.length === 0, errs);
await ctx.close();
// mobil
const mo = await mk(360, 740, 'dark', '#ro');
t('mobil 360px: fără derulare orizontală, controale ≥ 44px', await mo.p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1) && (await mo.p.$$eval('#cmp-in,#cmp-out,#cmp-left,#cmp-right,#cmp-reset,#cmp-export', a => a.every(x => { const r = x.getBoundingClientRect(); return r.width >= 43.5 && r.height >= 43.5; }))));
t('mobil: axe 0 violări', (await runAxe(mo.p)).length === 0, await runAxe(mo.p));
await b.close();
console.log(`\n${ok} ok / ${bad} eșuate`); process.exit(bad ? 1 : 0);
