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

 userSchema.methods.lastBetLooseAndMoreThan2 = function lastBetLooseAndMoreThan2() {
  const self = this;
  const lastBet = self.filter(bet => bet.game.result)[0]
  let odd
  switch (lastBet) {
    case "N":
      odd = bet.game.draw_odd
    case "1":
      odd = bet.game.home_odd
    default:
      odd = bet.game.away_odd
  }
  return lastBet.choice !== lastBet.game.result && odd > 2
 };

module.exports = mongoose.model('users', userSchema);
