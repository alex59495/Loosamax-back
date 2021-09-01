import axios from 'axios';
import { FETCH_USER, UPDATE_PSEUDO } from './types'; 

export const fetchUser = () => async (dispatch) => 
{
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
};

export const changePseudo = (user, values) => {
  axios({
    method: 'patch',
    url: `/api/current_user/${user._id}`,
    data: values
  })
  return {
    type: UPDATE_PSEUDO,
    payload: values.pseudo
  }
}