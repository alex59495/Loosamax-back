import axios from 'axios';
import { CREATE_BET } from './types';

export const createBet = ({choice, team, user_id, game_id}, history) => async (dispatch) => 
{
  if(window.confirm(`Enregistrer ce pari (${team}) ?`)) {

    const data = {
      choice,
      user_id,
      game_id
    }

    try {
      const res = await axios({
        url: `/api/bets`,
        method: 'post',
        data: data
      });

      dispatch({ type: CREATE_BET, payload: [{game_id: game_id, choice: choice, user_id: user_id}] });

      res.data === 'Fire redirect' ? history.push(`/profile/${user_id}`) : alert('Oops, il y a eu une erreur, essaie de ré-engistrer ton pari')

    } catch(err) {
      console.log(err)
    }
  }
};