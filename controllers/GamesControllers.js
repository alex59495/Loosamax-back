const mongoose = require('mongoose');
const Game = mongoose.model('games');
const leaguesIdentifiers = require('../helpers/leaguesIdentifiers')
const fetchOddService = require('../services/fetchOddService')

const fetchDatabase = async (req, res) => {
  if (leaguesIdentifiers[req.params.league]) {
    const games = await Game.find({sport_key: leaguesIdentifiers[req.params.league].name})
    res.send(games)
  } else {
    res.status(400).send({erreur: "La ligue recherchée n'existe pas"})
  }
}

const fetchApi = async (req, res) => { 
  if (leaguesIdentifiers[req.params.league]) {

    try {
      new fetchOddService(leaguesIdentifiers[req.params.league].name).call()
      res.send({ok: 'Les matchs ont été actualisés'})
    } catch(err) {
      res.status(422).send(err)
    }
  } else {
    res.status(400).send({erreur: "La ligue recherchée n'existe pas"})
  }
}

module.exports = {fetchDatabase, fetchApi}