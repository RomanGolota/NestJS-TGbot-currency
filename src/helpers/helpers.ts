export const getTodayDate = () => {
  const date = new Date(Date.now());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}${(month)}${(day)}`;
};