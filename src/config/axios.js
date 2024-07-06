import _ from 'lodash';
import axios from 'axios';
import { fowardTo } from 'utils/common/route';
import * as STATUS_CODE from 'static/StatusCodes';
import FakeData from './FakeData';
import { getToken, clearToken } from 'utils/common/session';

// eslint-disable-next-line no-unused-vars
var store;
/**
 * An apply function to setup defaults axios configuration
 * @param {object} defaultObj axios defaults setup. See https://github.com/axios/axios#request-config
 */
export const applyApiDefaults = (defaultObj, storeParams) => {
  _.merge(axios.defaults, defaultObj);
  store = storeParams;
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // TODO: apply logger or any prior action
    let token = getToken();
    if (!token) return config;
    config.headers['Authorization'] = 'bearer ' + getToken();

    return config;
  },
  function (error) {
    // TODO: apply error logger
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status;

    if (status === STATUS_CODE.UNAUTHORIZED) {
      clearToken();
      fowardTo('/login');
    }

    if (status === STATUS_CODE.NOT_FOUND) {
      // redirect to notfound
      fowardTo('/notfound');
    }
    return Promise.reject(error.response);
  },
);

const fakeResponse = (data) => {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 0);
  });
};

// GET request
export const sendGet = (api, options) => {
  if (FakeData[api]) return fakeResponse({ data: FakeData[api] });

  const axiosOptions = {
    withCredentials: true,
    ...options
  };

  return new Promise((resolve, reject) => {
    axios
      .get(api, axiosOptions)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log('error sendGet>>>', error);
        reject(error);
      });
  });
};
// POST request
export const sendPost = (api, payload, options = {}) => {
  if (FakeData[api]) return fakeResponse(FakeData[api]);

  const axiosOptions = {
    withCredentials: true,
    ...options
  };

  return new Promise((resolve, reject) => {
    axios
      .post(api, payload, axiosOptions)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log('error sendPost>>>', error);
        reject(error);
      });
  });
};

// POST FORMDATA
export const sendPostFormData = (api, body) => {
  if (FakeData[api]) return fakeResponse(FakeData[api]);

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: api,
      data: body,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log('error postFormData>>>', error);
        reject(error);
      });
  });
};

// DELETE request
export const sendDelete = (api, payload, options = {}) => {
  if (FakeData[api]) return fakeResponse(FakeData[api]);
  const axiosOptions = {
    withCredentials: true,
    ...options
  };
  return new Promise((resolve, reject) => {
    axios
      .delete(api, payload, axiosOptions)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log('error sendDelete>>>', error);
        reject(error);
      });
  });
};


// PUT request
export const sendPut = (api, payload, options = {}) => {
  if (FakeData[api]) return fakeResponse(FakeData[api]);

  const axiosOptions = {
    withCredentials: true,
    ...options
  };

  return new Promise((resolve, reject) => {
    axios
      .put(api, payload, axiosOptions)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log('error sendPut>>>', error);
        reject(error);
      });
  });
};