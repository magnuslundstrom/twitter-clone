export const getFormData = (formState) => {
  const formData = new FormData();
  for (let key in formState) {
    if (typeof formState[key] === 'object') continue;
    formData.append(key, formState[key]);
  }
  return formData;
};
