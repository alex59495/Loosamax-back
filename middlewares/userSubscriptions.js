const mongoose = require('mongoose');
const Subscription = mongoose.model('subscriptions');

module.exports = async (req, res, next) => {
  if (req.user) {
    req.user.subscriptions = await Subscription.find({user: req.user})
  }

  next();
}