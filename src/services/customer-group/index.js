/** @format */

import * as api from '../../config/axios';

export const urlEndpointCustomerGroup = '/api/customer-groups/';
export const urlEndpointTableCustomerGroup = '/api/customer-groups';

export const getCustomerGroupById = (id) => api.sendGet(urlEndpointCustomerGroup + id);

export const getCustomerGroups = (data) => api.sendGet(urlEndpointCustomerGroup, data);

export const createCustomerGroup = (payload) =>
  api.sendPost(urlEndpointCustomerGroup, {
    id: payload.id,
    input: payload,
  });

export const updateCustomerGroup = (payload) =>
  api.sendPost(urlEndpointCustomerGroup, {
    id: payload.id,
    input: payload,
  });

export const deleteCustomerGroups = (payload) =>
  api.sendDelete(urlEndpointCustomerGroup, {
    data: { ids: payload },
  });

export const getCustomerGroupDropDowns = () => api.sendGet(urlEndpointCustomerGroup + 'dropdown', '');
