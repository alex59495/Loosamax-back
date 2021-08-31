const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  game_id: String,
  sport_key: String,
  home_team: String,
  away_team: String,
  commence_time: Date,
  away_odd: Number,
  home_odd: Number,
  draw_odd: Number,
  result: {
    type: Number,
    default: null
  }
});

mongoose.model('games', gameSchema);