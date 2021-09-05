const mongoose = require('mongoose');

const User = mongoose.model('users');

const fetchCurrentUser = async (req, res) => {

  if(req.user) {

    user = {
      _id: req.user._id, 
      googleId: req.user.googleId,
      pseudo: req.user.pseudo,
      bets: req.user.bets
    }

    res.send({...user});
  }
  res.send(false);
}

const patchCurrentUser = async (req, res) => {
  const id = req.params.id
  const pseudo = req.body.pseudo

  try {
    const user = await User.updateOne({
      _id: id
    },
    {$set: { pseudo: pseudo }});

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