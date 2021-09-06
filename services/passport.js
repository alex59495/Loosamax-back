const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).populate(
    {
      path: 'bets',
      populate: {
        path: 'game',
        model: 'games'
      }
    }
  )
    .then((user) => done(null, user) )
});

passport.use(new googleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, 
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
    if (existingUser) {
      return done(null, existingUser);
    }

    const listUsers = await User.find()
    if(listUsers.length >= 9) {
      return done(null, false)
    }

    const user = await new User({ googleId: profile.id }).save()
    done(null, user)
  }
));
