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

## Créer une nouvelle saison pour sauvegarder les résultats

Pour créer une nouvelle saison il suffit de faire tourner le job
```
node jobs/jobCreateNewSeason.js
```

Le job s'occupe de copier les stats de chaque user dans une nouvelle table `season` avec comme infos :
- `year` -> L'année de la saison
- `users` -> Un array de users (avec les stats)
