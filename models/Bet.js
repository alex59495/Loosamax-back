const mongoose = require('mongoose');
const { Schema } = mongoose;

const bet = new Schema({
  game: { type: String, ref: 'games', required: true },
  choice: {type: Number, required: true},
});

mongoose.model('bets', bet);