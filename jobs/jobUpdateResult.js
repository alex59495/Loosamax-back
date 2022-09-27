const Job = require('./job')
const UpdateResultsService = require('../services/updateResultsService')

class JobFetchOdd extends Job {
  static call = async () => {
    await new UpdateResultsService().call()
  }
}

module.exports = JobFetchOdd;