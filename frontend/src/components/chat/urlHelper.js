export const createUrl = (loggedUserId, usersArr, type) => {
  if (type === '0') {
    return `${loggedUserId}-${usersArr[0].user_id}`;
  }
};
