# Retraite Sereine — Guide BRVM

Application web pédagogique pour simuler un complément de retraite via un investissement progressif (DCA) sur la BRVM (Bourse Régionale des Valeurs Mobilières).

## Fonctionnalités

- **Le pitch** — Présentation du concept avec les chiffres clés de la BRVM
- **Intérêts composés** — Explications visuelles du mécanisme de composition
- **Simulateur interactif** — Ajustez montant, durée et rendement pour voir les résultats
- **Revenus passifs** — Estimation des dividendes mensuels et entreprises à haut rendement
- **Au quotidien** — Impact concret sur les charges mensuelles d'un foyer sénégalais
- **Comment faire** — Guide étape par étape pour ouvrir un compte titres
- **FAQ** — Les 10 questions les plus fréquentes, avec réponses détaillées

## Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`.

## Build de production

```bash
npm run build
```

Les fichiers statiques sont générés dans le dossier `dist/`.

## Prévisualiser le build

```bash
npm run preview
```

## Déploiement

L'application génère des fichiers statiques et peut être déployée sur n'importe quelle plateforme :

### Vercel (recommandé — gratuit)

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Connecter votre dépôt GitHub
3. Vercel détecte automatiquement Vite et déploie

Ou via la CLI :

```bash
npx vercel
```

### Netlify (gratuit)

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier `dist/` dans l'interface Netlify

Ou connecter le dépôt Git avec ces paramètres :
- Build command : `npm run build`
- Publish directory : `dist`

### GitHub Pages

Ajouter dans `vite.config.js` :

```js
base: "/nom-du-repo/",
```

Puis utiliser GitHub Actions pour builder et déployer automatiquement.

### Hébergement classique

Après `npm run build`, copier le contenu de `dist/` sur n'importe quel serveur web (Apache, Nginx, etc.).

## Structure du projet

```
├── index.html              # Point d'entrée HTML
├── package.json            # Dépendances et scripts
├── vite.config.js          # Configuration Vite
├── public/
│   └── favicon.svg         # Icône du site
└── src/
    ├── main.jsx            # Bootstrap React
    ├── App.jsx             # Composant principal (routing par onglets)
    ├── theme.js            # Design tokens (couleurs, typographies)
    ├── utils.js            # Fonctions utilitaires (formatage, calculs DCA)
    ├── components/
    │   ├── Card.jsx        # Carte réutilisable
    │   ├── ChartTooltip.jsx# Tooltip pour les graphiques Recharts
    │   ├── Nav.jsx         # Barre de navigation
    │   ├── PageHeader.jsx  # En-tête de section
    │   ├── Pill.jsx        # Badge / étiquette
    │   └── ScenarioCards.jsx # Cartes des 3 scénarios DCA
    └── tabs/
        ├── PitchTab.jsx    # Onglet "Le pitch"
        ├── CompoundTab.jsx # Onglet "Intérêts composés"
        ├── SimulatorTab.jsx# Onglet "Simulateur"
        ├── DividendsTab.jsx# Onglet "Revenus passifs"
        ├── ConcreteTab.jsx # Onglet "Au quotidien"
        ├── HowToTab.jsx    # Onglet "Comment faire"
        └── FAQTab.jsx      # Onglet "Questions"
```

## Technologies

- [React 19](https://react.dev)
- [Vite 6](https://vite.dev)
- [Recharts](https://recharts.org) — graphiques
- [Lucide React](https://lucide.dev) — icônes
