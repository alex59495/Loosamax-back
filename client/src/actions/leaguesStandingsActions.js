import axios from 'axios';
import { FETCH_STANDING } from './types'; 

export const fetchStanding = (league) => async (dispatch, getState) => {
  if(!getState().leaguesStandings[league]) {
    const res = await axios({
      method: 'get',
      url: `/api/${league}/standings`,
    })

    const payload = {
      [league]: res.data
    }
    dispatch({type: FETCH_STANDING, payload: payload})
  }
}