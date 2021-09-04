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
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(`/profile/${req.user.id}`)
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

  app.get('/api/current_user', UsersControllers.fetchCurrentUser);

  app.patch('/api/current_user/:id', UsersControllers.patchCurrentUser);

  app.get('/api/users', UsersControllers.fetchUsers)
}