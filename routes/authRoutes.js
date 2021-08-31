const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

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

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
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