const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');
const express = require('express');
const device = require('express-device');
const cors = require('cors');

const keys = require('./config/keys');

module.exports = (app) => {
  app.use(
    cookieSession({
      // 30 days
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],
      secure: process.env.NODE_ENV === 'development' ? false : true,
      httpOnly: process.env.NODE_ENV === 'development' ? false : true,
      sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
    })
  );

  app.enable('trust proxy');

  // Resolve CORS issues
  app.use(
    cors({
      credentials: true,
      origin: keys.frontUrl,
    })
  );

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', keys.frontUrl);
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie, Cookie'
    );
    next();
  });

  app.use(device.capture());
  // Middlewares
  app.use(express.json());
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
};
