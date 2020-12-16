export const notEmptyObjChecker = (obj) => {
  const keys = Object.keys(obj);
  return keys.length > 0;
};
