const axios = require('axios')
const keys = require('../config/keys')

const mongoose = require('mongoose');

require('../models/Game');

const Game = mongoose.model('games');
module.exports = class fetchOddService {

  constructor(league) {
    this.league = league
  }

  call = async () => {
    const fetchGames = await axios({
      method: 'get',
      url: `https://api.the-odds-api.com/v4/sports/${this.league}/odds/?apiKey=${keys.oddsApi}&regions=eu`
    });
    const games = fetchGames.data
    await Promise.all(games.map(async (game) => {
      const { id, home_team, away_team, commence_time, sport_key, bookmakers } = game
      const unibet = bookmakers.find(bookmaker => bookmaker.key == 'unibet');
  
      let home_odd = null
      let away_odd = null
      let draw_odd = null
  
      if (unibet) {

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
        console.log('Ca va fetch')
        const existingGame = await Game.find({_id: id})
        console.log('Ca a fetch')
    
        if(existingGame.length > 0) { return null }
    
        const newGame = new Game({
          _id: id,
          home_team: home_team,
          away_team: away_team,
          commence_time: commence_time,
          sport_key: sport_key,
          home_odd: home_odd,
          away_odd: away_odd,
          draw_odd: draw_odd,
        })
    
        newGame.save()
      }
    }))
  }
}