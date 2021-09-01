import { FETCH_USER, UPDATE_PSEUDO } from '../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false
    case UPDATE_PSEUDO:
      return {...state, pseudo: action.payload}
    default:
      return state;
  }
}