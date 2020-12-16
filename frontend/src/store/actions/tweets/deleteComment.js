export const DELETE_COMMENT_TYPE = 'DELETE_COMMENT';

export const deleteCommentA = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/delete-comment.php?commentId=${commentId}`);
  if (!response.ok) return console.log(await response.text());

  dispatch({
    type: DELETE_COMMENT_TYPE,
    payload: commentId,
  });
};
