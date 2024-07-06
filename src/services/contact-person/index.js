/** @format */

import * as api from '../../config/axios';
export const urlEndpointContactPerson = '/api/contact-persons/';
export const urlEndpointTableContactPerson = '/api/contact-persons';

export const getContactPersonByCustomerId = (customerId) =>
  api.sendGet(`${urlEndpointContactPerson}by-customer/?customerId=${customerId}`);