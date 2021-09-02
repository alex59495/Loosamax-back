import {FETCH_WEEK_BETS} from '../actions/types';

export default function betsReducer(state = [], action) {
  switch(action.type) {
    case FETCH_WEEK_BETS:
      return action.payload
    default:
      return state;
  }
}