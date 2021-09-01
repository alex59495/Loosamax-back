import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';
import betsReducer from './betsReducer';

export default combineReducers({
  user: userReducer,
  games: gamesReducer,
  bets: betsReducer
});