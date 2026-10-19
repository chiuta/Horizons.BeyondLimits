// Horizons 1.2.0 — „↗ TerRa” pe cardul Apollo 11. Copiat în Horizons.BeyondLimits/tests/terra-bridge.test.mjs. Rulare: node terra-bridge.test.mjs <dirHorizons> <dirTerRa>
import {createRequire} from "module"; const require = createRequire("/opt/node-tools/package.json"); const {chromium} = require("playwright");
let fails = 0, passes = 0; const check = (n, c, x) => { c ? (passes++, console.log("  ok  " + n)) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x) : ""))); };
const [dH, dT] = process.argv.slice(2);
const b = await chromium.launch({executablePath: "/opt/pw-browsers/chromium"});
const mk = async (loc) => { const ctx = await b.newContext({viewport: {width: 1280, height: 900}, locale: loc || "ro-RO"}); const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); }); const p = await ctx.newPage(); p.errs = []; p.net = net; p.on("pageerror", e => p.errs.push(String(e))); return p; };
const p = await mk(); await p.goto("file://" + dH + "/index.html#primii-oameni-pe-luna"); await p.waitForTimeout(4200);
const L = () => p.evaluate(() => [...document.querySelectorAll("a.event-bridge")].map(a => ({h: a.getAttribute("href"), t: a.textContent, rel: a.rel, tg: a.target})));
let l = await L();
check("exact un link, pe cardul Apollo 11", l.length === 1, l);
check("href exact (#v=2d&t=…Z&from=horizons-beyondlimits)", l[0] && l[0].h === "https://chiuta.github.io/TerRa/#v=2d&t=1969-07-20T20:17:40Z&from=horizons-beyondlimits", l[0] && l[0].h);
check("_blank + noopener", l[0] && l[0].tg === "_blank" && /noopener/.test(l[0].rel));
check("card = Apollo (link în .event-card cu titlul corect)", await p.evaluate(() => /Primii oameni pe Lună|First Humans on the Moon/.test(document.querySelector("a.event-bridge").closest(".event-card").textContent)));
// 7 limbi: textul se schimbă și nu rămâne cheia/undefined
const txts = {};
for (const lg of ["ro", "en", "fr", "it", "es", "pt", "de"]) { await p.evaluate(lg => { document.getElementById("lang-toggle").click(); document.querySelector(`#lang-list-hero li[data-lang="${lg}"]`).click(); }, lg); await p.waitForTimeout(900); txts[lg] = (await L())[0]?.t; }
check("text în toate cele 7 limbi, distinct și fără 'undefined'", Object.values(txts).every(x => x && !/undefined/.test(x)) && new Set(Object.values(txts)).size === 7, txts);
// pe alt eveniment nu există link
const cnt = await p.evaluate(() => { document.querySelectorAll("a.event-bridge").length; return [...document.querySelectorAll(".event-card")].filter(c => c.querySelector("a.event-bridge")).length; });
check("doar cardul Apollo are link (celelalte nu)", cnt <= 1, cnt);
check("0 erori / 0 rețea", p.errs.length === 0 && p.net.length === 0, [p.errs, p.net]);
// ținta: TerRa încarcă 2D la acel moment, în pauză
const q = await mk(); await q.goto("file://" + dT + "/index.html#v=2d&t=1969-07-20T20:17:40Z&from=horizons-beyondlimits"); await q.waitForTimeout(2500);
const st = await q.evaluate(() => ({iso: state.simTime.toISOString(), paused: state.paused, mode: state.mode}));
check("TerRa: 1969-07-20T20:17:40Z, 2D, în pauză", st.iso === "1969-07-20T20:17:40.000Z" && st.paused === true && st.mode === "2d", st);
check("TerRa: buton „← înapoi” spre Horizons (fromBack)", await q.evaluate(() => !!document.querySelector("#fff-back, [id*=back] a, a[href*='Horizons.BeyondLimits']")));
await b.close(); console.log(`\n${passes} reușite, ${fails} eșuate`); process.exit(fails ? 1 : 0);
