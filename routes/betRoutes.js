const BetsControllers = require('../controllers/BetsControllers')

module.exports = (app) => {
  app.post('/api/bets', BetsControllers.createBets);

  app.get('/api/users/:userId/bets', BetsControllers.fetchUserBets)

  app.delete('/api/bets/:id', BetsControllers.deleteBet);

  app.get('/api/weekbets', BetsControllers.fetchWeekBets)
} 