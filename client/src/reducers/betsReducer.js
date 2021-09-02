import {FETCH_WEEK_BETS, GET_USER_BETS} from '../actions/types';

export default function betsReducer(state = [], action) {
  switch(action.type) {
    case FETCH_WEEK_BETS:
      return [...action.payload]
    case GET_USER_BETS:
      return [...action.payload]
    default:
      return state;
  }
}