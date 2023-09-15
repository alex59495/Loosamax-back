require('dotenv').config();
const keys = require('../config/keys');
const mongoose = require('mongoose');

// Connect DB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = class Job {
  static closeConnection() {
    mongoose.disconnect();
  }
};
