import axios from 'axios';
import { FETCH_GAMES } from './types'; 

export const fetchGames = (league) => async (dispatch) => 
{
  const res = await axios.get(`/api/games/${league}`)
  const filterGames = res.data.filter(game => {
    return game.commence_time > Date.now()
  });
  const payload = {
    [league]: filterGames
  }
  dispatch({ type: FETCH_GAMES, payload: payload })
};