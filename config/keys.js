switch(process.env.NODE_ENV) {
  case 'development':
    module.exports = require('./dev');
  // We use the same named variables in Github actions (testing) and Heroku
  default:
    module.exports = require('./prod');
}