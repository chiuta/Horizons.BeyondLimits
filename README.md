# Horizons. Beyond Limits

O hartă a timpului, de la Big Bang până la sfârșitul Universului: 91 de evenimente, 8 domenii, 12 ere.

**Versiune:** 1.0.0 · **Ultima actualizare:** 12 octombrie 2026

**Live:** https://chiuta.github.io/Horizons.BeyondLimits/

![Captura de ecran](screenshot.png)

## Ce este

Horizons. Beyond Limits este o aplicație HTML dintr-un singur fișier care combină ce se știe cu o certitudine rezonabilă despre trecut cu predicții despre viitor, fiecare cu propriul nivel de încredere. Pe lângă harta principală, oferă ramuri alternative, o spirală a timpului 2D/3D și secțiuni despre natura Universului, paradoxuri și viața dincolo de Pământ, prezentate ca scenarii concurente, nu ca răspunsuri. Aplicația indică drept model declarat futuretimeline.net, un proiect similar în limba engleză; conținutul de aici este original.

## Funcții

- Harta timpului: 91 de evenimente, 8 domenii, 12 ere; alegerea unei ere și carduri cu detalii.
- Buton „🎲 Show me a random future" (un viitor la întâmplare).
- „Alternate Branches": traiectorii alternative, unele reconectate la harta principală.
- „The Time Spiral": spirala timpului în vizualizare 2D sau 3D (tragere, zoom, atingerea unui nod), cu „Reset view".
- „The Nature and Purpose of the Universe": scenarii, anti-scenarii, non-scenarii și imposibilități, cu filtre.
- „Paradoxes", „Life Beyond Earth and Advanced Civilizations", „Thematic Trails" și „Glossary".
- **Export Markdown:** butonul „⬇ Export the map (.md)” (tradus în cele 7 limbi) descarcă toate cele 91 de evenimente, pe ere, în limba curentă și respectând filtrul de domenii activ, cu avertismentul de speculație la final; fișierul se generează local în browser. Conținutul evenimentelor există doar în română și engleză; în celelalte limbi fișierul păstrează textul românesc, ca și harta.
- **Tipărire:** foi de stil pentru imprimare (fundal alb, text negru, fără bara de navigare, controale sau stele; cardurile nu se rup între pagini). Se tipărește era selectată, plus secțiunile de scenarii, paradoxuri și glosar; pentru toată harta folosește exportul Markdown.
- Scurtătură: `/` mută focusul în câmpul de căutare.
- Căutare, temă luminoasă/întunecată (buton ☀) și interfață în 7 limbi: English, Română, Français, Italiano, Español, Português, Deutsch.
- Navigare cu tastatura în meniul de limbă și în file (săgeți, Home, End, Enter, Spațiu, Esc).

## Manual de utilizare

1. Alege limba din meniul de limbă (English, Română etc.).
2. Apasă „Explore the map ↓" sau „🎲 Show me a random future" pentru a începe.
3. Alege o eră din „The scale of time" și deschide un card pentru detalii.
4. Folosește linkurile „→ Timeline", „→ Alternate Branches", „→ 3D Spiral", „→ Nature of the Universe", „→ Paradoxes", „→ Life Beyond Earth", „→ Thematic Trails", „→ Glossary" pentru a sări între secțiuni.
5. În spirală comută între 2D și 3D; în 3D trage și mărește, iar „Reset view" readuce vederea.
6. În secțiunea despre Univers filtrează cu All / Scenarios / Anti-scenarios / Non-scenarios / Impossibilities.
7. Comută tema cu butonul ☀ / ☾.
8. Meniuri și file: săgeți, Home/End, Enter sau Spațiu pentru activare, Esc pentru închidere.

## Confidențialitate și rețea

