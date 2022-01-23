
# Benzimag website

Projet de site web pour la liste BDS benzimag.

## Technologies utilisées

* Repo manager : [Yarn](https://yarnpkg.com/)
* Backend :
  * [Node.js](https://nodejs.org/fr) : framework global du backend
  * [Express.js](https://expressjs.com/fr)
  * [Sequelize](https://sequelize.org/) : pour gérer la base de données
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

## En cas de problème

Vérifier que les modules sont bien installés en allant voir dans server.js par exemple si les import ne sont pas souligné par des petits points.

---

## Développemet

### Pages du site

Pour développer le frontend, on va principalement utiliser un frontend CSS qui est [SvelteStrap](https://sveltestrap.js.org/). C'est un front qui met à disposition plein de composant déjà fait et qui aide beaucoup au développement (comme bootstrap).

Tester le responsive : aller sur localhost:5050 -> clique droit -> inspecter -> en haut du panel cliquer sur le bouton "toggle device toolbar"

---

### Git

Pour travailler sur le site :

1. Commencer par cloner le site 

```{git}
git clone https://github.com/Paul-vrn/benzimag.git
```

2. Switch sur la branche development

```{git}
git checkout development
```

3. Après ça, les commandes pull, commit et push se feront sur la bonne branche

---

### Ressources

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
  * Concept avancé utile :
    * [Async func](https://www.youtube.com/watch?v=vn3tm0quoqE)
    * LocalStorage
* [Svelte](https://www.youtube.com/watch?v=rv3Yq-B8qp4)
  * [Svelte Docs](https://svelte.dev/docs)
  * [SvelteStrap](https://sveltestrap.js.org/)
