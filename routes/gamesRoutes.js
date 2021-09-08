const GamesControllers = require('../controllers/GamesControllers')

module.exports = (app) => {

  app.get('/api/games/:league', GamesControllers.fetchDatabase);

}