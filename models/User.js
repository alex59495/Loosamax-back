const mongoose = require('mongoose');
const { Schema } = mongoose;

const BetSchema = require('./Bet');
const SubscriptionSchema = require('./Subscription');

const userSchema = new Schema({
  googleId: String,
  emails: Array,
  pseudo: {
    type: String,
    default: "LooserMax"
  },
  color: String,
  bets: [BetSchema],
  subscriptions: [SubscriptionSchema],
},{ timestamps: true });

module.exports = mongoose.model('users', userSchema);