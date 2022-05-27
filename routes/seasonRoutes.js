const SeasonsControllers = require('../controllers/SeasonsControllers')

module.exports = (app) => {

  app.get('/api/seasons/:year', SeasonsControllers.fetchSeason)
  app.get('/api/seasons', SeasonsControllers.fetchSeasons)


} 