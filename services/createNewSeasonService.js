const Season = require('../models/Season');
const { userModel } = require('../models/User');
require('../models/Game');


module.exports = class CreateNewSeasonService {
  call = async () => {
    const users = await userModel.find();

    const year = new Date().getFullYear();

    const season = await new Season({
      year: year,
      users: users,
    })

    await season.save();
  }
}