const axios = require('axios')
const keys = require('../config/keys')
const leaguesIdentifiers = require('../helpers/leaguesIdentifiers')
const teamNameStandard = require('../helpers/teamNameStandard')
const {getNextMonday} = require('../helpers/useFullMethods')

const mongoose = require('mongoose');

require('../models/Game');

const Game = mongoose.model('games');

module.exports = class UpdateResultsService {
  
  constructor() {
    this.twoDaysAgo = new Date(new Date() - 1000 * 60 * 60 * 24 * 2).toISOString().slice(0, 10)
    this.today = new Date().toISOString().slice(0, 10)
    // On recupere les leagues alias pour le call API (Object entries + index 1 car la donnée est stocké sous forme d'object JS)
    this.leaguesAlias = Object.entries(leaguesIdentifiers).map(league => league[1].alias).join(',')
  }

  setResult = (res) => {
    if (res === "AWAY_TEAM") return 2;
    if (res === "HOME_TEAM") return 1;
    return 0
  }

  call = async () => {

    const matchLastDays = await axios({
        method: 'get',
        url: `https://api.football-data.org/v2/matches?dateFrom=${this.twoDaysAgo}&dateTo=${this.today}&status=FINISHED&competitions=${this.leaguesAlias}`,
        headers: {'X-Auth-Token': keys.footballApiDataKey}
      })

    const matchLastDaysFormatted = matchLastDays.data.matches.map(item => {
      return {
        home_team: teamNameStandard[item.homeTeam.name],
        away_team: teamNameStandard[item.awayTeam.name],
        result: this.setResult(item.score.winner),
        home_score: item.score.fullTime.homeTeam,
        away_score: item.score.fullTime.awayTeam,
      }
    })

    matchLastDaysFormatted.forEach(async (match) => {
      const gameUpdated = await Game.findOneAndUpdate(
        {home_team: match.home_team, away_team: match.away_team, result: null},
        { $set: {result: match.result, away_score: match.away_score, home_score: match.home_score, date_result: getNextMonday(new Date()) }},
        )
    })
  }
}
