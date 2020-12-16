export const PUSH_MESSAGE_TYPE = 'PUSH_MESSAGE';

export const pushMessageA = (messageObj) => {
  return {
    type: PUSH_MESSAGE_TYPE,
    payload: messageObj,
  };
};
