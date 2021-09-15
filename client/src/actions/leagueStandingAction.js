import axios from 'axios';
import { FETCH_STANDING, CLEAN_STANDING } from './types'; 

import keys from 'config/keys';

export const fetchStanding = (leagueAlias) => async (dispatch, getState) => {
  if(!getState().leagueStanding[leagueAlias]) {
    const res = await axios({
      method: 'get',
      url: `https://api.football-data.org/v2/competitions/${leagueAlias}/standings`,
      headers: {'X-Auth-Token': keys.footballApiDataKey}
    })
    const payload = {
      [leagueAlias]: res.data.standings[0].table
    }
    dispatch({type: FETCH_STANDING, payload: payload})
  }
}

export const cleanStanding = () => {
  return {
    type: CLEAN_STANDING,
    payload: []
  }
}