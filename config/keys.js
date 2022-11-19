switch (process.env.NODE_ENV) {
  case 'test':
  case 'development':
    // HERE ARE THE LOCAL TESTS
    module.exports = require('./dev');
    break;
  default:
    console.log(
      '%cprocess.env',
      'background: purple; color: white',
      process.env
    );
    // HERE ARE THE TESTS LAUNCHED ON GITHUB BECAUSE WE USE NODE_ENV=PRODUCTION ON GITHUB ACTIONS
    // We use the same named variables in Github actions (testing) and Heroku
    // Don't forget to declare the variables in the .github/worflows/node.js.yml
    module.exports = require('./prod');
}
