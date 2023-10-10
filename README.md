# Loosamax

Petites applications pour faciliter les paris entre amis.

## Lancer l'appli en local
```
npm run dev
```

## Lancer un evironnement de debug en local
```
npm run console
```
## Debug
Si on tombe sur l'erreur 
```
MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

C'est surement parce que les `process.env.NODE_ENV` renvoit `undefined`, dans ce cas il suffit d'ajouter `NODE_ENV=development` devant la commande pour forcer la définition de la variable.

## Testing
Pour lancer les tests utiliser la commande
```
yarn test
```

Pour que les test run avec ubuntu 22.04 il faut spécifier une version de Mongo db >= 6.0.4. Pour cela ajouter MONGOMS_VERSION=6.0.4 dans le .env (voir [ce thread](https://github.com/nodkz/mongodb-memory-server/issues/480))

## Créer une nouvelle saison pour sauvegarder les résultats

Pour créer une nouvelle saison il suffit de faire tourner le job
```
node jobs/manualCalls/jobCreateNewSeason.js
```

Le job s'occupe de copier les stats de chaque user dans une nouvelle table `season` avec comme infos :
- `year` -> L'année de la saison
- `users` -> Un array de users (avec les stats)