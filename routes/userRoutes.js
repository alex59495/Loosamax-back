const passport = require('passport');
const keys = require('../config/keys')

const UsersControllers = require('../controllers/UsersControllers.js')
const userSubscription = require('../middlewares/userSubscriptions')

module.exports = (app) => {

  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/', failureFlash: "Dejá 10 joueurs inscrits, tu ne peux pas t'inscrire." }),
    (req, res) => {
      res.redirect(`${keys.frontUrl}/profile/${req.user.id}`)
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect(keys.frontUrl)
  })

  app.get('/api/current_user', userSubscription, UsersControllers.fetchCurrentUser);

  app.patch('/api/current_user/:id', UsersControllers.patchCurrentUser);

  app.get('/api/users', UsersControllers.fetchUsers)
}