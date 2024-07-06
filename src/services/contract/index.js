/** @format */

import * as api from '../../config/axios';
export const urlEndpointContract = '/api/contract/';
export const urlEndpointTableContract = '/api/contract';

export const getContractById = (id) => api.sendGet(urlEndpointContract + id);

export const getContracts = (data) => api.sendGet(urlEndpointContract, data);

export const createContract = (payload) =>
  api.sendPost(urlEndpointContract, {
    id: payload.id,
    input: payload,
  });

export const updateContract = (payload) => api.sendPost(urlEndpointContract, payload);

export const deleteContracts = (payload) =>
  api.sendDelete(urlEndpointContract, {
    data: { ids: payload },
  });

export const getContractNumberToCreate = () => api.sendGet(urlEndpointContract + 'quotationNumber', {});

export const reviewContract = (payload) =>
  api.sendPost(urlEndpointContract + 'review', {
    id: payload.id,
    input: payload,
  });
