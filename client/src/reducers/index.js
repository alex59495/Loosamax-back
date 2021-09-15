import { combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import gamesReducer from './gamesReducer';
import leagueStandingReducer from './leagueStandingReducer';

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  games: gamesReducer,
  leagueStanding: leagueStandingReducer
});