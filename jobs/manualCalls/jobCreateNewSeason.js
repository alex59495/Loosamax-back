const Job = require('../job');
const CreateNewSeasonService = require('../../services/createNewSeasonService');

class JobCreateNewSeason extends Job {
  static call = async () => {
    await new CreateNewSeasonService().call();
    super.closeConnection();
    console.log('Season has been created');
    process.exit(0);
  };
}

JobCreateNewSeason.call();
