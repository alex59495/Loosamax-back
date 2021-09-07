import axios from 'axios';
import { FETCH_USER, UPDATE_USER, FETCH_USERS} from './types'; 

export const fetchUser = () => async (dispatch) => 
{
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
};

export const fetchUsers = () => async (dispatch) => 
{
  const res = await axios.get('/api/users')
  dispatch({ type: FETCH_USERS, payload: res.data })
};

export const updateUser = (user, values) => {
  axios({
    method: 'patch',
    url: `/api/current_user/${user._id}`,
    data: values
  })
  return {
    type: UPDATE_USER,
    payload: values
  }
}
