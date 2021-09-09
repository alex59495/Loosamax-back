const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');
const express = require('express');

const keys = require('./config/keys');

module.exports = (app) => {
  // Middlewares
  app.use(express.json());
  app.use(
    cookieSession({
      // 30 days
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
}