export const FOLLOW_USER_TYPE = 'FOLLOW_USER';
export const followUserA = (userId) => async (dispatch) => {
  const formData = new FormData();
  formData.append('userToFollowId', userId);
  const response = await fetch(`/api/follow-user.php`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) return console.log(await response.text());
  dispatch({
    type: FOLLOW_USER_TYPE,
    payload: userId,
  });
};

/*
    Components using this:
    Profile when you click on follow/unfollow

*/
