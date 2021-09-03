const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  pseudo: {
    type: String,
    default: "LooserMax"
  }
});

mongoose.model('users', userSchema);