/** @format */

import * as api from '../../config/axios';
export const urlEndpointField = '/api/fields/';
export const urlEndpointTableField = '/api/fields';

export const getFieldById = (id) => api.sendGet(urlEndpointField + id);

export const getFields = (data) => api.sendGet(urlEndpointField, data);

export const createFields = (payload) =>
  api.sendPost(urlEndpointField, {
    id: payload.id,
    input: payload,
  });

export const updateFields = (payload) => api.sendPost(urlEndpointField, payload);

export const deleteFields = (payload) =>
  api.sendDelete(urlEndpointField, {
    data: { ids: payload },
  });

  export const getFieldsDropDowns = () => api.sendGet(urlEndpointField + 'dropdown', '');
