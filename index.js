const express = require('express');
const secure = require('ssl-express-www');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const device = require('express-device');
const flash = require('connect-flash');
const Queue = require('bull');

const webpush = require('web-push');

webpush.setVapidDetails('mailto:maxence.lenoir1206@gmail.com', keys.publicVapid, keys.privateVapid);

// models
require('./models/User');
require('./models/Game');
require('./models/Bet');
require('./models/Subscription');

// service
require('./services/passport');

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cookieSession({
    // 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(secure);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
 
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.set('views', __dirname + '/views');
 
app.use(device.capture());

// Connect DB
mongoose.connect(keys.mongoURI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
// Require export une fonction qu'on appelle directement avec l'argument app
require('./routes/userRoutes')(app);
require('./routes/gamesRoutes')(app);
require('./routes/betRoutes')(app);
require('./routes/subscribeRoutes')(app);

const myJobQueue = new Queue('myJob', keys.redisUrl );

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