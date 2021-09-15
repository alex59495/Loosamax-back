const axios = require('axios');
const keys = require('../config/keys');
const leagueIdentifiers = require('../helpers/leaguesIdentifiers')

const fetchStandings = async (req, res) => {
  try {
    const result = await axios({
      method: 'get',
      url: `https://api.football-data.org/v2/competitions/${leagueIdentifiers[req.params.league].alias}/standings`,
      headers: {'X-Auth-Token': keys.footballApiDataKey}
    })

    const standings = result.data.standings[0].table

    res.send(standings)
  } catch(err) {
    res.status(422).send(err)
  }
}

module.exports = {fetchStandings}