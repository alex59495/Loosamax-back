import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gamesReducer from './gamesReducer';
import betsReducer from './betsReducer';

export default combineReducers({
  auth: authReducer,
  games: gamesReducer,
  bets: betsReducer
});