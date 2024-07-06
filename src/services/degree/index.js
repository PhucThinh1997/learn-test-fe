import * as api from '../../config/axios';
export const urlEndpointDegree = '/api/degrees/';

export const getDegreeById = (id) => api.sendGet(urlEndpointDegree + id);

export const getDegrees = (data) => api.sendGet(urlEndpointDegree, data);

export const createDegree = (payload) =>
  api.sendPost(urlEndpointDegree, {
    id: payload.id,
    input: payload,
  });
