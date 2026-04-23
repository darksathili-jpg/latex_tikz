# 📐 Mathématiques *vivantes* dans vos pages web

> **TikZJax · tkz-tab · PGFPlots · MathJax 3** — Tout ce que LaTeX sait dessiner, directement dans le navigateur, sans serveur, sans compilation.

<div align="center">

[![Licence libre](https://img.shields.io/badge/licence-libre-gold?style=flat-square)](LICENSE)
[![LaTeX via WebAssembly](https://img.shields.io/badge/LaTeX-WebAssembly-blueviolet?style=flat-square&logo=latex)](https://tikzjax.com)
[![MathJax 3](https://img.shields.io/badge/MathJax-3.x-0072b1?style=flat-square)](https://www.mathjax.org)
[![Niveau lycée / CPGE](https://img.shields.io/badge/niveau-Lycée%20%2F%20CPGE-teal?style=flat-square)]()

</div>

---

## 🎯 À propos

Ce dépôt contient une **page de démonstration complète** (`demo_maths.html`) destinée aux **enseignants de mathématiques** du secondaire et du supérieur. Elle illustre comment intégrer des figures mathématiques de qualité LaTeX dans n'importe quelle page web statique — sans back-end, sans dépendance externe à exécuter côté serveur.

Toute la compilation TikZ se fait **dans le navigateur** via [TikZJax](https://github.com/kisonecat/tikzjax) (WebAssembly). Les formules sont rendues par **MathJax 3**. Les deux cohabitent sans aucun conflit.

---

## ✨ Ce que vous pouvez faire

| Fonctionnalité | Package |
|---|---|
| Tableaux de variations et de signes | `tkz-tab` |
| Courbes, histogrammes, nuages de points | `pgfplots` |
| Géométrie plane (triangles, cercles, angles, hachures) | `TikZ` core + `angles` + `patterns` |
| Graphes orientés et non-orientés | `graphs` |
| Arbres de probabilités | `trees` |
| Diagrammes commutatifs (algèbre) | `tikz-cd` |
| Automates finis (NSI / info théorique) | `automata` |
| Cartes mentales | `mindmap` |
| Figures en 3D (repères, vecteurs, plans) | `tikz-3dplot` |
| Courbe de Gauss, zones de rejet | `pgfplots` |
| Formules inline et centrées | `MathJax 3 + AMS` |

---

## 🗂 Structure du dépôt

```
.
├── demo_maths.html      # Page de démonstration complète (10 chapitres)
├── tikzjax.js           # Moteur TikZJax (point d'entrée JS)
├── run-tex.js           # Worker WebAssembly
├── core.dump.gz         # Dump du format LaTeX compilé
├── tex.wasm.gz          # Binaire WebAssembly de TeX
├── fonts.css            # Feuille de style des polices TeX
├── fonts/               # Polices mathématiques (WOFF2)
└── tex_files/           # Packages TikZ inclus (tkz-tab, pgfplots, etc.)
```

---

## 🚀 Démarrage rapide

> ⚠️ **Le protocole `file://` est bloqué** par les navigateurs pour les requêtes WebAssembly (CORS). Un serveur HTTP local est indispensable.

### Option 1 — VS Code · Live Server *(recommandé)*

1. Installez l'extension **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** dans VS Code.
2. Clonez ce dépôt et ouvrez le dossier dans VS Code.
3. Clic droit sur `demo_maths.html` → **Open with Live Server**.

### Option 2 — Python (aucune installation requise)

```bash
git clone https://github.com/<votre-compte>/<ce-repo>.git
cd <ce-repo>
python -m http.server 8080
# Ouvrir http://localhost:8080/demo_maths.html
```

### Option 3 — Node.js

```bash
npx serve .
# Ouvrir http://localhost:3000/demo_maths.html
```

---

## 🧩 Intégrer TikZJax dans votre propre page

Copiez l'ensemble des fichiers du dépôt dans votre projet, puis ajoutez dans le `<head>` :

```html
<!-- Polices mathématiques TeX -->
<link rel="stylesheet" href="fonts.css">

<!-- Moteur TikZJax -->
<script src="tikzjax.js"></script>

<!-- (Optionnel) MathJax 3 pour les formules inline -->
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

### Activer un package supplémentaire (ex. tkz-tab)

```html
<script type="text/tikz" data-tex-packages='{"tkz-tab": ""}'>
  \begin{tikzpicture}
    \tkzTabInit[lgt=3, espcl=2.5]
      {$x$ / 1, $f'(x)$ / 1, $f(x)$ / 2}
      {$-\infty$, $0$, $+\infty$}
    \tkzTabLine{, -, z, +, }
    \tkzTabVar{+/$+\infty$, -/$-4$, +/$+\infty$}
  \end{tikzpicture}
</script>
```

### Formules avec MathJax

```html
<!-- Inline -->
<p>La dérivée de \( f(x) = x^2 \) est \( f'(x) = 2x \).</p>

<!-- Centrée -->
\[ \int_a^b f(x)\,\mathrm{d}x = \Big[F(x)\Big]_a^b \]
```

---

## 📖 Contenu de la démo

La page `demo_maths.html` est structurée en **10 chapitres** :

```
00 · Installation locale          — mise en place pas-à-pas
01 · Tableaux de variations       — tkz-tab, polynômes, fonctions rationnelles
02 · Tableaux de signes           — inéquations, valeurs interdites
03 · Courbes & fonctions          — pgfplots, intersections
04 · Géométrie plane              — triangles, cercles, angles, hachures
05 · PGFPlots & stats             — histogrammes, nuages de points
06 · Graphes & arbres             — théorie des graphes, arbres de proba
07 · Diagrammes commutatifs       — tikz-cd, algèbre structurelle
08 · Probabilités                 — loi normale N(0,1), zones de rejet (95%)
09 · Figures 3D                   — tikz-3dplot, repères, vecteurs
10 · Formules MathJax avancées    — matrices, intégrales, automates finis
```

Chaque démo présente côte à côte le **rendu graphique** et le **code LaTeX** correspondant, avec coloration syntaxique et bouton de copie.

---

## 🛠 Packages TikZ disponibles

| Package | Usage |
|---|---|
| `tkz-tab` | Tableaux de variations et de signes |
| `pgfplots` | Courbes, histogrammes, fonctions |
| `tikz-cd` | Diagrammes commutatifs |
| `automata` | Automates finis déterministes / non-déterministes |
| `mindmap` | Cartes mentales |
| `patterns` | Hachures et remplissages géométriques |
| `intersections` | Calcul d'intersections de courbes |
| `decorations` | Accolades, flèches ondulées, texte sur courbe |
| `angles` | Marquage d'angles avec arc |
| `tikz-3dplot` | Repères et figures en 3D |
| `graphs` | Graphes (théorie des graphes) |
| `trees` | Arbres (probabilités, arbres binaires) |

---

## 💡 Conseils pédagogiques

- **MathJax + TikZJax** se chargent de manière totalement indépendante — pas de conflit possible. Mélangez formules inline `\( … \)` et figures TikZ dans la même page.
- Préférez **Live Server** (VS Code) pour le développement : le rechargement automatique est précieux lors de l'édition du code LaTeX.
- Pour la courbe de densité de $\mathcal{N}(\mu, \sigma)$, utilisez : `exp(-(x-mu)^2/(2*s^2))/(s*sqrt(2*pi))`.
- Les figures 3D via `tikz-3dplot` acceptent deux paramètres d'angle de vue : `\tdplotsetmaincoords{élévation}{azimut}`.

---

## 🏫 Origine & licence

Développé au **Lycée Antoine Watteau — Valenciennes** (académie de Lille).  
Moteur TikZJax : fork [@rod2ik](https://github.com/rod2ik/tikzjax).

> Distribué librement — réutilisation et adaptation encouragées pour tout usage éducatif.

---

## 🤝 Contribuer

Les contributions sont les bienvenues : nouveaux exemples, corrections, packages supplémentaires.

1. Forkez ce dépôt
2. Créez une branche : `git checkout -b feat/mon-exemple`
3. Commitez vos modifications : `git commit -m 'feat: ajouter démo tkz-euclide'`
4. Ouvrez une Pull Request

---

<div align="center">
  <sub>TikZJax · MathJax 3 · PGFPlots · tkz-tab — Lycée Antoine Watteau, Valenciennes</sub>
</div>
