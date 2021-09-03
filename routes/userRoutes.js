const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const Bet = mongoose.model('bets');

module.exports = (app) => {

  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/', failureFlash: "Dejá 9 joueurs inscrits, tu ne peux pas t'inscrire." }),
    (req, res) => {
      res.redirect(`/profile/${req.user.id}`)
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

  app.get('/api/current_user', async (req, res) => {
    if(req.user) {
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

      user = {
        _id: req.user._id, 
        googleId: req.user.googleId,
        pseudo: req.user.pseudo
      }

      res.send({...user, actualBet: {...actualBet[0]}});
    }

    res.send(false);
    
  });

  app.patch('/api/current_user/:id', async (req, res) => {
    const id = req.params.id
    const pseudo = req.body.pseudo

    try {
      const user = await User.updateOne({
        _id: id
      },
      {$set: { pseudo: pseudo }});

      res.send(user)
    } catch(err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.send(users)

    }catch(err) {
      res.status(422).send(err)
    }
  })
}