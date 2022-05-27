import { FETCH_YEARS } from '../actions/types';

export default function seasonsReducer(state = [], action) {
  switch(action.type) {
    case FETCH_YEARS:
      return action.payload
    default:
      return state;
  }
}