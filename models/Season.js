const mongoose = require('mongoose');
const { Schema } = mongoose;
const { userSchema } = require('./User');

const seasonSchema = new Schema({
  year: Number,
  users: [userSchema]
},{ timestamps: true });

module.exports = mongoose.model('seasons', seasonSchema);
