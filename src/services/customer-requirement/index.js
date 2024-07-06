/** @format */

import * as api from '../../config/axios';
export const urlEndpointCustomerRequirement = '/api/orders/';
export const urlEndpointTableCustomerRequirement = '/api/orders';

export const getCustomerReqById = (id) => api.sendGet(urlEndpointCustomerRequirement + id);

export const getCustomersReq = (data) => api.sendGet(urlEndpointCustomerRequirement, data);

export const createCustomerReq = (payload) =>
  api.sendPost(urlEndpointCustomerRequirement, {
    id: payload.id,
    input: payload,
  });

export const updateCustomerReq = (payload) => api.sendPost(urlEndpointCustomerRequirement, payload);

export const deleteCustomersReq = (payload) =>
  api.sendDelete(urlEndpointCustomerRequirement, {
    data: { ids: payload },
  });
