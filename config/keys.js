console.log(process.env.NODE_ENV)
switch(process.env.NODE_ENV) {
  case 'production':
  // Use the same denomination in Github secret as we do in Heroku Var
  case 'test':
    module.exports = require('./prod');
  default:
    module.exports = require('./dev');
}