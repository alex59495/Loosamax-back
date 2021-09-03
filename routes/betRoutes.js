const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Bet = mongoose.model('bets');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/bets', async (req, res) => {

    const { choice, user_id, game_id, odd } = req.body

    try {
      const actualBet = await Bet.aggregate([
        {$lookup: {
          from: 'games', 
          localField: 'game', 
          foreignField: '_id', 
          as: 'game'}
        },
        {$unwind: {path: '$game'}},
        {$lookup: {
          from: 'users', 
          localField: 'user', 
          foreignField: '_id', 
          as: 'user'}
        },
        {$unwind: {path: '$user'}},
        {$match: {'user._id': req.user._id, 'game.result': null} },
      ]);

      if(actualBet.length < 1) {
        const bet = await new Bet({
          choice,
          user: user_id,
          game: game_id,
          odd: odd
        })
    
        await bet.save()
  
        // Redirection
        res.status(200).send({res: 'Fire redirect', _id: bet._id})
      } else {
        res.status(200).send({res: 'Existing game'})
      }
      


    } catch(err) {
      res.status(422).send(err)
    }
  });

  app.get('/api/users/:userId/bets', async (req, res) => {
    try {
      const userId = req.params.userId
      const userBets = await Bet.aggregate([
        {$lookup: {
          from: 'games', 
          localField: 'game', 
          foreignField: '_id', 
          as: 'game'}
        },
        {$unwind: {path: '$game'}},
        {$lookup: {
            from: 'users', 
            localField: 'user', 
            foreignField: '_id', 
            as: 'user'}
        },
        {$unwind: {path: '$user'}},
        {$match: {'user._id': ObjectId(userId), 'game.result': { $ne: null} }}
      ]);
      res.status(200).send(userBets);
    } catch(err) {
      res.status(422).send(err)
    }
  })

  app.delete('/api/bets/:id', async (req, res) => {
    const id = req.params.id

    try {
      await Bet.findByIdAndRemove(id);
      res.status(200).send('Deleted');

    } catch(err) {
      res.status(422).send(err)
    }
  });

  app.get('/api/weekbets', async(req, res) => {
    try {
      const weekBets = []
      const usersFound = await User.find()
      
      for(const user of usersFound) {
        await Bet.aggregate([
          {$lookup: {
            from: 'games', 
            localField: 'game', 
            foreignField: '_id', 
            as: 'game'}
          },
          {$unwind: {path: '$game'}},
          {$lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'}
          },
          {$unwind: {path: '$user'}},
          {$match: {'user._id': user._id, 'game.result': null} },
        ]).then(bet => {
          if(bet[0]) weekBets.push(bet[0])
        })
      }

      res.send(weekBets)

    } catch(err){
      res.status(422).send(err)
    } 
  });

    app.get('/api/bets', async (req, res) => {
      try {
        const bets = await Bet.find({ result: { $ne: null }})
        res.send(bets)
      }catch(err){
        res.status(422).send(err)
      }
    })
} 