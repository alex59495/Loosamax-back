const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {betModel} = require('../models/Bet');
const User = require('../models/User');

const createBets = async (req, res) => {

  const { choice, game_id } = req.body

  try {
    const actualBet = req.user.bets.find(bet => bet.game.result === null);
    const usersBets = await User.find().populate(
      {
        path: 'bets',
        populate: {
          path: 'game',
          model: 'games'
        }
      }
    )

    const existingBet = usersBets.some(user => {
      return user.bets.some(bet => bet.game.result === null && bet.game._id === game_id)
    })

    if (existingBet) {
      res.status(200).send({res: 'Bet already taken'})
    } else if(actualBet) {
      res.status(200).send({res: 'You already have a bet'})
    } else {

      const bet = await new betModel({
        choice,
        game: game_id
      })
  
      await User.updateOne({_id: req.user._id}, {$push: {"bets": bet}})

      // Redirection
      res.status(200).send({res: 'Fire redirect', _id: bet._id})
    }

  } catch(err) {
    res.status(422).send(err)
  }
}

const deleteBet = async (req, res) => {
  const id = req.params.id

  try {
    await User.updateOne({_id: req.user._id}, {$pull: {"bets": { _id: new ObjectId(id) }}})
    res.status(200).send('Deleted');

  } catch(err) {
    res.status(422).send(err)
  }
};

module.exports = {createBets, deleteBet}