const axios = require('axios')
const keys = require('../config/keys')
const leaguesIdentifiers = require('../helpers/leaguesIdentifiers')
const teamNameStandard = require('../helpers/teamNameStandard')

const mongoose = require('mongoose');
const { keys } = require('../helpers/leaguesIdentifiers')

const Game = mongoose.model('games');

module.exports = class UpdateResultsService {
  
  constructor() {
    this.twoDaysAgo = new Date(new Date() - 1000 * 60 * 60 * 24 * 2).toISOString().slice(0, 10)
    this.today = new Date().toISOString().slice(0, 10)
    this.leaguesAlias = leaguesIdentifiers.map(league => league.alias).join(',')
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
        result: this.setResult(item.score.winner)
      }
    })

    matchLastDaysFormatted.forEach(async (match) => {
      const gameUpdated = await Game.findOneAndUpdate(
        {home_team: match.home_team, away_team: match.away_team},
        { $set: {result: match.result }},
        )
    })
  }
}
