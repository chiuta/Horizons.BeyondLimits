# Horizons. Beyond Limits

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 1.2.0 · **Dernière mise à jour :** 2026-10-19

Une carte du temps, du Big Bang à la fin de l'Univers : 91 événements, 8 domaines, 12 ères.

**En ligne :** https://chiuta.github.io/Horizons.BeyondLimits/

![Capture d'écran](screenshot.png)

## De quoi s'agit-il

Horizons. Beyond Limits est une application HTML en un seul fichier qui associe ce que l'on sait avec une certitude raisonnable du passé à des prédictions sur l'avenir, chacune avec son propre niveau de confiance. Outre la carte principale, elle propose des branches alternatives, une spirale du temps en 2D/3D et des sections sur la nature de l'Univers, les paradoxes et la vie au-delà de la Terre, présentées comme des scénarios concurrents et non comme des réponses. L'application indique futuretimeline.net, un projet similaire en anglais, comme modèle déclaré ; le contenu ici est original.

## Fonctionnalités

- La carte du temps : 91 événements, 8 domaines, 12 ères ; choix d'une ère et cartes de détail.
- Bouton « 🎲 Show me a random future » (un futur au hasard).
- « Alternate Branches » : trajectoires alternatives, certaines reconnectées à la carte principale.
- « The Time Spiral » : la spirale du temps en vue 2D ou 3D (glisser, zoom, toucher un nœud), avec « Reset view ».
- « The Nature and Purpose of the Universe » : scénarios, anti-scénarios, non-scénarios et impossibilités, avec filtres.
- « Paradoxes », « Life Beyond Earth and Advanced Civilizations », « Thematic Trails » et « Glossary ».
- **Export Markdown :** le bouton « ⬇ Export the map (.md) » (traduit dans les 7 langues) télécharge les 91 événements, par ère, dans la langue courante et en respectant le filtre de domaines actif, avec l'avertissement de spéculation à la fin ; le fichier est généré localement dans le navigateur. Le contenu des événements n'existe qu'en roumain et en anglais ; dans les autres langues, le fichier conserve le texte roumain, comme la carte.
- **Impression :** feuilles de style d'impression (fond blanc, texte noir, sans barre de navigation, commandes ni étoiles ; les cartes ne se coupent pas entre les pages). L'ère sélectionnée est imprimée, ainsi que les sections de scénarios, de paradoxes et de glossaire ; pour toute la carte, utilisez l'export Markdown.
- Raccourci : `/` place le focus dans le champ de recherche.
- Recherche, thème clair/sombre (bouton ☀) et interface en 7 langues : English, Română, Français, Italiano, Español, Português, Deutsch.
- Navigation au clavier dans le menu des langues et dans les onglets (flèches, Début, Fin, Entrée, Espace, Échap).

## Nouveautés (1.1.0)

- **Export CSV** (bouton « ⬇ Export the map (.csv) », à côté de l'export Markdown) : les mêmes événements, dans le même ordre et avec le même filtre de domaine que l'export Markdown, dans la langue courante ; colonnes : ère, domaine, date, confiance, titre, description (l'en-tête est traduit). UTF-8 avec BOM (s'ouvre correctement dans Excel/LibreOffice), séparateur virgule, les cellules qui commenceraient par `=`, `+`, `-` ou `@` sont préfixées d'une apostrophe (protection contre les formules). Le contenu des événements n'existe qu'en roumain et en anglais (comme pour Markdown).
- **Code QR sur les cartes** (bouton ▦ à côté de ⧉ sur les événements, branches et scénarios) : le code contient l'adresse publique (`https://chiuta.github.io/Horizons.BeyondLimits/`, ou celle de la page courante si elle est servie en HTTPS) plus le lien permanent `#titre-de-la-carte`, que l'application résout à l'ouverture (déjà existant). L'adresse peut aussi être copiée. Généré localement ; n'apparaît qu'avec le module QR.
- **Recherche locale tolérante aux fautes** (sans réseau, module `search` de fff-kit) : s'il n'y a aucune correspondance exacte (la recherche existante, par sous-chaîne, reste inchangée), jusqu'à 6 correspondances proches s'affichent d'après les mots et l'orthographe (BM25, formes de mots, lettres manquantes/changées), avec une mention claire qu'elles ne sont pas exactes. P. ex. « Big Bangul », « nucleosynthesys ». C'est une recherche lexicale, **pas** une compréhension sémantique : elle ne trouve pas de synonymes dont l'orthographe est différente. L'index est construit au premier besoin (RO ou EN selon la langue courante ; en FR/IT/ES/PT/DE, le contenu reste le contenu roumain).
- **Transparence** (en appuyant sur la version dans le pied de page) : réseau (0 requête externe), stockage (aucune clé), fichier avec SHA-256.
- Impression : les nouveaux boutons sont masqués dans la feuille de style d'impression.

Les nouveaux textes sont dans les 7 langues de l'application (RO, EN, FR, IT, ES, PT, DE) ; en FR/IT/ES/PT/DE, les traductions sont automatiques, **non vérifiées par des locuteurs natifs**. Le hongrois n'existe pas dans l'application et n'a pas été ajouté partiellement.

## Kit « fff-kit »

Modules collés dans `index.html` : `core`, `label`, `bundle`, `qr`, `search` (~140 ko en plus de l'application). Sans eux, l'application fonctionne de la même manière (testé), mais sans les boutons QR ni les correspondances proches ; l'export CSV reste.

## Tests

`node tests/fff-r8.test.mjs` (Playwright, réseau bloqué ; 36 vérifications) : CSV comparé ligne à ligne avec l'export Markdown existant (titres, descriptions, ordre, filtre), analyseur CSV indépendant, protection contre les formules, QR décodé en retour et son adresse ouverte dans une nouvelle page (la carte apparaît à l'écran), recherche avec fautes en EN/DE, chaîne dénuée de sens (aucun faux résultat), 7 langues, axe-core 0 violation (clair/sombre, boîte de dialogue, résultats proches), 360 px, sans le kit.

## Mode d'emploi

1. Choisissez la langue dans le menu des langues (English, Română, etc.).
2. Appuyez sur « Explore the map ↓ » ou « 🎲 Show me a random future » pour commencer.
3. Choisissez une ère dans « The scale of time » et ouvrez une carte pour les détails.
4. Utilisez les liens « → Timeline », « → Alternate Branches », « → 3D Spiral », « → Nature of the Universe », « → Paradoxes », « → Life Beyond Earth », « → Thematic Trails », « → Glossary » pour passer d'une section à l'autre.
5. Dans la spirale, basculez entre 2D et 3D ; en 3D, faites glisser et zoomez, et « Reset view » rétablit la vue.
6. Dans la section sur l'Univers, filtrez avec All / Scenarios / Anti-scenarios / Non-scenarios / Impossibilities.
7. Changez de thème avec le bouton ☀ / ☾.
8. Menus et onglets : flèches, Début/Fin, Entrée ou Espace pour activer, Échap pour fermer.

## Confidentialité et réseau

- La page a une politique CSP (`default-src 'none'`, script autorisé uniquement par empreinte `sha256`, sans `'unsafe-inline'` pour les scripts ; styles en ligne, images `data:`), sans connexion vers d'autres hôtes.
- L'application n'utilise ni `localStorage`, ni `sessionStorage`, ni IndexedDB et ne fait aucune requête réseau (pas de `fetch`, de CDN ni de scripts externes) ; les choix de langue et de thème ne sont pas conservés entre les visites.
- Elle ne contient que des liens, ouverts au clic, vers futuretimeline.net et Buy Me a Coffee.

## Avertissement

Fiction / spéculation : les cartes du futur sont des extrapolations et des spéculations, non des prédictions validées. Les prédictions sur les décennies proches extrapolent les tendances actuelles ; celles qui portent sur des millénaires et des ères lointaines sont spéculatives, et les sections sur la nature de l'Univers et la vie au-delà de la Terre présentent des cadres explicatifs concurrents (physique de frontière, philosophie, théologie, fiction ; « Dark Forest » vient d'un roman de science-fiction). La même précision figure dans le pied de page de l'application. Contenu éducatif/informatif ; il ne remplace pas les sources scientifiques de référence.

## Utilisation locale / hors ligne

Téléchargez `index.html` et ouvrez-le dans un navigateur ; aucune connexion Internet n'est nécessaire. Les images `og-image*.png` du dépôt ne servent qu'à l'aperçu lors du partage.

## Licence

MIT — voir le fichier `LICENSE`. © 2026 Alexandru-Ionuț Chiuță (Alexio). Les éventuelles bibliothèques tierces incluses dans le fichier conservent leurs propres licences.

## Auteur

Alexio — Alexandru-Ionuț Chiuță, contact : alexio@trom.tf

## Résumé

Horizons. Beyond Limits est une carte du temps en HTML, en un seul fichier, du Big Bang à la fin de l'univers : 91 événements, 8 domaines, 12 ères, des branches alternatives, une spirale du temps 2D/3D, et des sections sur la nature de l'univers, les paradoxes et la vie au-delà de la Terre. Interface en 7 langues. Elle ne stocke rien et ne fait aucune requête réseau ; elle ne comporte que des liens vers futuretimeline.net (son modèle déclaré) et Buy Me a Coffee.

## Audit

Audit : 2026-10-10 — l'affirmation « sans réseau / sans stockage » a été vérifiée (0 `fetch`/XHR/WebSocket, 0 `localStorage` ; les seules URL sont des liens `<a>` et des métadonnées OG). Contraste des couleurs corrigé, en particulier dans le thème clair (accents des ères, texte secondaire), vérifié avec axe dans les deux thèmes, sur ordinateur et mobile. La licence reste non déclarée.

## Historique / Changelog

- **19 octobre 2026 (v1.2.0)** — nouveau : sur la carte « Premiers hommes sur la Lune » (Apollo 11), le lien « ↗ TerRa » ouvre la carte 2D de la Terre au 20 juillet 1969, 20:17:40 UTC (7 langues).

- **14 octobre 2026 (v1.1.0)** — nouveau : export CSV, code QR sur les cartes, recherche locale tolérante aux fautes, fenêtre « Transparence » (fff-kit : core, label, bundle, qr, search) ; `tests/fff-r8.test.mjs`. CSP : empreinte du script recalculée.

- 1.0.0 — 2026-10-12 : la version et la date de la dernière mise à jour sont affichées dans l'application
- **11 octobre 2026** (tour 7) — les boutons de copie ont une zone tactile d'au moins 28×28 px (auparavant 18×14, 104 cibles de moins de 24 px à 360 px) ; « Show me a random future » (et les sauts depuis les liens) mettent en évidence la carte choisie plus fortement et plus longtemps (3,6 s) et lui donnent le focus ; la légende de la spirale a une hauteur minimale de 28 px ; 0 erreur, axe 0 violation à 1280×800 et 360×740.
- **11 octobre 2026** — export Markdown de la carte (filtré par domaine, dans la langue courante), feuilles de style d'impression, raccourci `/` pour la recherche, CSP avec empreinte pour le script (sans `'unsafe-inline'` dans `script-src`) ; testé avec la CSP active (0 erreur, axe-core 0 violation à 1280×800 et 360×740).
- **11 octobre 2026** — les étiquettes de date (« il y a 4,5 milliards d'années », « 1 million d'années », etc.) sont désormais localisées dans les 7 langues (auparavant elles apparaissaient en roumain et dans l'interface anglaise) ; le menu ☰ se ferme après le choix de la langue/du thème, à Entrée dans la recherche, au clic à l'extérieur ou à Échap ; les notifications de réussites sont déplacées au-dessus du bouton ♥, limitées à deux, se ferment au clic et plus vite ; le texte « statut » des scénarios ne dépasse plus l'écran de 360 px.
- Accessibilité et sécurité : le contenu est enveloppé dans un seul repère `main` (une seule bannière), le pied de page et les panneaux auxiliaires sont dans des repères ; une balise meta CSP a été ajoutée. axe-core : 0 violation à 1280×800 et 360×740. L'application n'a pas de numéro de version.

Nouveautés de la 1.1.0 : export CSV de la frise (mêmes filtres que l'export Markdown), un code QR sur chaque carte pointant vers son lien permanent, une recherche locale tolérante aux fautes de « correspondances proches » affichée uniquement lorsque la recherche exacte ne trouve rien (lexicale, non sémantique), et la boîte de dialogue « Transparence ». Les chaînes traduites automatiquement en FR/IT/ES/PT/DE ne sont pas vérifiées par des locuteurs natifs.
