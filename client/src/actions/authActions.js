import axios from 'axios';
import { setAlert } from './alertActions';
import setAuthToken from '../utils/setAuthToken';

import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     AUTH_ERROR,
     USER_LOADED,
     // USER_LOADING,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
     if (localStorage.token) {
          setAuthToken(localStorage.token);
     }
     try {
          const res = await axios.get('/api/auth');
          dispatch({
               type: USER_LOADED,
               payload: res.data,
          });
     } catch (err) {
          dispatch({
               type: AUTH_ERROR,
          });
     }
};

// Register user
export const register = ({ firstName, lastName, email, password }) => async (
     dispatch
) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ firstName, lastName, email, password });
     try {
          const res = await axios.post('api/users', body, config);
          dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data,
          });
          dispatch(loadUser());
     } catch (err) {
          const errors = err.response.data.errors;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: REGISTER_FAIL,
          });
     }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };

     const body = JSON.stringify({ email, password });

     try {
          const res = await axios.post('/api/auth', body, config);
          console.log(res);
          dispatch({
               type: LOGIN_SUCCESS,
               payload: res.data,
          });

          dispatch(loadUser());
     } catch (err) {
          const errors = err.response.data.errors;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: LOGIN_FAIL,
          });
     }
};