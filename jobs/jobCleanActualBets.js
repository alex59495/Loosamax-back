const Job = require('./job');
const CleanActualBets = require('../services/cleanActualBets');

class JobCleanActualBets extends Job {
  static call = async () => {
    await new CleanActualBets().call();
    super.closeConnection()
  }
}

JobCleanActualBets.call();