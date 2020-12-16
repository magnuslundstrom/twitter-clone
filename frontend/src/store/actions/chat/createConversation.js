export const CREATE_CONVERSATION_TYPE = 'CREATE_CONVERSATION';

export const createConversationA = (id, userName) => async (dispatch) => {
  const formData = new FormData();
  formData.append('receiverId', id);
  const res = await fetch(`/api/create-conversation.php`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) return console.log(await res.text());

  const { conversation_id } = await res.json();

  dispatch({
    type: CREATE_CONVERSATION_TYPE,
    payload: {
      validated: conversation_id,
      users: [
        {
          user_id: id,
          name: userName,
        },
      ],
    },
  });
};
