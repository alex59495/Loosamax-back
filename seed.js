
require('./models/User');
require('./models/Game');
require('./models/Bet');
const mongoose = require("mongoose");
const User = mongoose.model('users');
const Game = mongoose.model('games');
const Bet = mongoose.model('bets');

const keys = require("./config/keys");

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

  // Games creation

  const gameAlex = new Game({
    _id: "1",
    sport_key: "SportKey",
    home_team: `homeTeam1`,
    away_team: `awayTeam1`,
    commence_time: new Date(),
    home_odd: 2.43,
    draw_odd: 3.21,
    away_odd: 1.67,
  })

  const gameMax = new Game({
    _id: "2",
    sport_key: "SportKey",
    home_team: `homeTeam2`,
    away_team: `awayTeam2`,
    commence_time: new Date(),
    home_odd: 2.1,
    draw_odd: 1.81,
    away_odd: 3.34,
  })

  const gameAlexWin = new Game({
    _id: "3",
    sport_key: "SportKey",
    home_team: `homeTeam3`,
    away_team: `awayTeam3`,
    commence_time: new Date(),
    home_odd: 3.54,
    draw_odd: 2.12,
    away_odd: 1.84,
    result: "N",
    home_score: 2,
    away_score: 1
  })

  const gameMaxWin = new Game({
    _id: "4",
    sport_key: "SportKey",
    home_team: `homeTeam4`,
    away_team: `awayTeam4`,
    commence_time: new Date(),
    home_odd: 3.24,
    draw_odd: 2.46,
    away_odd: 1.63,
    result: "2",
    home_score: 1,
    away_score: 4
  })

  const gameAlexLoose = new Game({
    _id: "5",
    sport_key: "SportKey",
    home_team: `homeTeam5`,
    away_team: `awayTeam5`,
    commence_time: new Date(),
    home_odd: 2.23,
    draw_odd: 2.76,
    away_odd: 1.98,
    result: "N",
    home_score: 3,
    away_score: 3
  })


  const gameMaxLoose = new Game({
    _id: "6",
    sport_key: "SportKey",
    home_team: `homeTeam6`,
    away_team: `awayTeam6`,
    commence_time: new Date(),
    home_odd: 4.32,
    away_odd: 2.14,
    draw_odd: 2.17,
    result: "2",
    home_score: 1,
    away_score: 2
  })

  const games = [gameAlex, gameMax, gameAlexWin, gameMaxWin, gameAlexLoose, gameMaxLoose]

  // Bets creation

  maxBet = new Bet ({
    game: gameMax._id,
    choice: "1"
  })

  alexBet = new Bet ({
    game: gameAlex._id,
    choice: "1"
  })

  maxBetLost = new Bet ({
    game: gameMaxLoose._id,
    choice: "N"
  })

  alexBetLost = new Bet ({
    game: gameAlexLoose._id,
    choice: "1"
  })

  maxBetWin = new Bet ({
    game: gameMaxWin._id,
    choice: "2"
  })

  alexBetWin = new Bet ({
    game: gameAlexWin._id,
    choice: "N"
  })

  alexBets = [alexBet, alexBetLost, alexBetWin]
  maxBets = [maxBet, maxBetLost, maxBetWin]

  // Users creation

  const max = new User ({
    googleId: keys.googleIDMax,
    pseudo: 'MaxSteel',
    bets: [...maxBets],
    color: "#bc4b51"
  })

  const alex = new User ({
    googleId: keys.googleIDAlex,
    pseudo: 'Alexis',
    bets: [...alexBets],
    color: "#bc4b51"
  })


  const users = [max, alex]

  // Data creation
  const datas = [...users, ...games]
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