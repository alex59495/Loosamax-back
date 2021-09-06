const Job = require('./job')
const leagueIdentifiers = require('../helpers/leaguesIdentifiers')
const fetchOddService = require('../services/fetchOddService')

class JobFetchOdd extends Job {
  static call = async () => {
    await Promise.all(Object.entries(leagueIdentifiers).map(async (league) => {
      await new fetchOddService(league[1].name).call()
    }))
    super.closeConnection()
  }
}

JobFetchOdd.call()
