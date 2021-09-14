const User = require('../models/User');
const Game = require('../models/Game');
const dbHandler = require('./db-handler');

describe('Test Models', () => {

  const mockUser = {
    pseudo: 'John', 
    googleId: "133726428", 
    emails: ["john@email.com"], 
    color: "#ffffff"
  };

  const mockGame = {
    _id: "1234556",
    away_team: "Test 1",
    home_team: "Test 2",
    home_odd: 1.5,
    away_odd: 2,
    draw_odd: 3,
    result: null,
    away_score: null,
    home_score: null
  };


  beforeAll(async () => {
    await dbHandler.connect()
  });

  afterEach(async () => {
    await dbHandler.clearDatabase()
  });

  afterAll(async () => {
    await dbHandler.closeDatabase()
  });

  it('save and get a user', async () => {
    const user = new User(mockUser);
    await user.save();

    const foundUser = await User.findOne(mockUser)
    expect(foundUser.emails).toEqual(mockUser.emails)
    expect(foundUser.googleId).toEqual(mockUser.googleId)
    expect(foundUser.color).toEqual(mockUser.color)
    expect(foundUser.pseudo).toEqual(mockUser.pseudo)
  });

  it('save and get a Game', async () => {
    const game = new Game(mockGame);
    await game.save();

    const foundGame = await Game.findOne(mockGame)
    expect(foundGame.away_team).toEqual(mockGame.away_team)
    expect(foundGame.result).toEqual(mockGame.result)
  });
})