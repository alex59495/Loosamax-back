const mongoose = require('mongoose');
const keys = require('../config/keys');
const mongoDb = keys.mongoURI;
const request = require('supertest');
const dbHandler = require('./db-handler');

const games = require('./data/games');
const app = require('../app');

describe('Should access current user', () => {

  beforeAll(async () => {
    await dbHandler.connect()
  });

  afterEach(async () => {
    await dbHandler.clearDatabase()
  });

  afterAll(async () => {
    await dbHandler.closeDatabase()
  });

  it('should access the games', async () => {
    const res = await request(app)
      .get('/api/games/ligue_1')
    console.log(res.body)
  })

})