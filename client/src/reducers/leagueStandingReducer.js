import { FETCH_STANDING, CLEAN_STANDING } from '../actions/types';

export default function leagueStandingReducer(state = [], action) {
  switch(action.type) {
    case FETCH_STANDING:
      return [...action.payload]
    case CLEAN_STANDING:
        return []
    default:
      return state;
  }
}