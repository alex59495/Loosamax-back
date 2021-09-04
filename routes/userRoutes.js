const passport = require('passport');

const UsersControllers = require('../controllers/UsersControllers.js')

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

<<<<<<< HEAD
  app.get('/api/current_user', UsersControllers.fetchCurrentUser);

  app.patch('/api/current_user/:id', UsersControllers.patchCurrentUser);

  app.get('/api/users', UsersControllers.fetchUsers)
=======
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
>>>>>>> 0a7235df0d1a016d87dcb1c11d4079656de9f9df
}