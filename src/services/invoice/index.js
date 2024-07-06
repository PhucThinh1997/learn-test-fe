import * as api from '../../config/axios';
export const urlEndpointInvoice = '/api/invoice/';
export const urlEndpointTableInvoice = '/api/invoice';
export const getInvoiceById = (id) => api.sendGet(urlEndpointInvoice + id);

export const getInvoices = (data) => api.sendGet(urlEndpointInvoice, data);

export const createInvoice = (payload) =>
  api.sendPost(urlEndpointInvoice, {
    id: payload.id,
    input: payload,
  });

export const updateInvoice = (payload) => api.sendPost(urlEndpointInvoice, payload);

export const deleteInvoice = (payload) =>
  api.sendDelete(urlEndpointInvoice, {
    data: { ids: payload },
  });

// export const dropdownInvoices = () => api.sendGet(urlEndpointInvoice + 'dropdown', '');
