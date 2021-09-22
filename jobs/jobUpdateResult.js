const Job = require('./job')
const UpdateResultsService = require('../services/updateResultsService')

class JobFetchOdd extends Job {
  static call = async () => {
    if (new Date().getHours() > 7) {
      await new UpdateResultsService().call()
      super.closeConnection()
    }
  }
}

JobFetchOdd.call()