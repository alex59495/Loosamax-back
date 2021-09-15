const axios = require('axios');

const pingHeroku = async () => {

  if (new Date().getHours() > 7) {
    await axios.get('https://loosamaxx59.herokuapp.com/')
    return
  }
};

pingHeroku()