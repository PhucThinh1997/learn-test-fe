import * as api from '../../config/axios';

export const urlEndpointCustomer = '/api/customers/';
export const urlEndpointTableCustomer= '/api/customers';

export const getCustomerById = (id) => api.sendGet(urlEndpointCustomer + id);

export const getCustomers = (data) => api.sendGet(urlEndpointCustomer, data);

export const createCustomer = (payload) =>
  api.sendPost(urlEndpointCustomer, {
    id: payload.id,
    input: payload,
  });

export const updateCustomer = (payload) => api.sendPost(urlEndpointCustomer, payload);

export const deleteCustomers = (payload) => api.sendDelete(urlEndpointCustomer, { data: { ids: payload } });

export const getCustomerDropdown = () => api.sendGet(urlEndpointCustomer + 'dropdown');
