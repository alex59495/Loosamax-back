const SubscriptionsControllers = require('../controllers/SubscriptionsControllers')

module.exports = (app) => {

  app.post('/api/subscription', SubscriptionsControllers.handlePushNotificationSubscription)

  app.get('/api/subscription/:id', SubscriptionsControllers.sendPushNotification)
}