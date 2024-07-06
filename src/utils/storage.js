import _ from 'lodash';

/**
 * Store received data into local storage
 * @param {object} data data will store within local storage
 * @param {string} key local storage item key
 */
export const setData = (data, key) => {
  if (!key) return;
  if (!data) return;
  let encodedData = data;
  if (typeof data == 'object') encodedData = JSON.stringify(data);
  localStorage.setItem(key, encodedData);
};
/**
 * Retrieve data from local storage key
 * @param {string} key local storage item key
 */
export const getData = (key) => {
  if (!key) return;
  const data = localStorage.getItem(key);
  return data ? typeof data === 'string' ? data : JSON.parse(data) : data;
};

export const cleanUp = (keys) => {
  _.forEach(keys, function (key) {
    localStorage.removeItem(key);
  });
};
