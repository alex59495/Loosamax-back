import {createStore } from 'redux';
import reducers from '../src/reducers';

export const storeFactory = (initialState) => {
  return createStore(reducers, initialState)
}

export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)
