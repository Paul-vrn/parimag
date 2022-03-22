# Benzimag website

- Conception et modélisation réalisé par Paul Vernin, Cédric Lassale et Arthue Auger.
- Développement réalisé par Paul Vernin.
- Web design et maquettes réalisés par Tim et Nabil.

Ce projet consistait à la mise en place d'un site web pour la liste BDS Parimag 2024 des campagnes 2022 de l'ENSIMAG.

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
