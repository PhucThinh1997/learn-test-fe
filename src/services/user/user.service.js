import * as api from '../../config/axios';
export const urlEndpoint = '/api/user/';

export const getInfoUserById = (id) => api.sendGet(urlEndpoint + id);

export const changePassword = (payload) =>
    api.sendPost(urlEndpoint + "change-password", payload);