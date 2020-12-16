export const LOGIN_TYPE = 'LOGIN_ACTION';
export const loginA = (userData) => async (dispatch) => {
  dispatch({
    type: LOGIN_TYPE,
    payload: userData,
  });
};

/*
    Components that make use of loginA:
    ---------
    Index.jsx onSubmitHandler
*/

export const LOGOUT_TYPE = 'LOGOUT';
export const logoutA = () => async (dispatch) => {
  const res = await fetch('/api/logout.php');
  if (!res.ok) return;
  dispatch({
    type: LOGOUT_TYPE,
  });
};
