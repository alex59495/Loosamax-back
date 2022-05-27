import axios from 'axios';
import { FETCH_USER, UPDATE_USER, FETCH_USERS} from './types'; 

export const fetchUser = () => async (dispatch) => 
{
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
};

export const fetchUsers = (selectedYear = null) => async (dispatch) => 
{
  if(selectedYear !== "actual") {
    const season = await axios.get(`/api/seasons/${selectedYear}`);
    const users = season?.data?.users ?? [];
    dispatch({ type: FETCH_USERS, payload: users })
    return;
  }

  const { data } = await axios.get('/api/users')

  dispatch({ type: FETCH_USERS, payload: data })
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
