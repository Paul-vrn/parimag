
---

# Benzimag website

Projet de site web pour la liste BDS benzimag.\

## Technologies utilisées

* Repo manager : [Yarn](https://yarnpkg.com/)
* Backend :
    * [Node.js](https://nodejs.org/fr)
    * [Express.js](https://expressjs.com/fr)
* Frontend :
    * [Svelte](https://svelte.dev)


## Mise en place de l'environnement de travail
1. Installer [Node.js](https://nodejs.org/fr)
2. Installer [Yarn](https://yarnpkg.com/) (`node install yarn`)
3. lancer `yarn install` afin d'ajouter les différentes librairies nécessaires au fonctionnement de l'application (qu'on retrouve dans package.json)

## Lancer l'application en local
```
yarn dev
```
L'application sera lancé à cette adresse : http://localhost:5050/

## En cas de problème
Vérifier que les modules sont bien installés en allant voir dans server.js par exemple si les import ne sont pas souligné par des petits points.

## Développemet

Pour développer le frontend, on va principalement utiliser une [SvelteStrap](https://sveltestrap.js.org/?path=/story/components--get-started), c'est une sorte de fork de Bootstrap adapté au framework Svelte.