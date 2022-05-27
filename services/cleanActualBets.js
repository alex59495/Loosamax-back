const { userModel } = require('../models/User');

module.exports = class CreateNewSeasonService {
  call = async () => {
    const users = await userModel.find();

    await Promise.all(users.map(user => {
      user.bets = [];
      return user.save();
    }));
    console.log(`The bets were cleaned`)
  }
}