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

userSchema.methods.currentBet = function currentBet() {
  const self = this;
  return self.bets.find(bet => !bet.game.result)
 };

mongoose.model('users', userSchema);