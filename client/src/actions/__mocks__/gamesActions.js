import {games} from '../../../test/data/games';

module.exports = {
  ...jest.requireActual('..'),
  __esModule: true,
  fetchGames: jest.fn().mockReturnValue(Promise.resolve({games: games}))
}