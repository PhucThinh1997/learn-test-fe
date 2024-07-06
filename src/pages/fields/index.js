import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import { DELETE_ERROR, DELETE_SUCCESS, SAVE_SUCCESS } from 'utils/common/messageContants';
import { urlEndpointTableField } from 'services/fields/index';
import { createFields, deleteFields } from 'services/fields/index';
import * as actions from 'redux/global/actions';
const { TextArea } = Input;

const Fields = () => {
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
      title: 'Mã lĩnh vực',
      dataIndex: 'code',
      width: '200px',
    },
    {
      title: 'Tên lĩnh vực',
      dataIndex: 'name',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      width: '400px',
    },
    {
      title: '',
      dataIndex: 'action',
      width: '30px',
      render: (_, values) => <ButtonEdit onClick={() => onClickOpenModal(values, 'Chỉnh sửa lĩnh vực')} />,
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
    };
    if (values.id) {
      updateValue = { ...updateValue, id: values?.id };
      handleUpdateField(updateValue);
    } else {
      handleCreateField(updateValue);
    }
  };
  const handleCreateField = async (values) => {
    setIsLoading(true);
    const result = await createFields(values);
    if (result && result.isSuccess) {
      finishAction();
      message.success(SAVE_SUCCESS);
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
  };
  const handleUpdateField = async (values) => {
    setIsLoading(true);
    let res = await createFields(values);
    if (res.isSuccess) {
      finishAction();
      message.success(SAVE_SUCCESS);
    } else {
      message.error(res.message);
    }
    setIsLoading(false);
  };
  const handleDeleteField = (values) => {
    setIsLoading(true);

    deleteFields(values)
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
      onOk: () => handleDeleteField(values),
      confirmLoading: isLoading,
    });
  };
  return (
    <>
      <HeaderPage
        title="lĩnh vực"
        actions="default"
        onCreate={() => onClickOpenModal({}, 'Thêm mới lĩnh vực')}
        handleDelete={onClickDelete}
      />
      <div className="main__application">
        <PageWrapper>
          <Grid urlEndpoint={urlEndpointTableField} columns={columns} />
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
            label="Mã lĩnh vực"
            name="code"
            rules={[{ required: true, message: 'Mã lĩnh vực không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên lĩnh vực"
            name="name"
            rules={[{ required: true, message: 'Tên lĩnh vực không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Fields;
