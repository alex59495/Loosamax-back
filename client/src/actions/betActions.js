import axios from 'axios';
import { CREATE_BET, DELETE_BET, GET_BETS } from './types';

export const createBet = ({choice, team, user_id, game}, history) => async (dispatch) => 
{
  if(window.confirm(`Enregistrer ce pari (${team}) ?`)) {

    const data = {
      choice,
      user_id,
      game_id: game._id
    }

    try {
      const res = await axios({
        url: `/api/bets`,
        method: 'post',
        data: data
      });

      switch(res.data) {
        case 'Fire redirect':
          dispatch({ type: CREATE_BET, payload: {choice: choice, game: game} });
          history.push(`/profile/${user_id}`);
          break;
        case 'Existing game':
          alert('Tu as déjà un pari en cours, tu ne peux pas en créer un nouveau pour le moment. Pour supprimer ton pari actuel rends toi dans ton Profil');
          break;
        default:
          alert('Oops, il y a eu une erreur, essaie de ré-engistrer ton pari.');
      }

    } catch(err) {
      console.log(err)
    }
  }
};

export const deleteBet = (id) => async (dispatch) => 
{
  if(window.confirm('Tu veux supprimer ton pari ?')) {
    try {
      const res = await axios.delete(`/api/bets/${id}`);

      switch(res.status) {
        case 200:
          dispatch({ type: DELETE_BET, payload: {}});
          break;
        default:
          alert('Oops, il y a eu une erreur, réessaie de supprimer ton pari.');
      }

    } catch(err) {
      alert('Oops, il y a eu une erreur, réessaie de supprimer ton pari.');
    }
  }
}

export const fetchBets = (userId) => async (dispatch) => 
{
  try {
    const res = await axios.get(`/api/users/${userId}/bets`);

    switch(res.status) {
      case 200:
        dispatch({ type: GET_BETS, payload: [...res.data]});
        break;
      default:
        alert('Oops, il y a eu une erreur.');
    }

  } catch(err) {
    alert('Oops, il y a eu une erreur');
  }
}