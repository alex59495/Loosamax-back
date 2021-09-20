const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscription = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  detail: Object,
  device: String,
}, { timestamps: true });

subscription.statics.updateOneOrCreate = function updateOneOrCreate(condition, doc) {
  const self = this;
  const newDocument = doc;
  return new Promise((resolve, reject) => {
    return self.findOneAndUpdate(condition, doc)
      .then((result) => {
        if (result) {
          return resolve(result);
        }
        return self.create(newDocument)
          .then((result) => {
            return resolve(result);
          }).catch((error) => {
          return reject(error);
        })
      }).catch((error) => {
    return reject(error);
    })
  });
 };

mongoose.model('subscriptions', subscription); 