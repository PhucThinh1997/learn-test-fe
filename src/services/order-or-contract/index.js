/** @format */

import * as api from '../../config/axios';
import * as endpoints from './endpoints';

export const getOrderContractById = (id) => api.sendGet(endpoints.GET_CONTRACT + id);

export const getOrderContracts = (data) => api.sendGet(endpoints.GET_CONTRACT, data);

export const createOrderContract = (payload) =>
  api.sendPost(endpoints.GET_CONTRACT, {
    id: payload.id,
    input: payload,
  });

export const updateOrderContract = (payload) => api.sendPost(endpoints.GET_CONTRACT, payload);

export const deleteOrderContracts = (payload) =>
  api.sendDelete(endpoints.GET_CONTRACT, {
    data: { ids: payload },
  });
