
require('../models/User');
require('../models/Game');
require('../models/Bet');
const mongoose = require("mongoose");
const User = mongoose.model('users');
const Game = mongoose.model('games');
const Bet = mongoose.model('bets');

const keys = require("../config/keys");

const dbSeed = async () => {
  // Connect the database

  mongoose.connect(keys.mongoURI,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Delete existing data

  await User.deleteMany({})
  await Bet.deleteMany({})
  await Game.deleteMany({})

  // Users creation

  const max = new User ({
    googleId: keys.googleIDMax,
    pseudo: 'MaxSteel'
  })

  const alex = new User ({
    googleId: keys.googleIDAlex,
    pseudo: 'Alexis'
  })


  const users = [max, alex]

  // Games creation

  const gamesNoResults = []
  const gamesResults = []

  for(let i = 1; i < 10; i++) {
    const game = new Game({
      _id: i.toString(),
      sport_key: "SportKey",
      home_team: `homeTeam${i}`,
      away_team: `awayTeam${i}`,
      commence_time: new Date(),
      away_odd: 2.2,
      home_odd: 1.5,
      draw_odd: 6,
    })
    gamesNoResults.push(game)
  }

  for(let i = 10; i < 20; i++) {
    gamesResults.push(new Game({
      _id: i.toString(),
      sport_key: "SportKey",
      home_team: `homeTeam${i}`,
      away_team: `awayTeam${i}`,
      commence_time: new Date(),
      away_odd: 2.2,
      home_odd: 1.5,
      draw_odd: 6,
      result: 1,
      home_score: 2,
      away_score: 1
    }))
  }

  // Bets creation

  maxBet = new Bet ({
    user: max._id,
    game: gamesNoResults[Math.floor(Math.random() * gamesNoResults.length)]._id,
    choice: 1,
    odd: 1.5
  })

  alexBet = new Bet ({
    user: alex._id,
    game: gamesNoResults[Math.floor(Math.random() * gamesNoResults.length)]._id,
    choice: 1,
    odd: 1.5
  })

  maxBetLost = new Bet ({
    user: max._id,
    game: gamesResults[Math.floor(Math.random() * gamesResults.length)]._id,
    choice: 2,
    odd: 2.2
  })

  alexBetLost = new Bet ({
    user: alex._id,
    game: gamesResults[Math.floor(Math.random() * gamesResults.length)]._id,
    choice: 2,
    odd: 2.2
  })

  maxBetWin = new Bet ({
    user: max._id,
    game: gamesResults[Math.floor(Math.random() * gamesResults.length)]._id,
    choice: 1,
    odd: 1.5
  })

  alexBetWin = new Bet ({
    user: alex._id,
    game: gamesResults[Math.floor(Math.random() * gamesResults.length)]._id,
    choice: 1,
    odd: 1.5
  })

  const bets = [maxBet, alexBet, maxBetLost, alexBetLost, maxBetWin, alexBetWin]

  // Data creation
  const datas = [...users, ...gamesNoResults, ...gamesResults, ...bets]
  datas.map(async (data, index) => {
    await data.save((err, result) => {
      if (index === datas.length - 1) {
        console.log("Data created!");
        mongoose.disconnect();
      }
    });
  });
}
dbSeed();