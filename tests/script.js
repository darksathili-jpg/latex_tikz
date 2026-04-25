// Contenu LaTeX TikZ — modifie uniquement ce fichier pour changer le diagramme
const coef= 6;

const tikzCode = `
\\begin{tikzpicture}
    \\tkzTabInit[lgt=3, espcl=2.5]
    {$x$     / 1,
        $f'(x) = ${coef}x$ / 1,
        $f(x)$  / 2}
    {$-\\infty$, $0$, $+\\infty$}
    \\tkzTabLine{, -, z, +, }
    \\tkzTabVar{+/$+\\infty$, -/$-4$, +/$+\\infty$}
\\end{tikzpicture}
`;
