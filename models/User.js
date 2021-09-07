const mongoose = require('mongoose');
const { Schema } = mongoose;

const BetSchema = require('./Bet');


const userSchema = new Schema({
  googleId: String,
  emails: Array,
  pseudo: {
    type: String,
    default: "LooserMax"
  },
  bets: [BetSchema]
},{ timestamps: true });

mongoose.model('users', userSchema);