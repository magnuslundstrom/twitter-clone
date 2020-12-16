import { getFormData } from '../../../helpers/getFormData';

export const EDIT_PROFILE_TYPE = 'EDIT_PROFILE';
export const editProfileA = (newDataObj) => async (dispatch) => {
  console.log(newDataObj);
  const formData = getFormData(newDataObj);
  const profileResponse = await fetch(`/api/edit-profile.php`, {
    method: 'POST',
    body: formData,
  });
  if (!profileResponse.ok) return console.log(await profileResponse.text());

  dispatch({
    type: EDIT_PROFILE_TYPE,
    payload: newDataObj,
  });
};
