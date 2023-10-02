require('dotenv').config();
const request = require('supertest');
const dbHandler = require('./db-handler');

const games = require('./data/games');
const Game = require('../models/Game');

const app = require('../app');
const leaguesIdentifiers = require('../helpers/leaguesIdentifiers');

describe('Games endpoints', () => {
  beforeAll(async () => {
    await dbHandler.connect();
  });

  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  afterAll(async () => {
    await dbHandler.closeDatabase();
  });

  it('should access the games', async () => {
    for (const game of games) {
      const gameDb = new Game(game);
      await gameDb.save();
    }

    const numGamesFoundFrance = games.filter(
      (game) => game.sport_key === leaguesIdentifiers['ligue_1'].name
    ).length;
    const res = await request(app)
      .get('/api/games/ligue_1')
      .expect('Content-Type', /json/);

    expect(res.body).toHaveLength(numGamesFoundFrance);
  });
});
