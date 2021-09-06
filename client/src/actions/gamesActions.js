import axios from 'axios';
import { FETCH_GAMES } from './types'; 

export const fetchGames = (league) => async (dispatch) => 
{
  const res = await axios.get(`/api/games/${league}`)
  const payload = {
    [league]: res.data
  }
  dispatch({ type: FETCH_GAMES, payload: payload })
};