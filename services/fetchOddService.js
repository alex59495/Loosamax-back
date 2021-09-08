const axios = require('axios')
const keys = require('../config/keys')

const mongoose = require('mongoose');

require('../models/Game');

const Game = mongoose.model('games');
module.exports = class fetchOddService {

  constructor(league) {
    this.league = league
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  dataForWeek = (data) => {
    switch (new Date().getDay()) {
      case 1:
        return data.filter((match) => new Date(match.commence_time) <= this.addDays(new Date(), 7)) 
      case 2:
        return data.filter((match) => new Date(match.commence_time) <= this.addDays(new Date(), 6)) 
      case 3:
        return data.filter((match) => new Date(match.commence_time) <= this.addDays(new Date(), 5))
      case 4:
        return data.filter((match) => new Date(match.commence_time) <= this.addDays(new Date(), 4))
      case 5:
        return data.filter((match) => new Date(match.commence_time) <= this.addDays(new Date(), 3))
      case 6:
        return data.filter((match) => new Date(match.commence_time) <= this.addDays(new Date(), 2))
      case 7:
        return data.filter((match) => new Date(match.commence_time) <= this.addDays(new Date(), 1))
    }
  }

  call = async () => {
    const fetchGames = await axios({
      method: 'get',
      url: `https://api.the-odds-api.com/v4/sports/${this.league}/odds/?apiKey=${keys.oddsApi}&regions=eu&markets=h2h`
    });
    const games = this.dataForWeek(fetchGames.data)
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

        const existingGame = await Game.findByIdAndUpdate(id, {$set: {
          home_odd: home_odd,
          away_odd: away_odd,
          draw_odd: draw_odd
        }}).exec();
            
        if(!existingGame) {
          const newGame = new Game({
            _id: id,
            home_team: home_team,
            away_team: away_team,
            commence_time: commence_time,
            sport_key: sport_key,
            home_odd: home_odd,
            away_odd: away_odd,
            draw_odd: draw_odd
          })
      
          await newGame.save()
        }
      }
    }))
  }
}