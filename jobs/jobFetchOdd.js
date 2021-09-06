const fetchOddService = require('../services/fetchOddService')
const leagueIdentifiers = require('../helpers/leaguesIdentifiers')

Object.entries(leagueIdentifiers).forEach((league) => {
  new fetchOddService(league[1].name).call()
})