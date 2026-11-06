# BusDirect — Gestion des réservations de trajets
##  Description

**BusDirect — Partie 2** est la suite et l'évolution du premier projet BusDirect, développé dans le cadre de la formation YouCode — UM6P.

Dans la première partie, l'application permettait de gérer les réservations sur une seule ligne de transport : **Safi → Marrakech**.

Cette deuxième partie étend l'application à un réseau de **20 trajets** et introduit de nouvelles fonctionnalités pour améliorer la gestion des réservations et des passagers.

L'application permet à un agent de consulter les trajets, rechercher et filtrer les destinations, gérer les sièges dans chaque cabine, réserver, modifier ou annuler des réservations et gérer une liste d'attente lorsque les trajets sont complets.

Les données sont chargées depuis un fichier JSON au premier lancement, puis sauvegardées dans le `localStorage` afin de conserver les modifications après actualisation de la page.

##  Démonstration

- **Site web :** 
- **Dépôt GitHub :** https://github.com/erraksalma/BusDirect02

##  Pages de l'application

### 1. Page d'accueil — `index.html`

Cette page permet de :
- Afficher les différents trajets du réseau.
- Rechercher un trajet par ville de départ ou de destination.
- Filtrer les trajets selon leur disponibilité.
- Afficher les trajets avec une pagination.

### 2. Page cabine — `cabine.html`

Cette page permet de :
- Afficher les informations du trajet sélectionné.
- Visualiser le plan des sièges.
- Identifier les sièges libres, occupés et VIP.
- Consulter le nombre de places disponibles et la recette totale.
- Réserver une place.
- Modifier ou annuler une réservation.
- Ajouter et gérer les passagers en liste d'attente.
- Attribuer automatiquement un siège libéré au premier passager en attente.

##  Fonctionnalités principales

- Gestion de 20 trajets.
- Recherche et filtrage des trajets.
- Pagination des résultats.
- Gestion des sièges VIP (sièges 1 à 4).
- Calcul automatique du prix des sièges VIP.
- Validation des noms et numéros de téléphone.
- Réservation avec attribution automatique du premier siège disponible hors VIP.
- Modification et suppression des réservations.
- Gestion de la liste d'attente.
- Sauvegarde des données avec `localStorage`.
- Conservation des données après actualisation.

##  Organisation des fichiers

```text
BusDirect02/
│
├── index.html
├── cabine.html
│
├── data/
│   └── trips.json
│
├── js/
│   ├── store.js
│   ├── validators.js
│   ├── reservations.js
│   ├── render.js
│   ├── main-trajets.js
│   └── main-cabine.js
│
├── img/
│   └── logo.png
│
└── README.md
```

##  Organisation des modules JavaScript

| Module | Responsabilité |
|---|---|
| `store.js` | Chargement et sauvegarde des données |
| `validators.js` | Validation des informations des passagers |
| `reservations.js` | Gestion des règles de réservation et des sièges VIP |
| `render.js` | Création et affichage des cartes de trajets |
| `main-trajets.js` | Gestion de la page des trajets |
| `main-cabine.js` | Gestion de la cabine, des sièges et des passagers |

##  Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6 Modules)
- Git et GitHub
- localStorage
- JSON
- Vercel

##  Lancement du projet


##  Réalisation

Projet réalisé par Errak Salma dans le cadre de la formation **YouCode — UM6P**.

**Objectif :** développer une application web interactive permettant de gérer les trajets, les réservations et les passagers d'un réseau de transport.