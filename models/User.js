const mongoose = require('mongoose');
const { Schema } = mongoose;

const {betSchema} = require('./Bet');
const SubscriptionSchema = require('./Subscription');

const userSchema = new Schema({
  googleId: String,
  emails: Array,
  pseudo: {
    type: String,
    default: "LooserMax"
  },
  color: String,
  bets: [betSchema],
  subscriptions: [SubscriptionSchema],
},{ timestamps: true });

userSchema.methods.currentBet = function currentBet() {
  const self = this;
  return self.bets.find(bet => !bet.game.result)
 };

module.exports = mongoose.model('users', userSchema);
