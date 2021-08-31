import axios from 'axios';
import { FETCH_GAMES } from './types'; 

export const fetchGames = () => async (dispatch) => 
{
  const res = await axios.get('/api/games/ligue1')
  const payload = {
    "ligue_1": res.data
  }
  dispatch({ type: FETCH_GAMES, payload: payload })
};