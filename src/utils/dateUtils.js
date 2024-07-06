export const getToDay = () => {
  return new Date().toISOString().substring(0, 10)
};