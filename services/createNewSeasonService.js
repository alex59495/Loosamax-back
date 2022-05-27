const Season = require('../models/Season');
const { userModel } = require('../models/User');

module.exports = class CreateNewSeasonService {
  call = async () => {
    const users = await userModel.find();
    const year = new Date().getFullYear();

    const existingSeason = await Season.exists({ year: year });
    if (existingSeason) {
      console.log("A season with this year already exists");
      return;
    }

    const season = await new Season({
      year: year,
      users: users,
    })

    await season.save();      
    console.log("The season was created");
  }
}