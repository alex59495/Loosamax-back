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
  const lastBet = self.bets.filter(bet => bet.game.result)[self.bets.length - 1]
  let odd
  switch (lastBet.choice) {
    case "N":
      odd = lastBet.game.draw_odd;
      break;
    case "1":
      odd = lastBet.game.home_odd;
      break;
    default:
      odd = lastBet.game.away_odd;
      break;
  }
  return lastBet.choice !== lastBet.game.result && odd > 2
 };

module.exports = mongoose.model('users', userSchema);
