const Job = require('./job')
const AutomaticChooseGameService = require('../services/automaticChooseGameService')

class JobAutomaticChooseGame extends Job {
  static call = async () => {
    await new AutomaticChooseGameService().call()
  }
}

module.exports = JobAutomaticChooseGame;