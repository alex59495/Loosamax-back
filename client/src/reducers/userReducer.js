import { DELETE_BET, CREATE_BET, FETCH_USER, UPDATE_PSEUDO } from '../actions/types'

export default function authReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false
    case UPDATE_PSEUDO:
      return {...state, pseudo: action.payload}
    case CREATE_BET:
      return {...state, actualBet: action.payload}
    case DELETE_BET:
      return {...state, actualBet: action.payload}
    default:
      return state;
  }
}