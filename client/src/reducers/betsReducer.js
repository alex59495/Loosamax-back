import { CREATE_BET } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case CREATE_BET:
      return [...action.payload];
    default:
      return state;
  }
}