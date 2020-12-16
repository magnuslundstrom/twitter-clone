export const PUSH_CHAT_TYPE = 'PUSH_CHAT';

export const pushChatA = (userId) => async (dispatch, getState) => {

    const conv = await fetch(`/api/chat/get-new-conversation.php?receiverId=${userId}`);
    if (!conv.ok) return console.log(await conv.text());

    const { conversation } = await conv.json();

    dispatch({
        type: PUSH_CHAT_TYPE,
        payload: conversation
    })




}


/*
    Components using this:
    Chatlist.jsx is using this ONMOUNT if:
    there is a userId in the paramsObj AND !state.chatList.loading

*/







