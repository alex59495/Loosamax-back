import {createStore } from 'redux';
import reducers from '../src/reducers';

export const storeFactory = (initialState) => {
  return createStore(reducers, initialState)
}