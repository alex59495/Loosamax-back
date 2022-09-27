const cronJob = require('node-cron');

const FetchOdd = require('./jobs/jobFetchOdd.js');
const UpdateResult = require('./jobs/jobUpdateResult.js');
const AutomaticChooseGame = require('./jobs/jobAutomaticChooseGame')

module.exports = () => {
  // Every hour
  const scheduledHourlyJobs = cronJob.schedule("0 * * * *", () => {
    FetchOdd.call()
    // Add your custom logic here
  });

  const scheduled10MinJobs = cronJob.schedule("*/10 * * * *", () => {
    UpdateResult.call()
    // Add your custom logic here
  });

  const scheduledFridayJobs = cronJob.schedule("* 19 * * Friday", () => {
    AutomaticChooseGame.call()
    // Add your custom logic here
  });

  scheduledHourlyJobs.start();
  scheduled10MinJobs.start();
  scheduledFridayJobs.start();
}