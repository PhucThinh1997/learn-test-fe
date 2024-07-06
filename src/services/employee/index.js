/** @format */

import * as api from '../../config/axios';
export const urlEndpointEmployee = '/api/employees/';
export const urlEndpointTableEmployee = '/api/employees';


export const getEmployeeById = (id) => api.sendGet(urlEndpointEmployee + id);

export const getEmployeeDropDown = () => api.sendGet(urlEndpointEmployee + 'dropdown/');

export const getEmployees = (data) => api.sendGet(urlEndpointEmployee, data);

export const getEmployeesByPermissions = (data) => api.sendGet(urlEndpointEmployee + 'by-permissions', data);

export const createEmployee = (payload) =>
  api.sendPost(urlEndpointEmployee, {
    id: payload.id,
    input: payload,
  });

export const updateEmployee = (payload) => api.sendPost(urlEndpointEmployee, payload);

export const deleteEmployees = (payload) =>
  api.sendDelete(urlEndpointEmployee, {
    data: { ids: payload },
  });
