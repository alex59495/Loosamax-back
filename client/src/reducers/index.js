import { combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import gamesReducer from './gamesReducer';
import leaguesStandingsReducer from './leaguesStandingsReducer';
import seasonsReducer from './seasonsReducer';

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  games: gamesReducer,
  leaguesStandings: leaguesStandingsReducer,
  years: seasonsReducer
});