const StandingController = require('../controllers/StandingController')

module.exports = (app) => {

  app.get('/api/:league/standings', StandingController.fetchStandings);

}