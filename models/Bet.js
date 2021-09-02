const mongoose = require('mongoose');
const { Schema } = mongoose;

const bet = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  game: { type: String, ref: 'games', required: true },
  choice: {type: Number, required: true},
  odd: {type: Number, required: true},
  result: {
    type: String,
    default: null
  }
});

mongoose.model('bets', bet);