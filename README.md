# Benzimag website

Projet de site web pour la liste BDS benzimag.

## Technologies utilisées

* Repo manager : [Yarn@1.22.17](https://yarnpkg.com/)
* Backend :
  * [Node.js@17.3.1](https://nodejs.org/fr) : framework global du backend
  * [Express.js](https://expressjs.com/fr)
  * [Sequelize](https://sequelize.org/) : ORM (lien entre backend et base de données)
  * [SQLite3](https://www.sqlite.org/index.html) : SQL engine (facile à mettre en place)
* Frontend :
  * [Svelte](https://svelte.dev) : framework global frontend
  * [SvelteStrap](https://sveltestrap.js.org/) : framework CSS
  * [Axios](https://github.com/axios/axios) : pour créer des requêtes API.

---

## Mise en place de l'environnement de travail

1. Installer [Node.js](https://nodejs.org/fr)
2. Installer [Yarn](https://yarnpkg.com/) (`node install yarn`)
3. lancer `yarn install` afin d'ajouter les différentes librairies nécessaires au fonctionnement de l'application (qu'on retrouve dans package.json)

---

## Lancer l'application en local

```{bash}
yarn dev
```

L'application sera lancé à cette adresse : <http://localhost:5050/>

---

## Développemet

### Pages du site

Pour développer le frontend, on va principalement utiliser un framework CSS qui est [SvelteStrap](https://sveltestrap.js.org/). C'est un framework qui met à disposition plein de composant déjà fait et qui aide beaucoup au développement.

Pour tester le responsive : aller sur localhost:5050 -> clique droit -> inspecter -> en haut du panel cliquer sur le bouton "toggle device toolbar"

---

## Git

Pour travailler sur le site :

1. Commencer par cloner le site

```bash
git clone --branch development https://github.com/Paul-vrn/benzimag.git

```

2. Switch sur la branche development (si pas déjà le cas)

```bash
git checkout development
```

3. Après ça, les commandes pull, commit et push se feront sur la bonne branche

---

## Arborescence

```javascript
.
├── public
│   ├── custom.css
│   ├── global.css
│   ├── fonts
│   ├── images // ici on met toutes les images "statiques"
│   ├── index.html
│   └── login.html
├── src
│   ├── backend // Partie backend (express.js)
│   │   ├── config.js
│   │   ├── data // données stockées en dur
│   │   │   ├── db.sqlite
│   │   │   └── liste.json
│   │   ├── model // (Sequelize) models liées à la BDD
│   │   │   ├── QG.js
│   │   │   ├── commande.js
│   │   │   ├── detail_commande.js
│   │   │   ├── index.js
│   │   │   ├── livreur.js
│   │   │   ├── produit.js
│   │   │   └── stock.js
│   │   └── routes // routes API
│   │       ├── api.js
│   │       └── liste.js
│   └── frontend // Partie frontend (Svelte)
│       ├── api // (Axios)
│       │   ├── api.js
│       │   └── getListe.js
│       ├── components // composants de Svelte
│       │   ├── App.svelte
│       │   ├── admin // partie serveur du front (pour les admins)
│       │   └── main // partie client du front (pour les clients)
│       ├── main.js // Application
│       └── stores.js // stores.js (check doc svelte)
├── README.md
├── package.json // liste des packages installés et autres infos
├── rollup.config.js 
├── server.js // fichier qui load le serveur
└── yarn.lock
```

---

## Ressources

Des ressources pour en apprendre plus sur les technologies utilisées :

* [HTML](https://youtu.be/ok-plXXHlWw) :
  * [HTML basics](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://www.youtube.com/watch?v=OEV8gMkCHXQ) :
  * [CSS docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
  * [Flex box](https://www.youtube.com/watch?v=K74l26pE4YA)
  * [Exercice flex-box](https://flexboxfroggy.com/)
* [JavaScript](https://youtu.be/DHjqpvDnNGE) :
  * [Quick guide JS](https://www.youtube.com/watch?v=9emXNzqCKyg)
  * Concept de [Functional programming](https://fr.wikipedia.org/wiki/Programmation_fonctionnelle)
  * [5 JavaScript Concepts You HAVE TO KNOW](https://youtu.be/a00NRSFgHsY)
  * Concept avancé utile :
    * [Async func](https://www.youtube.com/watch?v=vn3tm0quoqE)
    * LocalStorage
    * [Axios](https://github.com/axios/axios)
* [Svelte](https://www.youtube.com/watch?v=rv3Yq-B8qp4)
  * [Svelte Docs](https://svelte.dev/docs)
  * [SvelteStrap](https://sveltestrap.js.org/)

---

### Quelques extensions utiles pour développer

* HTML CSS Support
* IntelliSence for CSS puis cliquer sur le petit éclair en bas à gauche
* Material Icon Theme
* Svelte for VS Code
