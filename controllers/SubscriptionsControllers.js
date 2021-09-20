const mongoose = require('mongoose');
const Subscription = mongoose.model('subscriptions');
const webpush = require("web-push");
const keys = require("../config/keys")
const ObjectId = mongoose.Types.ObjectId;

webpush.setVapidDetails("mailto:example@yourdomain.org", keys.publicVapid, keys.privateVapid);

function handlePushNotificationSubscription(req, res) {
  const subscriptionRequest = req.body;

  subscription = Subscription.updateOneOrCreate({
    user: req.user.id,
    device: req.device.type
  }, {
    user: req.user.id,
    detail: subscriptionRequest,
    device: req.device.type
  })
  
  res.status(201).json({ id: subscription });
}

async function sendPushNotification(req, res) {
  const subscriptionId = ObjectId(req.params.id);
  const pushSubscription = await Subscription.findById(subscriptionId);
  console.log(pushSubscription)
  try {
    webpush
      .sendNotification(
        pushSubscription.detail,
        JSON.stringify({
          title: "Alerte Procrastination",
          text: "VENDREDI ! VENDREDI !",
        })
      )
      .catch(err => {
        console.log(err);
      });
  
    res.status(202).json({id: req.params.id});
  } catch(err) {
    res.status(500).send(err)
  }
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };