const mongoose = require('mongoose');
const Game = mongoose.model('games');
const leaguesIdentifiers = require('../helpers/leaguesIdentifiers')

const NoGamesInWeekEnd = async (leagueName) => {
  // On ne retourne pas de games si on est Samedi / Dimanche ou Lundi
  switch (new Date().getDay()) {
    case 6:
    case 7:
    case 1:
      return []
    default:
      return await Game.find({sport_key: leagueName})
  }
}

const fetchDatabase = async (req, res) => {
  if (leaguesIdentifiers[req.params.league]) {
    const games = await NoGamesInWeekEnd(leaguesIdentifiers[req.params.league].name)
    res.send(games)
  } else {
    res.status(400).send({erreur: "La ligue recherchée n'existe pas"})
  }
}

module.exports = {fetchDatabase}