const Job = require('./job')
const AutomaticChooseGameService = require('../services/automaticChooseGameService')

class JobAutomaticChooseGame extends Job {
  static call = async () => {
    if (new Date().getDay() === 5) {
      await new AutomaticChooseGameService().call()
      super.closeConnection()
    };
  }
}

JobAutomaticChooseGame.call()