const keys = require('../config/keys')
const Queue = require('bull');

const myJobQueue = new Queue('myJob', keys.REDIS_URL);

myJobQueue.process(function(job,done){
  // your job complex operations 
  console.log(job.data.jobData)
  done();
})