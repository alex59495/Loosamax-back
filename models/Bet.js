const mongoose = require('mongoose');
const { Schema } = mongoose;

const bet = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  game: { type: String, ref: 'Game' },
  choice: Number
});

mongoose.model('bets', bet);