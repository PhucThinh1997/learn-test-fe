import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';

import { DELETE_ERROR, DELETE_SUCCESS, SAVE_SUCCESS } from 'utils/common/messageContants';
import { urlEndpointTableCustomer } from 'services/customer/';
import { updateCustomer, createCustomer, deleteCustomers } from 'services/customer/';
import { getCustomerGroupDropDowns } from 'services/customer-group/';
import { getFieldsDropDowns } from 'services/fields/';
import * as actions from 'redux/global/actions';
import CreateOrUpdateCustomer from './CreateCustomer';
import Filter from 'pages/home/components/filter/filterCommon';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const Customer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [customerForm, setCustomerForm] = useState({
    customerId: '',
    isOpen: false,
  });
  const [customerGroup, setCustomerGroup] = useState([]);
  const [fields, setFields] = useState([]);
  const [filter, setFilter] = useState({
    isOpen: false,
  });

  useEffect(() => {
    getCustomerGroup();
  }, [customerForm.isOpen]);

  const getCustomerGroup = async () => {
    const response = await getCustomerGroupDropDowns();
    setCustomerGroup(response?.data || []);
  };

  useEffect(() => {
    getFields();
  }, [customerForm.isOpen]);

  const getFields = async () => {
    const response = await getFieldsDropDowns();
    setFields(response?.data || []);
  };

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const columns = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'code',
      minWidth: '150px',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      minWidth: '350px',
    },
    {
      title: 'Mã số thuế',
      dataIndex: 'taxCode',
      minWidth: '170px',
    },
    {
      title: 'Người quản lý',
      dataIndex: ['employeeManage', 'name'],
      minWidth: '200px',
    },
    {
      title: 'Lĩnh vực',
      dataIndex: ['field', 'name'],
      width: '150px',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'headAddress',
      minWidth: '200px',
    },
    {
      title: '',
      dataIndex: 'action',
      width: '30px',
      render: (_, values) => <ButtonEdit disabled={!isAccessed(PER.KHACH_HANG_SUA)} onClick={() => onClickOpenModal(values, 'Chỉnh sửa khách hàng')} />,
    },
  ];

  const handleCancel = () => {
    form.resetFields();
    setCustomerForm({ isOpen: false });
  };

  const finishAction = () => {
    handleCancel();
    readGrid(true);
  };

  const onFinish = (values) => {
    // Remove spaces on first or last string
    let updateValue = {
      code: values?.code?.trim(),
      name: values?.name?.trim(),
    };
    if (values.id) {
      updateValue = { ...updateValue, id: values?.id };
      handleUpdateCustomer(updateValue);
    } else {
      handleCreateCustomer(updateValue);
    }
  };
  const handleCreateCustomer = async (values) => {
    setIsLoading(true);
    const result = await createCustomer(values);
    if (result && result.isSuccess) {
      finishAction();
      message.success(SAVE_SUCCESS);
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
  };
  const handleUpdateCustomer = async (values) => {
    setIsLoading(true);
    let res = await updateCustomer(values);
    if (res.isSuccess) {
      finishAction();
      message.success(SAVE_SUCCESS);
    } else {
      message.error(res.message);
    }
    setIsLoading(false);
  };
  const handleDeleteCustomer = (values) => {
    setIsLoading(true);

    deleteCustomers(values)
      .then((res) => {
        if (res.isSuccess) {
          message.success(DELETE_SUCCESS);
          readGrid(true);
        } else {
          message.error(DELETE_ERROR);
        }
      })
      .catch(() => {
        message.error(DELETE_ERROR);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };
  //   const onClickOpenModal = (record = {}, title) => {
  //     form.setFieldsValue(record);
  //     setTitle(title);
  //     setIsopen(true);
  //   };

  const onClickOpenModal = useCallback((record = {}) => {
    setCustomerForm({
      customerId: record.id,
      isOpen: true,
    });
  }, []);

  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDeleteCustomer(values),
      confirmLoading: isLoading,
    });
  };

  const renderFilter = () => (
    <Filter
      isOpen={filter.isOpen}
      title={'Lọc khách hàng'}
      handleClosed={() => setFilter({ isOpen: false })}
      onApplyFilter={(values) => {
        dispatch(actions.filters(values));
      }}
    />
  );

  return (
    <>
      {isAccessed(PER.KHACH_HANG_XEM) && (
        <div>
          <HeaderPage
            title="KHÁCH HÀNG"
            actions="default"
            onCreate={() => onClickOpenModal({}, 'Thêm mới khách hàng')}
            handleDelete={onClickDelete}
            isFilter
            onFilter={() => setFilter({ isOpen: true })}
            isShowActionAdd={isAccessed(PER.KHACH_HANG_THEM)}
            isShowActionDelete={isAccessed(PER.KHACH_HANG_XOA)}
          />
          {renderFilter()}
          <div className="main__application">
            <PageWrapper>
              <Grid urlEndpoint={urlEndpointTableCustomer} columns={columns} />
            </PageWrapper>
          </div>
          <CreateOrUpdateCustomer
            isOpen={customerForm.isOpen}
            handleClosed={() => setCustomerForm({ isOpen: false, customerId: null })}
            title={'Thông tin'}
            reloadTable={() => readGrid(true)}
            customerId={customerForm.customerId}
            customerGroup={customerGroup}
            fields={fields}
          />
        </div>
      )}
    </>
  );
};

export default Customer;
