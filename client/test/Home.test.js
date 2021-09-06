import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import Home from '../src/components/Home';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import { storeFactory } from './testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter()});

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>)
}

describe('user logged', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({user: {_id: '1234'}})
  })
  test('render Home avec button profile', () => {
    const buttonProfile = wrapper.find("[data-test='button-profile']")
    expect(buttonProfile.length).toBe(1);
  })
})

describe('user unlogged', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({user: false})
  })
  test('render Home avec button login', () => {
    const buttonProfile = wrapper.find("[data-test='button-login']")
    expect(buttonProfile.length).toBe(1);
  })
})