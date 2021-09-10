switch(process.env.NODE_ENV) {
  case 'development':
    module.exports = require('./dev');
  // We use the same named variables in Github actions (testing) and Heroku
  // Don't forget to declare the variables in the .github/worflows/node.js.yml
  default:
    module.exports = require('./prod');
}