const Job = require('./job')
const CreateNewSeasonService = require('../services/createNewSeasonService')

class JobCreateNewSeason extends Job {
  static call = async () => {
    await new CreateNewSeasonService().call();
    super.closeConnection()
  }
}

JobCreateNewSeason.call();