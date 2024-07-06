import { Form, message } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { getCustomerDropdown } from 'services/customer/index';
import { getEmployeeDropDown } from 'services/employee/index';
import { getContactPersonByCustomerId } from 'services/contact-person/index';
import { formatDDMMYYYY, today, getDateFormat } from 'utils/formatDate';
import * as actions from 'redux/global/actions';
import { useDispatch } from 'react-redux';
import { BLANK_VALUE, SEARCH_CRITERIA } from 'static/Constants';
import { DELETE_ERROR, DELETE_SUCCESS, SAVE_ERROR, SAVE_SUCCESS } from 'utils/common/messageContants';
import * as api from 'services/technicalBusiness/managerService';
import _ from 'lodash';

const option = {};
const searchCriteria = SEARCH_CRITERIA.ALL;

export const TechnicalBusinessManageContext = createContext({});

export const TechnicalBusinessManageProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [personContactOptions, setPersonContactOptions] = useState([]);
  const [personSelected, setPersonSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.changeRibbonActions(option));
    dispatch(actions.updateSearchCriteria(searchCriteria));
  }, [dispatch]);

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    setDefaultOption(personContactOptions, 'requirementPersonId');
  }, [personContactOptions]);

  const getOptions = () => {
    getCustomerDropdown().then((res) => {
      const customerOption = res.data.map((x) => {
        return {
          value: x.id,
          label: x.name,
        };
      });
      setCustomerOptions(customerOption);
    });
    getEmployeeDropDown().then((res) => {
      const empOption = res.data.map((x) => {
        return {
          value: x.id,
          label: x.name,
        };
      });
      setEmployeeOptions(empOption);
    });
  };

  const getTBRequest = (id) => {
    api.getDetail(id);
  };

  const updatePersonContactList = (customerId) => {
    if (customerId) {
      getContactPersonByCustomerId(customerId).then((res) => {
        const options = res.data.map((x) => {
          return {
            value: x.id,
            label: x.name,
          };
        });
        setPersonContactOptions(options);
      });
    } else {
      setPersonContactOptions([]);
    }
  };

  const setDefaultOption = (options, name) => {
    const fielValue = form.getFieldValue(name);
    if (fielValue) {
      form.setFieldValue(name, fielValue);
    } else {
      form.setFieldValue(name, options[0]?.value);
    }
  };

  const convertDateValue = (data) => {
    let dataClone = {
      ...data,
      requirementDate: getDateFormat(data.requirementDate),
      plannedStartDate: getDateFormat(data.plannedStartDate),
      completedDate: getDateFormat(data.completedDate),
      requirementDate: getDateFormat(data.requirementDate),
    };

    const techAssign = data.technicalRequirementAssignments;
    if (!_.isEmpty(techAssign)) {
      let techDate = {
        ...techAssign,
        plannedStartDate: getDateFormat(techAssign.plannedStartDate),
        startDate: getDateFormat(techAssign.startDate),
        dueDate: getDateFormat(techAssign.dueDate),
        closedDate: getDateFormat(techAssign.closedDate),
      };

      dataClone = { ...dataClone, technicalRequirementAssignments: techDate };
    }

    return dataClone;
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    resetFields();
  };

  const handleCancel = () => {
    isCreate ? setIsOpen(false) : setIsUpdate(false);
  };

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const getDataById = (id) => {
    api.getTechnicalBusinessById(id).then((res) => {
      if (res.isSuccess) {
        return res.data;
      } else {
        message.error('Lỗi khi lấy thông tin');
      }
    });
  };

  const resetFields = () => {
    form.resetFields();
  };

  const approveTask = (payload, cb) => {
    setIsLoading(true);
    api
      .approveTask(payload)
      .then((res) => {
        if (res.isSuccess) {
          readGrid(true);
          
        } else {
          message.error('Không thể nhận công việc.');
        }
        _.isFunction(cb) && cb(res)
      })
      .finally((res) => {
        setIsLoading(true);
      });
  };

  const innitData = (data) => {
    form.setFieldsValue(data);
  };

  const valueConfig = {
    form,
    isOpen,
    customerOptions,
    employeeOptions,
    personContactOptions,
    isUpdate,
    isCreate,
    personSelected,
    isLoading,
    setPersonSelected,
    setIsOpen,
    setIsUpdate,
    handleCancel,
    updatePersonContactList,
    setIsCreate,
    handleClosePopup,
    convertDateValue,
    readGrid,
    innitData,
    getDataById,
    getTBRequest,
    approveTask,
  };

  return (
    <TechnicalBusinessManageContext.Provider value={valueConfig}>{children}</TechnicalBusinessManageContext.Provider>
  );
};
