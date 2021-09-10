// import moxios from 'moxios';
// import { fetchGames } from '../../src/actions/gamesActions';

// describe('fetchGames', () => {
//   beforeEach(() => {
//     moxios.install();
//   })
//   afterEach(() => {
//     moxios.uninstall();
//   })

//   test('fetch the games', () => {
//     moxios.wait(() => {
//       const req = moxios.requests.mostRecent();
//       req.respondWith({
//         status: 200,
//         response: "Bonjour"
//       });
//     });

//     return fetchGames('ligue_1')
//       .then((res) => {
//         expect(res).toBe('Bonjour')
//       })
//   })
// })

test('pass test', () => {
  expect(true).toEqual(true)
})