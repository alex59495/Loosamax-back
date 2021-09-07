const mongoose = require('mongoose');
const { Schema } = mongoose;

const BetSchema = require('./Bet');


const userSchema = new Schema({
  googleId: String,
  pseudo: {
    type: String,
    default: "LooserMax"
  },
  color: String,
  bets: [BetSchema]
},{ timestamps: true });

mongoose.model('users', userSchema);