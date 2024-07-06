/** @format */

import * as api from '../../config/axios';
export const urlEndpointTechnicalBusiness = '/api/technical-requirement/';
export const urlEndpointTableTechnicalBusiness = '/api/technical-requirement';
export const urlAssignmentTechnicalBusiness = '/api/technical-requirement-task/assign-task';

export const getTechnicalBusinessById = (id) => {
  api.sendGet(urlEndpointTechnicalBusiness + id);
};

export const getTechnicalBusinesss = (data) => {
  api.sendGet(urlEndpointTechnicalBusiness, data);
};

export const getReceiverDropdown = () => api.sendGet(urlEndpointTechnicalBusiness + 'receiver-dropdown/');

export const createTechnicalBusiness = (payload) =>
  api.sendPost(urlEndpointTechnicalBusiness, {
    id: payload.id,
    input: payload,
  });

export const updateTechnicalBusiness = (payload) => api.sendPost(urlEndpointTechnicalBusiness, payload);

export const deleteTechnicalBusinesss = (payload) =>
  api.sendDelete(urlEndpointTechnicalBusiness, {
    data: { ids: payload },
  });

export const assignTaskTechnicalBusinesss = (payload) => api.sendPost(urlAssignmentTechnicalBusiness, payload);;
