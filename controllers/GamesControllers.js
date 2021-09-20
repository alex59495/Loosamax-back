const Game = require('../models/Game');
const leaguesIdentifiers = require('../helpers/leaguesIdentifiers')

const noGamesInWeekEnd = async (leagueName) => {
  return await Game.find({sport_key: leagueName, result: null})
}

const fetchDatabase = async (req, res) => {
  if (leaguesIdentifiers[req.params.league]) {
    const games = await noGamesInWeekEnd(leaguesIdentifiers[req.params.league].name)
    res.send(games)
  } else {
    res.status(400).send({erreur: "La ligue recherchée n'existe pas"})
  }
}

module.exports = {fetchDatabase}