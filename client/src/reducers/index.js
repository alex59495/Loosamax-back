import { combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import gamesReducer from './gamesReducer';
import betsReducer from './betsReducer';

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  games: gamesReducer,
  bets: betsReducer
});