export const SEND_MESSAGE_TYPE = 'SEND_MESSAGE';

export const sendMessageA = (msg) => async (dispatch, getState) => {
  const { chatList, chatRoom, auth } = getState();
  if (msg.length === 0 || chatList.selectedConvId === '0' || !chatRoom.validated) return;

  const messageObj = {
    body: msg,
    user_id: auth.user.user_id,
    created_at: new Date(),
  };

  const formData = new FormData();
  formData.append('conversation_fk', chatRoom.validated);
  formData.append('body', msg);

  const res = await fetch(`/api/send-message.php`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) return console.log(await res.text());

  const { id } = await res.json();

  messageObj.message_id = id;

  dispatch({
    type: SEND_MESSAGE_TYPE,
    payload: messageObj,
  });

  return id;
};
