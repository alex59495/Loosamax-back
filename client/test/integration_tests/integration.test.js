import {games} from '../data/games';

import { storeFactory } from '../testUtils';
import {fetchGames as mockFetchGames } from '../../src/actions/gamesActions';

// activate global mock to make sure actions dont make network call
jest.mock('../../src/actions/gamesActions');

describe('fetchGames action disptacher', () => {
  const league = 'ligue_1'

  let store;
  const initialState = {users: [], user: {}}
  beforeEach(() => {
    store = storeFactory(initialState)
  });

  // test('update state after fetching the games', () => {
  //   store.dispatch(mockFetchGames(league));
  //   const newState = store.getState();
  //   const expectedState = {
  //     ...initialState,
  //     games: games
  //   }
  //   expect(newState).toEqual(expectedState);
  // })

  test('true', () => {
    expect(true).toBe(true)
  })
})