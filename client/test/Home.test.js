import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import Home from '../src/components/Home';
import { Provider } from 'react-redux';

import { storeFactory } from './testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter()});

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return mount(<Provider store={store}><Home /></Provider>)
}

describe('user logged', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({user: {_id: '1234'}})
  })
  test('render Home', () => {
  })
})

describe('user unlogged', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({user: {}})
  })
  test('render Home', () => {
  })
})