import React from 'react';
import { mount } from 'enzyme';
import Header from '../src/components/Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { storeFactory, findByTestAttr } from './testUtils';

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>)
}

describe('user logged', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({user: {_id: '1234'}})
  })
  test('render Header avec button logout', () => {
    const headerLogout = findByTestAttr(wrapper, 'logout')
    expect(headerLogout.length).toBe(1);
  })
})

describe('user unlogged', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({user: false})
  })
  test('render Home avec button login', () => {
    const headerLogin = findByTestAttr(wrapper, 'login')
    expect(headerLogin.length).toBe(1);
  })
})