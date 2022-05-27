const repl = require("repl");
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
require('./models/Game');
require('./models/Bet');
require('./models/Season');

const Game = mongoose.model('games');
const User = mongoose.model('users');
const Season = mongoose.model('seasons');


// Connect DB
mongoose.connect(keys.mongoURI,  function(err){
  if (err){ throw err; }
  
  const replServer = repl.start({});

  replServer.context.User = User
  replServer.context.Game = Game
  replServer.context.Season = Season
});

