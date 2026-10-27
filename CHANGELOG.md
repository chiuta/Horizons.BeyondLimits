# Jurnal de modificări — Horizons. Beyond Limits

## 2.1.0 — 2026-10-27

Anterior: v2.0.0. Recenzie 2026-10-27.

- Nou: **scară logaritmică ⇄ liniară** comutabilă în „Cronologie comparativă” pentru axele „ani în urmă” (0 – 13,8 mld.) și „ani de acum” (0 – 10⁶), cu gradații rotunde, zoom, deplasare, export SVG și notă explicativă; pe axa „secunde de la Big Bang” scara rămâne logaritmică (butonul „liniar” e dezactivat, cu explicație). Valorile din hartă nu s-au schimbat.
- Nou: **surse bibliografice** pe cardurile evenimentelor și în detaliul cronologiei, doar pentru cele 10 evenimente din trecut la care sursa a fost verificată pe web la 2026-10-27 (identitatea publicației: titlu, autori, revistă/an sau doi): Planck 2018 VI (Big Bang, radiația fosilă), Bouvier & Wadhwa 2010 (Sistemul Solar), Canup & Asphaug 2001 (Luna), Lyons et al. 2014 (Marea Oxidare), ICS International Chronostratigraphic Chart 2024/12 (Cambrian), Renne et al. 2013 (extincția dinozaurilor), Hublin et al. 2017 (Homo sapiens), NASA Apollo 11, CERN „A short history of the Web”. Celelalte 16 evenimente din trecut afișează „Sursă încă neadăugată (de verificat)”; nu s-a inventat nicio sursă.
- „Stare: stabil”, „Offline: complet” în README (EN/RO).
- Teste noi: `tests/scara-surse.test.mjs` (22 de verificări: scară liniară/logaritmică, poziții proporționale, zoom, dezactivare pe axa Big Bang, viitor liniar, surse, 8 limbi, axe, 0 rețea); `cronologie-comparativa` (43) și `fff-r8` (36) trec.
- Hash-urile CSP recalculate; versiunea aliniată (`app.json`, `fff-info`, `sw.js`, subsol).

Nu s-a implementat:
- Surse pentru restul de 16 evenimente din trecut și pentru cele 65 de viitor: nu au fost verificate; evenimentele viitoare sunt predicții/scenarii, nu fapte cu sursă unică.
- Etichetele noi ale scării: traduse în 8 limbi (fr/it/es/pt/de/hu automate, neverificate nativ); notele lungi doar în română și engleză (celelalte limbi arată engleza). README-urile FR/IT/ES/PT/DE/HU nu au fost actualizate.
