const Job = require('./job');
const leagueIdentifiers = require('../helpers/leaguesIdentifiers');
const FetchOddService = require('../services/fetchOddService');

class JobFetchOdd extends Job {
  static call = async () => {
    await Promise.all(
      Object.entries(leagueIdentifiers).map(async (league) => {
        await new FetchOddService(league[1].name).call();
      })
    );
  };
}

module.exports = JobFetchOdd;
