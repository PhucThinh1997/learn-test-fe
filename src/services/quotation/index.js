/** @format */

import * as api from '../../config/axios';
export const urlEndpointQuotation = '/api/quotations/';
export const urlEndpointTableQuotation = '/api/quotations';

export const getQuotationById = (id) => api.sendGet(urlEndpointQuotation + id);

export const getQuotations = (data) => api.sendGet(urlEndpointQuotation, data);

export const createQuotation = (payload) =>
  api.sendPost(urlEndpointQuotation, {
    id: payload.id,
    input: payload,
  });

export const updateQuotation = (payload) => api.sendPost(urlEndpointQuotation, payload);

export const deleteQuotations = (payload) =>
  api.sendDelete(urlEndpointQuotation, {
    data: { ids: payload },
  });

export const getQuotationNumberToCreate = () => api.sendGet(urlEndpointQuotation + 'quotationNumber', {});

export const reviewQuotation = (payload) =>
  api.sendPost(urlEndpointQuotation + 'review', {
    id: payload.id,
    input: payload,
  });
