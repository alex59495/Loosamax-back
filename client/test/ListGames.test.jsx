// activate global mock to make sure actions doesnt make network call
import React from 'react';
import { mount } from 'enzyme';
import ListGames from '../src/components/Games/ListGames';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import {games} from './data/games';
import {fetchGames as mockFetchGames } from '../src/actions/gamesActions';
import { storeFactory, findByTestAttr } from './testUtils';

// activate global mock to make sure actions dont make network call
jest.mock('../src/actions/gamesActions');

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <ListGames league='ligue_1' fetchGames={mockFetchGames} games={games} />
      </BrowserRouter>
    </Provider>)
}

describe('Component ListGames', () => {
  beforeEach(() => {
    mockFetchGames.mockClear()
  })

  test('render without error', () => {
    const wrapper = setup({games: games});
    const listGameComponent = findByTestAttr(wrapper, 'list-games');
    expect(listGameComponent).toHaveLength(1);
  })
  
  test('fetch games is called when the component is mounted', () => {
    const wrapper = setup();
    expect(mockFetchGames).toHaveBeenCalledTimes(1)
  })
})