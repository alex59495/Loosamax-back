const mongoose = require('mongoose');
const { Schema } = mongoose;

const bet = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  game: { type: String, ref: 'games', required: true },
  choice: {type: Number, required: true}
});

mongoose.model('bets', bet);