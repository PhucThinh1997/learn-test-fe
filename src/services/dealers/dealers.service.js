import * as api from '../../config/axios';
export const urlEndpointDealers = '/api/dealers/';
export const urlEndpointTableDealers = '/api/dealers';
export const urlEndpointTableDealersResult = '/api/dealers/dealersResult';
export const getDealersById = (id) => api.sendGet(urlEndpointDealers + id);

export const getTechnicalById = (id) => api.sendGet('/api/technical-requirement/' + id);

export const getDealerss = (data) => api.sendGet(urlEndpointDealers, data);

export const createDealers = (payload) =>
  api.sendPost(urlEndpointDealers, {
    id: payload.id,
    input: payload,
  });

export const updateDealers = (payload) => api.sendPost(urlEndpointDealers, payload);

export const deleteDealers = (payload) =>
  api.sendDelete(urlEndpointDealers, {
    data: { ids: payload },
  });

// export const dropdownDealerss = () => api.sendGet(urlEndpointDealers + 'dropdown', '');
