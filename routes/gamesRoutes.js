const GamesControllers = require('../controllers/GamesControllers')

module.exports = (app) => {

  app.get('/api/games/:league', GamesControllers.fetchDatabase);

  // API POUR FETCH LES INFOS, ON NE FAIT LES INFOS QU'UNE FOIS PAR JOUR POUR NE PAS PLOMBER LE QUOTA DE L'API
  app.get('/api/fetch/games/:league', GamesControllers.fetchApi);
}