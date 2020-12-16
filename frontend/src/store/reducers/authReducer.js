import { LOGIN_TYPE, LOGOUT_TYPE } from '../actions/auth/login';
import { EDIT_PROFILE_TYPE } from '../actions/profile/editProfile';

const initState = {
  authorized: false,
  user: null,
  // authorized: true,
  // user: {
  //   user_id: '1',
  //   name: 'Lars Johansen',
  //   email: 'lswift@gmail.com',
  // },
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_TYPE:
      return { authorized: true, user: { ...action.payload } };
    case EDIT_PROFILE_TYPE: {
      const newState = { ...state };
      newState.user.fullName = action.payload.firstName + ' ' + action.payload.lastName;
      newState.user.email = action.payload.email;
      return newState;
    }
    case LOGOUT_TYPE:
      return { authorized: false, user: null };
    default:
      return state;
  }
};

export default authReducer;

/*
Components that make use of this:
----------
App.jsx:
Makes use of authorized to render different routes
---------
Nav.jsx
Makes use of user.user_id to profile link
*/
