import * as api from '../../config/axios';
export const urlEndpointDepartment = '/api/departments/';
export const urlEndpointTableDepartment = '/api/departments';

export const getDepartmentById = (id) => api.sendGet(urlEndpointDepartment + id);

export const getDepartments = (data) => api.sendGet(urlEndpointDepartment, data);

export const createDepartment = (payload) =>
  api.sendPost(urlEndpointDepartment, {
    id: payload.id,
    input: payload,
  });

export const updateDepartment = (payload) => api.sendPost(urlEndpointDepartment, payload);

export const deleteDepartments = (payload) =>
  api.sendDelete(urlEndpointDepartment, {
    data: { ids: payload },
  });

export const dropdownDepartments = () => api.sendGet(urlEndpointDepartment + 'dropdown', '');
