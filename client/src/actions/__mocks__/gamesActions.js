module.exports = {
  ...jest.requireActual('../gamesActions'),
  __esModule: true,
  fetchGames: jest.fn().mockReturnValue(Promise.resolve({games: "BONJOUR"}))
}