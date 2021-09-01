const mongoose = require('mongoose');
const { Schema } = mongoose;

const bet = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  game: { type: String, ref: 'games' },
  choice: Number
});

mongoose.model('bets', bet);