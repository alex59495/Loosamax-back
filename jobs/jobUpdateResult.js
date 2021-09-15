const Job = require('./job')
const UpdateResultsService = require('../services/updateResultsService')

class JobFetchOdd extends Job {
  static call = async () => {
    if ([0, 1, 2, 6].includes(new Date().getDay())) {
      await new UpdateResultsService().call()
      super.closeConnection()
    }
  }
}

JobFetchOdd.call()