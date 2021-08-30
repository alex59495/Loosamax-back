import axios from 'axios';
import { FETCH_USER, UPDATE_PSEUDO } from './types'; 

export const fetchUser = () => async (dispatch) => 
{
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
};

export const changePseudo = (id) => async (dispatch) => {
 const res = axios.patch(`/api/current_user/${id}`)
 dispatch({ type: UPDATE_PSEUDO, payload: res.data })
}