const BetsControllers = require('../controllers/BetsControllers')

module.exports = (app) => {
  app.post('/api/bets', BetsControllers.createBets)

  app.delete('/api/bets/:id', BetsControllers.deleteBet)
} 