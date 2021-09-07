const mongoose = require('mongoose');

const User = mongoose.model('users');

const fetchCurrentUser = async (req, res) => {
  res.send(req.user);
}

const patchCurrentUser = async (req, res) => {
  const id = req.params.id
  const pseudo = req.body.pseudo || req.user.pseudo
  const color = req.body.color || req.user.color

  try {
    const user = await User.updateOne({
      _id: id
    },
    {$set: { pseudo: pseudo, color: color }});

    res.send(user)
  } catch(err) {
    res.status(422).send(err);
  }
}

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find().populate(
      {
        path: 'bets',
        populate: {
          path: 'game',
          model: 'games'
        }
      }
    )
    res.send(users)

  }catch(err) {
    res.status(422).send(err)
  }
}

module.exports = {fetchCurrentUser, patchCurrentUser, fetchUsers}