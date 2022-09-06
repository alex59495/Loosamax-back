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

  app.set('trust proxy', 1);

   // Resolve CORS issues
   app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", keys.frontUrl);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie, Cookie");
    next();
  });
  
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