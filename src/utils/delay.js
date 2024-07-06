/**
 * sleep within milliseconds
 * @param {number} ms
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
/**
 * sleep within milliseconds when import module
 * @param {number} ms
 */
export const delayImport = (ms) => {
  return (promise) =>
    promise.then(
      (data) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(data), ms);
        }),
    );
};
