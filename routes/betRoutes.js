const mongoose = require('mongoose');

const Bet = mongoose.model('bets');

module.exports = (app) => {
  app.post('/api/bets', async (req, res) => {

    const { choice, user_id, game_id } = req.body

    try {
      const actualBet = await Bet.aggregate([
        {$lookup: {
            from: 'games', 
            localField: 'game', 
            foreignField: '_id', 
            as: 'game'}
        },
        {$unwind: {path: '$game'}},
        {$match: {'game.result': null}}
      ]);

      if(actualBet.length < 1) {
        const bet = await new Bet({
          choice,
          user: user_id,
          game: game_id
        })
    
        await bet.save()
  
        // Redirection
        res.status(200).send('Fire redirect')
      } else {
        res.status(200).send('Existing game')
      }
      


    } catch(err) {
      res.status(422).send(err)
    }
  });

  app.delete('/api/bets/:id', async (req, res) => {
    const id = req.params.id

    try {
      await Bet.findByIdAndRemove(id);
      res.status(200).send('Deleted');

    } catch(err) {
      res.status(422).send(err)
    }
  })
} 