const mongoose = require('mongoose');

const Season = mongoose.model('seasons');

const fetchSeason = async (req, res) => {
  const year = req.params.year;

  try {
    const [season] = await Season.find({ year: year }).populate(
      { 
        path: 'users',
        populate: {
          path: 'bets',
          populate: {
            path: 'game',
            model: 'games'
          }
        }
      }
    );
    res.send(season);
  } catch(err) {
    res.status(422).send(err)
  }
}

const fetchSeasons = async (req, res) => {
  try {
    const seasons = await Season.find();
    res.send(seasons);
  } catch(err) {
    res.status(422).send(err)
  }
}

module.exports = { fetchSeason, fetchSeasons }