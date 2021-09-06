const mongoose = require('mongoose');
const keys = require('../config/keys');

// models
require('../models/User');
require('../models/Game');
require('../models/Bet');

// Connect DB
mongoose.connect(keys.mongoURI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UpdateResultsService = require('./updateResultsService')
new UpdateResultsService().call()

