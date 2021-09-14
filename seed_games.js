
require('./models/User');
require('./models/Game');
require('./models/Bet');
const mongoose = require("mongoose");
const Game = mongoose.model('games');

const keys = require("./config/keys");

const dbSeed = async () => {
  // Connect the database

  mongoose.connect(keys.mongoURI,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Games creation

  const game1 = new Game({
    _id: "21987298759235723759283785230852083247293857",
    sport_key: "SportKey",
    home_team: `Wolverhampton`,
    away_team: `Manchester United`,
    commence_time: new Date(),
    home_odd: 5,
    draw_odd: 3.55,
    away_odd: 1.83,
    result: "2",
    home_score: 0,
    away_score: 1
  })

  const game2 = new Game({
    _id: "21987298759235723759283785230852083247293858",
    sport_key: "SportKey",
    home_team: `Nantes`,
    away_team: `Lyon`,
    commence_time: new Date(),
    home_odd: 5,
    draw_odd: 3.55,
    away_odd: 1.83,
    result: "2",
    home_score: 0,
    away_score: 1
  })

  const game3 = new Game({
    _id: "21987298759235723759283785230852083247293859",
    sport_key: "SportKey",
    home_team: `Troyes`,
    away_team: `Monaco`,
    commence_time: new Date(),
    home_odd: 4.35,
    draw_odd: 3.75,
    away_odd: 1.87,
    result: "2",
    home_score: 1,
    away_score: 2
  })

  const game4 = new Game({
    _id: "21987298759235723759283785230852083247293850",
    sport_key: "SportKey",
    home_team: `Lille`,
    away_team: `Montpellier`,
    commence_time: new Date(),
    home_odd: 1.72,
    draw_odd: 4,
    away_odd: 5.5,
    result: "1",
    home_score: 2,
    away_score: 1
  })

  const game5 = new Game({
    _id: "21987298759235723759283785230852083247293853",
    sport_key: "SportKey",
    home_team: `Erzezboub`,
    away_team: `Fortuna Dusseldorf`,
    commence_time: new Date(),
    home_odd: 3.55,
    draw_odd: 3.15,
    away_odd: 1.8,
    result: "2",
    home_score: 0,
    away_score: 1
  })


  const games = [game1, game2, game3, game4, game5]

  // Data creation
  const datas = [...games]
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