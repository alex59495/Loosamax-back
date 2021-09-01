const axios = require('axios');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const Game = mongoose.model('games');

module.exports = (app) => {

  app.get('/api/games/ligue1', async (req, res) => {
    const games = await Game.find({sport_key: "soccer_france_ligue_one"})
    res.send(games)
  });

  // API POUR FETCH LES INFOS, ON NE FAIT LES INFOS QU'UNE FOIS PAR JOUR POUR NE PAS PLOMBER LE QUOTA DE L'API
  app.get('/api/fetch/games/soccer_france_ligue_one', async (req, res) => { 

    try {
      const fetchGames = await axios({
        method: 'get',
        url: `https://api.the-odds-api.com/v4/sports/soccer_france_ligue_one/odds/?apiKey=${keys.oddsApi}&regions=eu`
      });
      
      const games = fetchGames.data
      games.forEach(async game => {
        const { id, home_team, away_team, commence_time, sport_key, bookmakers } = game
        const unibet = bookmakers.find(bookmaker => bookmaker.key == 'unibet');

        let home_odd = null
        let away_odd = null
        let draw_odd = null

        const market = unibet.markets[0]

        market.outcomes.forEach(({name, price}) => {
          switch(name) {
            case home_team:
              return home_odd = price
            case away_team:
              return away_odd = price
            default:
              return draw_odd = price
          }
        })

        const existingGame = await Game.find({game_id: id})

        if(existingGame.length > 0) { return null }

        const newGame = new Game({
          game_id: id,
          home_team: home_team,
          away_team: away_team,
          commence_time: commence_time,
          sport_key: sport_key,
          home_odd: home_odd,
          away_odd: away_odd,
          draw_odd: draw_odd,
        })

        newGame.save()
      })

      res.send({ok: 'Les matchs ont été actualisés'})

    } catch(err) {
      res.status(422).send(err)
    }
  });
}