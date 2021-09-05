const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Bet = mongoose.model('bets');
const User = mongoose.model('users');

const createBets = async (req, res) => {

  const { choice, game_id, odd } = req.body

  try {
    const actualBet = req.user.bets.find(bet => bet.game.result === null)

    if (!actualBet) {
      const bet = await new Bet({
        choice,
        game: game_id,
        odd: odd
      })
  
      await User.updateOne({_id: req.user._id}, {$push: {"bets": bet}})

      // Redirection
      res.status(200).send({res: 'Fire redirect', _id: bet._id})
    } else {
      res.status(200).send({res: 'Existing game'})
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