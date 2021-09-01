const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');
const passport = require('passport');

// models
require('./models/User');
require('./models/Game');

require('./services/passport');
require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    // 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Require export une fonction qu'on appelle directement avec l'argument app
require('./routes/authRoutes')(app);
require('./routes/gamesRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like main.css or main.js
  app.use(express.static('client/build'));
  // Express will serve up index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);