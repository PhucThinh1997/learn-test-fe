/** @format */

import * as api from '../../config/axios';
import * as requestUrl from './requestService'

export const urlEndpoint = '/api/technical-requirement-task/';
export const urlEndpointTable = '/api/technical-requirement-task';
export const urlAssignmentTechnicalBusiness = '/api/technical-requirement-task/assign-task';

export const getTechnicalBusinessById = (id) => {
  api.sendGet(urlEndpoint + id);
};

export const getTechnicalBusinesss = (data) => {
  api.sendGet(urlEndpoint, data);
};

export const createTechnicalBusiness = (payload) =>
  api.sendPost(urlEndpoint, {
    id: payload.id,
    input: payload,
  });

export const updateTechnicalBusiness = (payload) => api.sendPost(urlEndpoint, payload);

export const deleteTechnicalBusinesss = (payload) =>
  api.sendDelete(urlEndpoint, {
    data: { ids: payload },
  });

export const assignTaskTechnicalBusinesss = (payload) => api.sendPost(urlAssignmentTechnicalBusiness, payload);;

export const getDetail = (id) => api.sendGet(requestUrl.urlEndpointTableTechnicalBusiness + id);

export const approveTask = (payload) => api.sendPut(urlEndpoint + payload.id + '/approval', payload);

export const rejectTask = (id) => api.sendGet(requestUrl.urlEndpointTableTechnicalBusiness + id);

export const reportResult = (payload) => api.sendPut(urlEndpoint + payload.id + '/completion', payload);