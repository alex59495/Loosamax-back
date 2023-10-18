const FetchOdd = require('../jobFetchOdd.js');

const callManual = async () => {
  await FetchOdd.call();
  console.log('Odds have been fetched');
  process.exit(0);
};

callManual();