- Pagina are o politică CSP (`default-src 'none'`, script permis doar prin hash `sha256`, fără `'unsafe-inline'` la scripturi; stiluri inline, imagini `data:`), fără conexiuni către alte gazde.
- Aplicația nu folosește `localStorage`, `sessionStorage` sau IndexedDB și nu face cereri de rețea (fără `fetch`, CDN sau scripturi externe); alegerile de limbă și temă nu se rețin între vizite.
- Conține doar link-uri, deschise la click, către futuretimeline.net, Patreon și Buy Me a Coffee.

## Avertisment

Ficțiune / speculație: hărțile viitorului sunt extrapolări și speculații, nu predicții validate. Predicțiile pe decenii apropiate extrapolează tendințe actuale; cele pentru milenii și ere îndepărtate sunt speculative, iar secțiunile despre natura Universului și viața dincolo de Pământ prezintă cadre explicative concurente (fizică de frontieră, filozofie, teologie, ficțiune; „Dark Forest” provine dintr-un roman SF). Aceeași precizare apare în subsolul aplicației. Conținut educațional/informativ; nu înlocuiește surse științifice de referință.

## Rulare locală / offline

Descarcă `index.html` și deschide-l în browser; nu necesită internet. Imaginile `og-image*.png` din repository servesc doar previzualizării la distribuire.

## Licență

Licența nu este încă declarată explicit în acest repository; vezi nota din aplicație. Aplicația se descrie ca „Free, offline, single-file, no tracking" și nu declară o licență anume.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## English summary

Horizons. Beyond Limits is a single-file HTML map of time from the Big Bang to the end of the universe: 91 events, 8 domains, 12 eras, alternate branches, a 2D/3D time spiral, and sections on the nature of the universe, paradoxes and life beyond Earth. 7 UI languages. It stores nothing and makes no network requests; it only links to futuretimeline.net (its stated model), Patreon and Buy Me a Coffee.

## Audit

Audit: 2026-10-10 — claimul „fără rețea / fără storage” verificat (0 `fetch`/XHR/WebSocket, 0 `localStorage`; singurele URL-uri sunt linkuri `<a>` și meta OG). Corectat contrastul culorilor, în special în tema luminoasă (accentele erelor, text secundar), verificat cu axe în ambele teme, desktop și mobil. Licența rămâne nedeclarată.

## Istoric / Changelog

- 1.0.0 — 2026-10-12: versiunea și data ultimei actualizări sunt afișate în aplicație
- **11 octombrie 2026** (runda 7) — butoanele de copiere au zonă de atingere de minimum 28×28 px (înainte 18×14, 104 de ținte sub 24 px la 360 px); „Arată-mi un viitor la întâmplare” (și salturile din linkuri) evidențiază cardul ales mai puternic și mai mult timp (3,6 s) și îi mută focusul; legenda spiralei are înălțime minimă de 28 px; 0 erori, axe 0 violări la 1280×800 și 360×740.
- **11 octombrie 2026** — export Markdown al hărții (filtrat după domeniu, în limba curentă), foi de stil pentru tipărire, scurtătura `/` pentru căutare, CSP cu hash pentru script (fără `'unsafe-inline'` la `script-src`); testat cu CSP activ (0 erori, axe-core 0 violări la 1280×800 și 360×740).
- **11 octombrie 2026** — etichetele de dată („acum 4,5 mld. ani”, „1 milion de ani” etc.) sunt acum localizate în toate cele 7 limbi (înainte apăreau în română și în interfața engleză); meniul ☰ se închide după alegerea limbii/temei, la Enter în căutare, la click în afară sau Esc; notificările de realizări sunt mutate deasupra butonului ♥, limitate la două, se închid la click și mai repede; textul „status” al scenariilor nu mai depășește ecranul de 360 px.
- Accesibilitate și securitate: conținutul este încadrat într-un singur reper `main` (un singur banner), subsolul și panourile auxiliare sunt în repere; a fost adăugat un meta CSP. axe-core: 0 violări la 1280×800 și 360×740. Aplicația nu are număr de versiune.
