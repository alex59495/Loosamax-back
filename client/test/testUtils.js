import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../src/reducers';

export const storeFactory = (initialState) => {
  return createStore(reducers, initialState, applyMiddleware(thunk))
}

export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)
