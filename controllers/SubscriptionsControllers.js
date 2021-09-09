const mongoose = require('mongoose');
const Subscription = mongoose.model('subscriptions');
const webpush = require("web-push");
const keys = require("../config/keys")
const ObjectId = mongoose.Types.ObjectId;

webpush.setVapidDetails("mailto:example@yourdomain.org", keys.publicVapid, keys.privateVapid);

function handlePushNotificationSubscription(req, res) {
  const subscriptionRequest = req.body;
  console.log(subscriptionRequest)
  subscription = Subscription.findOneOrCreate({
    user: req.user.id
  }, {
    user: req.user.id,
    detail: subscriptionRequest
  })
  
  res.status(201).json({ id: subscription });
}

async function sendPushNotification(req, res) {
  const subscriptionId = ObjectId(req.params.id);
  const pushSubscription = await Subscription.find({_id: subscriptionId});
  console.log(pushSubscription)
  webpush
    .sendNotification(
      pushSubscription[0].detail,
      JSON.stringify({
        title: "Alerte Procrastination",
        text: "HEY! Take a look at this brand new t-shirt!",
      })
    )
    .catch(err => {
      console.log(err);
    });

  res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };