// Teste v2.1.0: scara liniară/logaritmică comutabilă a cronologiei comparative + sursele evenimentelor.
// Rulare: node tests/scara-surse.test.mjs   (PW_ROOT, FFF_AXE opțional, CHROMIUM_PATH)
import {createRequire} from 'module'; import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require('playwright');
const FILE = 'file://' + path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x ?? ''); } };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
const ctx = await b.newContext({viewport: {width: 1100, height: 900}});
const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto(FILE + '#en'); await p.waitForTimeout(3600);
t('pornire fără erori/CSP, 0 cereri de rețea', errs.length === 0 && net.length === 0, [errs, net]);
const vis = () => p.$$eval('#cmp-svg .cmp-ev', a => a.map(g => +g.getAttribute('data-i')));
const ticks = () => p.$$eval('#cmp-svg text', a => a.map(x => x.textContent).filter(x => /^[0-9]/.test(x) || /^10/.test(x)));
const nLog = (await vis()).length;
t('implicit: scară logaritmică, etichete 10ⁿ, notă „Logarithmic”', (await ticks()).some(x => /^10[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(x)) && /Logarithmic scale/.test(await p.textContent('#cmp-scalenote')));
await p.check('input[name="cmp-scale"][value="lin"]');
await p.waitForTimeout(200);
t('liniar: axa „years ago · linear scale”, notă explicativă', /linear scale/.test(await p.textContent('#cmp-svg')) && /Linear scale/.test(await p.textContent('#cmp-scalenote')), await p.textContent('#cmp-scalenote'));
const tk = await ticks();
t('liniar: gradații „rotunde” (0 … 1,38×10¹⁰ în pași 2×10⁹ etc.)', tk.includes('0') && tk.some(x => /×10⁹$|^10⁹$/.test(x)), tk);
// pe scară liniară evenimentele recente se strâng lângă „acum” (marginea dreaptă); poziția lor x e aproape de capăt
const xs = await p.evaluate(() => { const E = HZ_CMP.events(); const r = {}; ['Primii oameni pe Lună', 'Revoluția agricolă', 'Formarea Sistemului Solar', 'Explozia cambriană'].forEach(n => { const i = E.findIndex(e => e.title === n); const g = document.querySelector('#cmp-svg .cmp-ev[data-i="' + i + '"] circle'); r[n] = g ? +g.getAttribute('cx') : null; }); return r; });
t('liniar: Luna 1969 și agricultura sunt lipite de „acum” (dreapta), Sistemul Solar departe', xs['Primii oameni pe Lună'] > 960 && xs['Revoluția agricolă'] > 960 && xs['Formarea Sistemului Solar'] < 700, xs);
t('liniar: poziția Sistemului Solar proporțională (4,6/13,8 mld. ani din drum de la dreapta)', Math.abs((970 - xs['Formarea Sistemului Solar']) / 820 - 4.6 / 13.8) < 0.03, xs);
// zoom pe 1969
await p.fill('#cmp-zoom', '100'); await p.dispatchEvent('#cmp-zoom', 'input'); await p.fill('#cmp-pos', '0'); await p.dispatchEvent('#cmp-pos', 'input'); await p.waitForTimeout(200);
const names = await p.$$eval('#cmp-svg .cmp-ev', a => a.map(g => g.getAttribute('aria-label')));
t('liniar + zoom maxim lângă „acum”: apar evenimentele de ultimii ~100 de ani, nu cele cosmice', names.some(n => /Moon|Web|Anthropocene/i.test(n)) && !names.some(n => /Big Bang|Solar System/i.test(n)), names);
// bang: liniar indisponibil
await p.check('input[name="cmp-mode"][value="bang"]'); await p.waitForTimeout(200);
t('axa „secunde de la Big Bang”: liniar dezactivat, rămâne logaritmică', (await p.$eval('input[name="cmp-scale"][value="lin"]', e => e.disabled)) && (await p.isChecked('input[name="cmp-scale"][value="log"]')) && /logarithmic scale/.test(await p.textContent('#cmp-svg')));
// viitor liniar
await p.check('input[name="cmp-mode"][value="future"]'); await p.check('input[name="cmp-scale"][value="lin"]'); await p.waitForTimeout(200);
t('viitor liniar: evenimente 2027–2100 vizibile, axa „linear scale”', (await vis()).length > 10 && /linear scale/.test(await p.textContent('#cmp-svg')), (await vis()).length);
await p.check('input[name="cmp-scale"][value="log"]'); await p.check('input[name="cmp-mode"][value="past"]'); await p.waitForTimeout(200);
t('revenire la logaritmic: același număr de evenimente ca la început', (await vis()).length === nLog, [(await vis()).length, nLog]);
// surse
const src = await p.evaluate(() => { const E = HZ_CMP.events(); return E.map(e => ({era: e.era, t: e.title, has: !!HZ_CMP.sources()[e.title]})); });
t('sursele există doar pentru evenimente din trecut (era p*) și titlurile se potrivesc', Object.keys(await p.evaluate(() => HZ_CMP.sources())).every(k => src.some(s => s.t === k && /^p\d$/.test(s.era))));
t('25 de evenimente au sursă, restul de 1 din trecut (Revoluția științifică) e marcat „de verificat”', src.filter(s => s.has).length === 25 && src.filter(s => /^p\d$/.test(s.era) && !s.has).length === 1, [src.filter(s => s.has).length]);
// afișarea în detaliu din cronologie
const iBB = await p.evaluate(() => HZ_CMP.events().findIndex(e => e.title === 'Big Bang-ul'));
await p.click('#cmp-svg .cmp-ev[data-i="' + iBB + '"]').catch(async () => { await p.dispatchEvent('#cmp-svg .cmp-ev[data-i="' + iBB + '"]', 'click'); });
t('detaliu cronologie: „Sources: … Planck 2018 …”', /Sources:.*Planck 2018/.test(await p.textContent('#cmp-detail')), await p.textContent('#cmp-detail'));
const iDark = await p.evaluate(() => HZ_CMP.events().findIndex(e => e.title === 'Revoluția științifică'));
await p.dispatchEvent('#cmp-svg .cmp-ev[data-i="' + iDark + '"]', 'click');
t('detaliu: eveniment fără sursă → „Source not yet added (to be verified)”', /not yet added/.test(await p.textContent('#cmp-detail')), await p.textContent('#cmp-detail'));
// cardul din hartă
const card = await p.evaluate(() => { const E = HZ_CMP.events(); const ev = E.find(e => e.title === 'Extincția dinozaurilor'); return HZ_CMP.card(ev, false); });
t('cardul din hartă conține sursa (Renne 2013), fără HTML injectat', /Renne/.test(card) && /<div class="event-src"><strong>Sources:/.test(card));
// limbi
for (const l of ['ro', 'fr', 'de', 'hu']) { await p.evaluate(x => document.querySelector('[data-lang="' + x + '"]').click(), l); await p.waitForTimeout(150); const lab = await p.textContent('#cmp-l-lin'); t('limba ' + l + ': etichetă „liniar” tradusă = „' + lab + '”', lab.length > 2 && lab !== 'Linear' || l === 'de'); }
await p.evaluate(() => document.querySelector('[data-lang="ro"]').click()); await p.waitForTimeout(200);
t('ro: notă și etichete în română', /Scară/.test(await p.textContent('#cmp-scale-l')) && /Scară logaritmică/.test(await p.textContent('#cmp-scalenote')));
if (process.env.FFF_AXE) { await p.evaluate(fs.readFileSync(process.env.FFF_AXE, 'utf8') + '\n;0'); const v = await p.evaluate(async () => (await axe.run(document, {resultTypes: ['violations']})).violations.map(x => x.id)); t('axe: 0 violări (cu scara liniară)', v.length === 0, v); }
t('fără erori JS', errs.length === 0, errs);
await b.close(); console.log(`\n${ok} ok / ${bad} eșuate`); process.exit(bad ? 1 : 0);
