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
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(`/profile/${req.user.id}`)
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

  app.get('/api/current_user', async (req, res) => {
    const actualBet = await Bet.findOne({user: req.user._id}).populate('game')

    const user = {
      _id: req.user._id, 
      googleId: req.user.googleId,
      pseudo: req.user.pseudo
    }

    res.send({...user, actualBet});
  })

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
}