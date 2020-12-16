export const stringCutter = (str, len, dots = true) => {
  if (!len) throw new Error('No length provided in stringCutter function');
  let newStr = str.slice(0, len);
  if (str.length > len && dots) newStr += '...';
  return newStr;
};
