const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');
const express = require('express');
const device = require('express-device');
// const Queue = require('bull');

const keys = require('./config/keys');

module.exports = (app) => {
  const webpush = require('web-push');

  webpush.setVapidDetails('mailto:maxence.lenoir1206@gmail.com', keys.publicVapid, keys.privateVapid);

  app.set('view engine', 'ejs');
  app.set('view options', { layout: false });
  app.set('views', __dirname + '/views');
  
  app.use(device.capture());
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