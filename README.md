# 📐 Mathématiques *vivantes* dans vos pages web

> **TikZJax · tkz-tab · PGFPlots · MathJax 3** — Tout ce que LaTeX sait dessiner, directement dans le navigateur, sans serveur, sans compilation.

<div align="center">

[![Licence libre](https://img.shields.io/badge/licence-libre-gold?style=flat-square)](LICENSE)
[![LaTeX via WebAssembly](https://img.shields.io/badge/LaTeX-WebAssembly-blueviolet?style=flat-square&logo=latex)](https://github.com/rod2ik/tikzjax)
[![MathJax 3](https://img.shields.io/badge/MathJax-3.x-0072b1?style=flat-square)](https://www.mathjax.org)
[![TikZJax fork](https://img.shields.io/badge/TikZJax-fork%20%40rod2ik-8b5cf6?style=flat-square)](https://github.com/rod2ik/tikzjax)
[![Niveau lycée / CPGE](https://img.shields.io/badge/niveau-Lyc%C3%A9e%20%2F%20CPGE-teal?style=flat-square)]()
[![Testé VS Code Live Server](https://img.shields.io/badge/testé-Live%20Server%20VSCode-007acc?style=flat-square&logo=visualstudiocode)]()

</div>

---

## 🎯 À propos

Ce dépôt contient une **page de démonstration complète** (`index.html`) destinée aux **enseignants de mathématiques** du secondaire et du supérieur. Elle illustre comment intégrer des figures mathématiques de qualité LaTeX dans n'importe quelle page web statique — sans back-end, sans dépendance externe à exécuter côté serveur.

Toute la compilation TikZ se fait **dans le navigateur** via le fork [TikZJax @rod2ik](https://github.com/rod2ik/tikzjax) (WebAssembly). Les formules sont rendues par **MathJax 3**. Les deux cohabitent sans aucun conflit.

> **Ce dépôt est le résultat d'un processus de débogage rigoureux** : chaque règle de compatibilité documentée ci-dessous a été découverte et validée expérimentalement, bloc par bloc, sur 15 figures réelles.

---

## ✨ Ce que vous pouvez faire

| Fonctionnalité | Package |
|---|---|
| Tableaux de variations et de signes | `tkz-tab` |
| Courbes, tangentes, aires sous la courbe | `TikZ` core |
| Courbes paramétriques et polaires | `TikZ` core |
| Histogrammes, nuages de points, régression | `pgfplots` |
| Géométrie plane (triangles, cercles, angles, hachures, accolades) | `TikZ` + `angles` + `patterns` + `decorations` |
| Cercle trigonométrique avec valeurs remarquables | `TikZ` core |
| Loi normale, zones de rejet | `pgfplots` |
| Arbres de probabilités | `trees` |
| Graphes pondérés (Dijkstra, etc.) | `TikZ` + `positioning` |
| Diagrammes commutatifs, suites exactes | `tikz-cd` |
| Figures en 3D (repères, vecteurs, plans) | `tikz-3dplot` |
| Automates finis déterministes | `automata` |
| Formules inline et centrées | `MathJax 3 + AMS` |

---

## 🗂 Structure du dépôt

```
.
├── index.html           # Page de démonstration complète (10 chapitres, 15 figures)
├── tikzjax.js           # Moteur TikZJax — point d'entrée JS (fork @rod2ik)
├── run-tex.js           # Worker WebAssembly TeX
├── core.dump.gz         # Dump du format LaTeX compilé (~2.8 Mo)
├── tex.wasm.gz          # Binaire WebAssembly de TeX (~120 Ko)
├── fonts.css            # Feuille de style des polices mathématiques TeX
├── fonts/               # Polices mathématiques WOFF2 (Computer Modern)
└── tex_files/           # Packages TikZ/LaTeX compilés
    ├── tkz-tab.sty.gz
    ├── pgfplots.sty.gz
    ├── tikz-3dplot.sty.gz
    ├── tikzlibraryautomata.code.tex.gz
    ├── tikzlibrarypatterns.code.tex.gz
    └── ...              # ~60 packages disponibles
```

> ⚠️ **Tous ces fichiers doivent résider dans le même dossier que votre HTML.** TikZJax localise ses assets via `document.currentScript.src` — un CDN externe ne fonctionnera pas (CORS).

---

## 🚀 Démarrage rapide

> ⚠️ **Le protocole `file://` est bloqué** par les navigateurs pour les requêtes WebAssembly (CORS). Un serveur HTTP local est obligatoire.

### Option 1 — VS Code · Live Server *(recommandé)*

```bash
# 1. Cloner le dépôt
git clone https://github.com/darksathili-jpg/latex_tikz.git

# 2. Ouvrir dans VS Code
code latex_tikz

# 3. Installer l'extension Live Server si besoin
# 4. Clic droit sur demo_maths.html → "Open with Live Server"
```

### Option 2 — Python (aucune installation requise)

```bash
git clone https://github.com/darksathili-jpg/latex_tikz.git
cd latex_tikz
python3 -m http.server 8080
# → http://localhost:8080/index.html
```

### Option 3 — Node.js

```bash
npx serve .
# → http://localhost:3000/index.html
```

---

## 🧩 Intégrer TikZJax dans votre propre page

Copiez l'ensemble des fichiers du dépôt dans votre projet, puis ajoutez dans le `<head>` :

```html
<!-- Polices mathématiques TeX (Computer Modern) -->
<link rel="stylesheet" href="fonts.css">

<!-- Moteur TikZJax (fork @rod2ik — inclut tkz-tab, pgfplots, tikz-3dplot...) -->
<script src="tikzjax.js"></script>

<!-- (Optionnel) MathJax 3 pour les formules inline/centrées -->
<script>
  MathJax = {
    tex: {
      inlineMath: [['\\(','\\)']],
      displayMath: [['\\[','\\]']],
      packages: {'[+]': ['ams']}
    }
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
```

### Écrire une figure TikZ

```html
<script type="text/tikz">
  \begin{tikzpicture}
    \draw[thick,->] (-3,0) -- (3,0) node[right] {$x$};
    \draw[thick,->] (0,-1.5) -- (0,2) node[above] {$y$};
    \draw[blue,domain=-2.5:2.5,samples=120,thick]
      plot (\x, {(\x)^2 - 1});
    \fill[red] (0,-1) circle (2pt) node[right] {min};
  \end{tikzpicture}
</script>
```

### Activer un package supplémentaire

L'attribut `data-tex-packages` prend un objet JSON. Les packages disponibles sont dans `tex_files/`.

```html
<!-- tkz-tab -->
<script type="text/tikz" data-tex-packages='{"tkz-tab": ""}'>
  \begin{tikzpicture}
    \tkzTabInit[lgt=3, espcl=2.5]
      {$x$ / 1, $f'(x)$ / 1, $f(x)$ / 2}
      {$-\infty$, $0$, $+\infty$}
    \tkzTabLine{, -, z, +, }
    \tkzTabVar{+/$+\infty$, -/$-4$, +/$+\infty$}
  \end{tikzpicture}
</script>

<!-- pgfplots -->
<script type="text/tikz" data-tex-packages='{"pgfplots": ""}'>
  \begin{tikzpicture}
    \begin{axis}[width=7cm, height=5cm, grid=major]
      \addplot[blue,thick,domain=-3:3,samples=100]
        {exp(-x^2/2)/sqrt(2*pi)};
    \end{axis}
  \end{tikzpicture}
</script>

<!-- tikz-3dplot -->
<script type="text/tikz" data-tex-packages='{"tikz-3dplot": ""}'>
  \tdplotsetmaincoords{65}{125}
  \begin{tikzpicture}[tdplot_main_coords]
    \draw[->] (0,0,0)--(2,0,0) node[right]{$x$};
    \draw[->] (0,0,0)--(0,2,0) node[right]{$y$};
    \draw[->] (0,0,0)--(0,0,2) node[above]{$z$};
  \end{tikzpicture}
</script>
```

### Formules avec MathJax

```html
<!-- Inline -->
<p>La dérivée de \( f(x) = x^2 \) est \( f'(x) = 2x \).</p>

<!-- Centrée -->
\[ \int_a^b f(x)\,\mathrm{d}x = \Big[F(x)\Big]_a^b \]

<!-- Matrice -->
\[ A^{-1} = \frac{1}{\det A}\,\mathrm{com}(A)^{\top} \]
```

---

## 📖 Contenu de la démo

La page `index.html` est structurée en **10 chapitres, 15 figures validées** :

```
00 · Installation          — structure des fichiers, serveur local, syntaxe de base
01 · Tableaux de variations — tkz-tab : polynômes, discontinuités, valeurs intermédiaires
02 · Tableaux de signes    — produit de facteurs, valeurs interdites
03 · Courbes & fonctions   — courbe + tangente + aire, courbe paramétrique, polaire
04 · Géométrie plane       — triangle coté + angles + hachures, cercle trigonométrique
05 · PGFPlots & stats      — histogramme, nuage de points + droite de régression
06 · Graphes & arbres      — arbre de probabilités, graphe pondéré (Dijkstra)
07 · Diagrammes commutatifs — suite exacte courte + carré commutatif
08 · Probabilités          — loi normale N(0,1), zones de rejet bilatéral (95%)
09 · Figures 3D            — repère 3D, plan, vecteur avec projeté
10 · Formules MathJax      — formulaire de référence Terminale/CPGE + automate fini
```

Chaque figure présente côte à côte le **rendu graphique SVG** et le **code LaTeX** avec coloration syntaxique et bouton de copie.

---

## 🛠 Packages TikZ disponibles

| Package / Librairie | Usage |
|---|---|
| `tkz-tab` | Tableaux de variations et de signes |
| `pgfplots` | Courbes, histogrammes, fonctions, stats |
| `tikz-cd` | Diagrammes commutatifs |
| `automata` | Automates finis (DFA, NFA) |
| `mindmap` | Cartes mentales |
| `patterns` | Hachures et remplissages géométriques |
| `intersections` | Calcul d'intersections de courbes |
| `decorations.pathreplacing` | Accolades cotées (`\brace`) |
| `decorations.markings` | Flèches sur chemin |
| `angles` + `quotes` | Marquage d'angles avec arc et label |
| `tikz-3dplot` | Repères et figures en 3D |
| `positioning` | Placement relatif de nœuds (`right of=`) |
| `trees` | Arbres (probabilités, arbres binaires) |
| `graphs` | Graphes (théorie des graphes) |

---

## ⚠️ Règles de compatibilité TikZJax

> Ces règles ont été établies **expérimentalement** sur ce projet. TikZJax compile du TeX via WebAssembly dans un environnement contraint — certaines constructions valides en LaTeX standard provoquent silencieusement l'erreur `Could not find file input.dvi`.

### 🔴 Interdits — provoquent une erreur de compilation

| Construction | Problème | Solution |
|---|---|---|
| Caractères accentués dans `<script type="text/tikz">` | Le moteur TeX embarqué est 7 bits ASCII uniquement | Utiliser les commandes LaTeX : `\'e` `\`a` `\^o` `\c{c}` |
| `\tfrac{}{}` | Commande non disponible dans cet environnement TeX | Utiliser `\frac{}{}` ou la notation inline `$a/b$` |
| `\frac` répété plus de ~6 fois dans un même bloc | Dépasse la capacité mémoire du moteur WebAssembly | Préférer la notation inline `$\pi/6$`, `$2\pi/3$`... |
| `\node (0)`, `\node (1)` | Identifiants numériques réservés par pgf (coordonnées) | Renommer en `(Oz)`, `(Un)`, `(nA)`... |
| `node/.style={...}` | `node` est un mot-clé réservé TikZ | Renommer le style : `sommet/.style`, `noeud/.style`... |
| `\foreach \a/\lbl in {...\frac...}` | Le parseur TikZ ne gère pas les `{}` imbriqués comme séparateur `/` dans les listes | Séparer le `\foreach` des `\node` de labels |

### 🟡 À surveiller

| Construction | Comportement |
|---|---|
| `\foreach \a in {...}` avec `({cos(\a)},{sin(\a)})` | Peut planter selon la version — préférer des coordonnées précalculées numériquement |
| Blocs très longs (>80 lignes) | Risque de timeout WebAssembly — découper en plusieurs blocs |
| `every node/.style` | ✅ Valide — différent de `node/.style` |
| `$A'$`, `$A''$` | ✅ Valide hors `tikz-cd` — utiliser `$A^{\prime}$` en cas de doute |
| `\circlearrowleft`, `\circlearrowright` | ⚠️ Symboles AMS parfois absents — tester ou remplacer |

### ✅ Constructions validées

```latex
% Coordonnées calculées dans plot — OK
\draw[blue] plot[domain=0:3, samples=80] (\x, {0.3*\x*\x});

% foreach simple sur des valeurs numériques — OK
\foreach \x in {1,2,3} { \draw (\x,2pt)--(\x,-2pt); }

% Couleurs pgf standard — toutes OK
blue red green teal purple orange gray black white
blue!40 red!20 teal!30   % mélanges OK

% Librairies via \usetikzlibrary — OK (pas besoin de data-tex-packages)
\usetikzlibrary{angles, quotes, patterns, decorations.pathreplacing,
                automata, positioning, trees}

% MathJax + TikZJax dans la même page — aucun conflit
```

---

## 💡 Bonnes pratiques pédagogiques

- **Un bloc = une figure** : ne pas entasser plusieurs `tikzpicture` dans un même `<script>`. La compilation est parallélisée par bloc, et les erreurs sont isolées.
- **Tester en isolation** : en cas d'erreur `Could not find file input.dvi`, créer une page de test avec le bloc seul — la console indique l'ordre d'échec.
- **Méthode de bisection** : réduire le bloc au minimum qui plante (moitié du code, puis moitié encore) pour identifier la ligne fautive.
- **Notation inline pour les angles** : préférer `$\pi/6$` à `$\frac{\pi}{6}$` dans les labels du cercle trigonométrique — plus léger et garanti compatible.
- **Coordonnées précalculées** : pour un cercle trigonométrique, précalculer `cos`/`sin` en Python et écrire les valeurs numériques directement dans le HTML.
- **MathJax pour les formules, TikZ pour les figures** : MathJax gère parfaitement les matrices, intégrales, systèmes — ne pas les mettre dans TikZ inutilement.
- La densité de `N(μ, σ)` en pgfplots : `exp(-(x-mu)^2/(2*s^2))/(s*sqrt(2*pi))`.
- Les angles de vue 3D : `\tdplotsetmaincoords{élévation}{azimut}` — `{65}{125}` donne une vue isométrique lisible.

---

## 🏗 Architecture technique

```
Navigateur
    │
    ├─ tikzjax.js          ← détecte les <script type="text/tikz">
    │       │                 charge les assets via document.currentScript.src
    │       ▼
    ├─ run-tex.js          ← Web Worker — isole la compilation TeX
    │       │
    │       ├─ tex.wasm.gz ← binaire WebAssembly du moteur TeX
    │       ├─ core.dump.gz← format LaTeX préchargé (plain TeX + pgf)
    │       └─ tex_files/  ← packages chargés à la demande via data-tex-packages
    │
    └─ Résultat            ← SVG injecté dans le DOM à la place du <script>
```

**Pourquoi serveur local obligatoire ?** : `run-tex.js` est chargé comme Web Worker. Les navigateurs bloquent les Workers et les fichiers `.wasm` chargés depuis `file://` (politique CORS). Un serveur HTTP, même `python3 -m http.server`, lève cette restriction.

---

## 🏫 Origine & licence

Développé et testé au **Lycée Antoine Watteau — Valenciennes** (académie de Lille).  
Moteur TikZJax : fork [@rod2ik](https://github.com/rod2ik/tikzjax) — version `1.0.0-beta32`.

> Distribué librement — réutilisation et adaptation encouragées pour tout usage éducatif.

---

## 🤝 Contribuer

Les contributions sont les bienvenues : nouvelles figures, corrections de compatibilité, packages supplémentaires.

```bash
# 1. Forker ce dépôt
# 2. Créer une branche
git checkout -b feat/mon-exemple

# 3. Commiter
git commit -m 'feat: ajouter demo tkz-euclide'

# 4. Ouvrir une Pull Request
```

**Avant de soumettre une PR** : vérifier que votre bloc TikZ respecte les règles de compatibilité du tableau ci-dessus, et tester dans un fichier de test isolé via Live Server.

---

<div align="center">
  <sub>TikZJax fork @rod2ik · MathJax 3 · PGFPlots · tkz-tab<br>
  Lycée Antoine Watteau — Valenciennes — DarkSATHI Li</sub>
</div>
