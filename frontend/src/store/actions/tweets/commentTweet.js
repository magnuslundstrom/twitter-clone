import { getFormData } from '../../../helpers/getFormData';

export const COMMENT_TWEET_TYPE = 'COMMENT_TWEET';
// tweetData: name, commentBody, tweetId
export const commentTweetA = (commentData) => async (dispatch) => {
  const response = await fetch('/api/post-comment.php', {
    method: 'POST',
    body: getFormData(commentData),
  });
  if (!response.ok) return console.log(await response.text());
  const { id } = await response.json();

  commentData.comment_id = id;
  commentData.createdAt = new Date();
  commentData.body = commentData.commentBody;
  commentData.commenter_id = commentData.user_id;
  delete commentData.user_id;
  delete commentData.commentBody;

  dispatch({
    type: COMMENT_TWEET_TYPE,
    payload: commentData,
  });
};
