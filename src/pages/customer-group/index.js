import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';

import { DELETE_ERROR, DELETE_SUCCESS, SAVE_SUCCESS } from 'utils/common/messageContants';
import { urlEndpointTableCustomerGroup } from 'services/customer-group/';
import { updateCustomerGroup, createCustomerGroup, deleteCustomerGroups } from 'services/customer-group/';
import * as actions from 'redux/global/actions';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const CustomerGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const [isOpen, setIsopen] = useState(false);
  const [form] = Form.useForm();

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const columns = [
    {
      title: 'Mã nhóm khách hàng',
      dataIndex: 'code',
      width: '200px',
    },
    {
      title: 'Tên nhóm khách hàng',
      dataIndex: 'name',
    },
    {
      title: 'Số lượng khách hàng',
      dataIndex: 'numberOfCustomer',
      width: '200px',
    },
    {
      title: '',
      dataIndex: 'action',
      width: '30px',
      render: (_, values) => <ButtonEdit disabled={!isAccessed(PER.NHOM_KHACH_HANG_SUA)} onClick={() => onClickOpenModal(values, 'Chỉnh sửa nhóm khách hàng')} />,
    },
  ];

  const handleCancel = () => {
    form.resetFields();
    setIsopen(false);
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
      sequence: values?.sequence?.trim(),
    };
    if (values.id) {
      updateValue = { ...updateValue, id: values?.id };
      handleUpdateCustomerGroup(updateValue);
    } else {
      handleCreateCustomerGroup(updateValue);
    }
  };
  const handleCreateCustomerGroup = async (values) => {
    setIsLoading(true);
    const result = await createCustomerGroup(values);
    if (result && result.isSuccess) {
      finishAction();
      message.success(SAVE_SUCCESS);
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
  };
  const handleUpdateCustomerGroup = async (values) => {
    setIsLoading(true);
    let res = await updateCustomerGroup(values);
    if (res.isSuccess) {
      finishAction();
      message.success(SAVE_SUCCESS);
    } else {
      message.error(res.message);
    }
    setIsLoading(false);
  };
  const handleDeleteCustomerGroup = (values) => {
    setIsLoading(true);

    deleteCustomerGroups(values)
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
  const onClickOpenModal = (record = {}, title) => {
    form.setFieldsValue(record);
    setTitle(title);
    setIsopen(true);
  };
  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDeleteCustomerGroup(values),
      confirmLoading: isLoading,
    });
  };
  return (
    <>
      {isAccessed(PER.NHOM_KHACH_HANG_XEM) && (
        <div>
          <HeaderPage
            title="NHÓM KHÁCH HÀNG"
            actions="default"
            onCreate={() => onClickOpenModal({}, 'Thêm mới nhóm khách hàng')}
            handleDelete={onClickDelete}
            isShowActionAdd={isAccessed(PER.NHOM_KHACH_HANG_THEM)}
            isShowActionDelete={isAccessed(PER.NHOM_KHACH_HANG_XOA)}
          />
          <div className="main__application">
            <PageWrapper>
              <Grid urlEndpoint={urlEndpointTableCustomerGroup} columns={columns} />
            </PageWrapper>
          </div>
          <Modal
            title={title}
            open={isOpen}
            form={form}
            onCancel={handleCancel}
            footer={[
              <Button form="myForm" key="back" onClick={handleCancel}>
                Hủy
              </Button>,
              <Button form="myForm" key="submit" type="primary" htmlType="submit" loading={isLoading}>
                Lưu
              </Button>,
            ]}
          >
            <Form id="myForm" layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item hidden={true} label="id" name="id">
                <Input />
              </Form.Item>

              <Form.Item
                label="Mã nhóm khách hàng"
                name="code"
                rules={[{ required: true, message: 'Mã nhóm khách hàng không được bỏ trống!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tên nhóm khách hàng"
                name="name"
                rules={[{ required: true, message: 'Tên nhóm khách hàng không được bỏ trống!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="STT"
                name="sequence"
                rules={[{ required: true, message: 'Số thứ tự không được bỏ trống!' }]}
              >
                <Input style={{ width: '100px' }} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default CustomerGroup;
