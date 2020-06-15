import {
  authApi
} from '../api/api';
import {
  stopSubmit
} from 'redux-form';


const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  email: null,
  isAuth: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state;
  }
}

export const setAuthUserData = (email, isAuth) => ({
  type: SET_USER_DATA,
  payload: {
    email,
    isAuth
  }
});

export const login = (email, password, returnSecureToken) => {
  return dispatch => {
    authApi.login(email, password, returnSecureToken).then(response => {
      console.log(response.data);

      if (response.status === 200) {
        dispatch(setAuthUserData(response.data.email, true))
      }
    }).catch(e => {
        let error = 'Incorrect login or password';
        console.log(e)
        dispatch(stopSubmit('login', {
          _error: error
        }))
      }

    )
  }
}

export const logout = (email, isAuth) => {
  return dispatch => dispatch(setAuthUserData(email, isAuth));
}





export default authReducer;