import { DELETE_BET, CREATE_BET, FETCH_USER, UPDATE_PSEUDO } from '../actions/types'

export default function userReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false
    case UPDATE_PSEUDO:
      return {...state, pseudo: action.payload}
    case CREATE_BET:
      const userAddBet = state
      userAddBet.bets.push(action.payload)
      return {...userAddBet}
    case DELETE_BET:
      const userDeleteBets = state
      const bets = state.bets.filter(bet => bet._id !== action.payload)
      userDeleteBets.bets = bets
      return {...userDeleteBets}
    default:
      return state;
  }
}