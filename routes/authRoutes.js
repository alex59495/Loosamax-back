const passport = require('passport');

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

  app.patch('/api/current_user/:id', (req, res) => {
    console.log(req.user)
  });
}