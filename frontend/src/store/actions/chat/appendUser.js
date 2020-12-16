export const APPEND_USER_TYPE = 'APPEND_USER';

export const appendUserA = (userName) => {
  return {
    type: APPEND_USER_TYPE,
    payload: userName,
  };
};
