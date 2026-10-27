# Jurnal de modificări — Horizons. Beyond Limits

## 2.2.0 — 2026-10-27

Anterior: v2.1.0. Recenzie 2 (2026-10-27).

- Nou: **surse bibliografice pentru încă 15 dintre cele 16 evenimente din trecut** rămase fără sursă (acum 25 din 26 au): Guth 1981 (inflația), Cyburt et al. 2016 (nucleosinteza primordială), Barkana & Loeb 2001 (epoca întunecată), Rubin & Ford 1970 și Riess et al. 1998 (materia/energia întunecată), Bromm & Larson 2004 (primele stele), Robertson et al. 2023 (primele galaxii, JWST), Burbidge et al. 1957 (elementele grele), Gomes et al. 2005 (bombardamentul greu târziu), Dodd et al. 2017 (primele forme de viață), Zaremba-Niedzwiedzka et al. 2017 (celula eucariotă), Mallick et al. 2016 (ieșirea din Africa), Zeder 2011 (agricultura), Woods (ed.) 2010 (scrisul), Allen 2009 (revoluția industrială), Waters et al. 2016 + declarația IUGS din 20.03.2024 (Antropocenul, respins ca epocă formală). Toate verificate pe web (titlu, autori, revistă/an, DOI) la 2026-10-27; text simplu, fără linkuri, nimic nu se încarcă din rețea.
- Test `scara-surse` actualizat (25 cu sursă, 1 fără).

Nu s-a implementat:
- Sursă pentru „Revoluția științifică”: nu a putut fi verificată (pagina de referință nu a fost accesibilă), deci rămâne „Sursă încă neadăugată (de verificat)”. Cele 65 de evenimente viitoare sunt predicții/scenarii, fără sursă unică.
- Sursele sunt referințe generale pentru eveniment; nu au fost confruntate cu fiecare cifră din descrierile cardurilor.

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
