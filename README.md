# Quizzy

Partie front du quizz musical Quizzy.

## Installation
```bash
git clone https://github.com/guillaumehanotel/quizzy.git
cd quizzy
yarn install
yarn start
```

## Commandes
### `yarn start`
Démarre le projet en mode dev. Aller sur [http://localhost:3000](http://localhost:3000) pour voir le projet dans le navigateur.
Le hot relad recharge la page après chaque modfication.
Les erreurs d'ESLint sont affichées dans la console.

### `yarn build`
Construit l'application en mode production.

### `yarn install`
Installe les paquets nécessaires au bon fonctionnement du projet.

### `yarn add <package_name>`
Installe un nouveau paquet.

## Structure
- **/public**
    - **assets** : Contient toutes les images
- **/src**
    - **components** : Contient tous les composants utilisés dans les pages.
    Les composants se trouvent dans un dossier avec le composant tsx, et un fichier de style propre à se composant.
    - components/**blocs** : Contient les composants "blocs", qui représentent deséléments conséquents de la page. Peuvent contenir des éléments.
    - components/**elements** : Contient les composants représentant de simples éléments.
    - components/**forms** : Contient des composants de formulaire.
    - components/**header** : Contient des composants du header du site.
    - **config** : Contient des constantes utiles dans tout le projet, y compris toutes les actions nécessaires aux providers.
    - **models** : Contient des modèles d'objets typescript.
    - **pages** : Contient les composants représentant une page. Chaque page appele ensuite des composants du dossier _components_.
    - **providers** : Contient les providers, gérant les states globaux à tout une partie du site.
    - **styles** : Contient des styles globaux à tout le site, et non à un composant en particulier.
    - **utils** : Contients des helpers, notamment utiles aux requêtes faites au serveur.

## Documentations utiles
Le projet est conçu en [React](https://fr.reactjs.org/docs/getting-started.html), avec l'utilisation de [Typescript](https://www.typescriptlang.org/docs/home.html).   
Redux n'est pas installé, mais des [contextes](https://fr.reactjs.org/docs/context.html) sont mis en place pour bénéficier de states globaux.   
Aucune classe React n'est utilisé, seulement des Composants Fonctions avec une utilisation des [hooks](https://fr.reactjs.org/docs/hooks-intro.html).
Le framwework CSS [Materialize](https://materializecss.com/) est installé.     
Le [serveur](https://github.com/guillaumehanotel/quizzy-api) étant un Laravel, la gestion des websockets se fait via le paquet [laravel-echo](https://laravel.com/docs/5.8/broadcasting).    
La [doc de l'api](https://github.com/guillaumehanotel/quizzy-api/blob/master/README.md) se trouve sur le repo de la partie back de Quizzy.

