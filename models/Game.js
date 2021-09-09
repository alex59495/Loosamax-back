const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  _id: String,
  sport_key: String,
  home_team: String,
  away_team: String,
  commence_time: Date,
  away_odd: Number,
  home_odd: Number,
  draw_odd: Number,
  result: {
    type: String,
    default: null
  },
  away_score: {
    type: Number,
    default: null
  },
  home_score: {
    type: Number,
    default: null
  }
},{ timestamps: true });

module.exports = mongoose.model('games', gameSchema);