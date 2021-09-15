import { FETCH_STANDING } from '../actions/types';

export default function leagueStandingReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_STANDING:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}