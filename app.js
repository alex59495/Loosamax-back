const express = require('express');

// models
require('./models/User');
require('./models/Game');
require('./models/Bet');
require('./models/Subscription');

// service
require('./services/passport');

const app = express();

require('./middlewares')(app);

require('./database');

// Routes
// Require export une fonction qu'on appelle directement avec l'argument app
require('./routes/userRoutes')(app);
require('./routes/gamesRoutes')(app);
require('./routes/betRoutes')(app);
require('./routes/subscribeRoutes')(app);


// const myJobQueue = new Queue('myJob', keys.redisUrl );
module.exports = app