const Job = require('./job');
const UpdateResultsService = require('../services/updateResultsService');

class JobUpdateResult extends Job {
  static call = async () => {
    await new UpdateResultsService().call();
  };
}

module.exports = JobUpdateResult;
