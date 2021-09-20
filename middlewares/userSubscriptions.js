const mongoose = require('mongoose');

const Subscription = require('../models/Subscription');

module.exports = async (req, res, next) => {
  if (req.user) {
    req.user.subscriptions = await Subscription.find({user: req.user})
  }

  next();
}