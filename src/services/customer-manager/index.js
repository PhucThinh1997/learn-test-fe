import * as api from 'config/axios';
import * as endpoint from './endpoint';

export const getCustomerService = (data) => {
  return api.sendPost(endpoint.GET_CUSTOMERS_ENDPOINT, data);
};
export const getAllCustomerGroupService = (params) => {
  return api.sendGet(endpoint.GET_ALL_CUSTOMERS_GROUP_ENDPOINT, params);
};
export const getCustomerByIdService = (id) => {
  return api.sendGet(endpoint.GET_CUSTOMERS_BY_ID_ENDPOINT + id);
};
export const createCustomerService = (payload) => {
  return api.sendPost(endpoint.CREATE_CUSTOMER_ENDPOINT, payload);
};
export const updateCustomerService = (payload) => {
  return api.sendPost(endpoint.UPDATE_CUSTOMER_ENDPOINT, payload);
};
export const deleteCustomerService = (payload) => {
  return api.sendPost(endpoint.DELETE_CUSTOMER_ENDPOINT, payload);
};
