import axios from 'axios';
import Swal from 'sweetalert2';
import { CREATE_BET, DELETE_BET } from './types';

export const createBet = ({choice, team, user_id, game}, history) => async (dispatch) => 
{
  Swal.fire({
    title: `Enregistrer ce pari (${team}) ?`,
    showCancelButton: true,
    confirmButtonColor: '#4c956c',
    cancelButtonColor: '#bc4b51',
    confirmButtonText: 'Yes, Sir !',
    cancelButtonText: 'Oula, Non !'
  }).then(async (result) => {
    if (result.isConfirmed) {
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
  
        switch(res.data.res) {
          case 'Fire redirect':
            dispatch({ type: CREATE_BET, payload: {choice: choice, game: game, _id: res.data._id} });
            history.push(`/profile/${user_id}`);
            break;
          case 'You already have a bet':
            Swal.fire({
              icon: 'error',
              iconColor: '#bc4b51',
              title: 'Oops...',
              confirmButtonColor: '#4c956c',
              confirmButtonText: "J'ai compris",
              html: 'Tu as déjà un pari en cours vil chenapan, tu ne peux pas en créer un nouveau pour le moment.<br> Pour supprimer ton pari actuel rends toi dans ton Profil.',
            })
            break;
          case 'Bet already taken':
            Swal.fire({
              icon: 'warning',
              iconColor: '#bc4b51',
              title: 'Oops...',
              confirmButtonColor: '#4c956c',
              confirmButtonText: "J'ai compris",
              html: 'Ce pari a déjà été sélectionné par un autre joueur qui a eu le nez fin (#Valé #Loic ?).<br> Pas le choix il va falloir en prendre un autre.',
            })
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Oops... Il y a eu une erreur',
              html: 'Essaie de ré-engistrer ton pari.',
            })
        }
  
      } catch(err) {
        console.log(err)
      }
    }
  })
  
};

export const deleteBet = (id) => async (dispatch) => 
{
  Swal.fire({
    title: `Tu veux supprimer ce pari ?`,
    showCancelButton: true,
    confirmButtonColor: '#4c956c',
    cancelButtonColor: '#bc4b51',
    confirmButtonText: 'Affirmatif !',
    cancelButtonText: 'Bah non ..'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`/api/bets/${id}`);

        switch(res.status) {
          case 200:
            dispatch({ type: DELETE_BET, payload: id});
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Oops... Il y a eu une erreur',
              html: 'Essaie encore.',
            })
        }

      } catch(err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops... Il y a eu une erreur',
          html: 'Essaie encore.',
        })
      }
    }
  })
}

