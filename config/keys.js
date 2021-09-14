switch(process.env.NODE_ENV) {
  case 'test':
  case 'development':
    // HERE ARE THE LOCAL TESTS
    module.exports = require('./dev');
    break;
  default:
    // HERE ARE THE TESTS LAUNCHED ON GITHUB BECAUSE NODE_ENV DOESNT EXIST ON GITHUB ACTIONS
    // We use the same named variables in Github actions (testing) and Heroku
    // Don't forget to declare the variables in the .github/worflows/node.js.yml
    module.exports = require('./prod');
}
