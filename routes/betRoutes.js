const mongoose = require('mongoose');

const Bet = mongoose.model('bets');

module.exports = (app) => {
  app.post('/api/bets', async (req, res) => {

    const { choice, user_id, game_id } = req.body

    try {
      const bet = await new Bet({
        choice,
        user: user_id,
        game: game_id
      })
  
      await bet.save()

      // Redirection
      res.status(200).send('Fire redirect')


    } catch(err) {
      res.status(422).send(err)
    }
  })
} 