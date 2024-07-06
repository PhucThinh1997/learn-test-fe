import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Select, Col, Row, Upload, Typography, DatePicker } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';

import { ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';

import { DELETE_ERROR, DELETE_SUCCESS, SAVE_SUCCESS } from 'utils/common/messageContants';
import { urlEndpointTableCustomerRequirement } from 'services/customer-requirement';
import { createCustomerReq, deleteCustomersReq, getCustomerReqById } from 'services/customer-requirement';
import { getCustomerDropdown, getCustomerById } from 'services/customer/index';
import * as actions from 'redux/global/actions';
import './style.less';
import Filter from 'pages/home/components/filter/filterCommon';
import { formatDDMMYYYY, today, getDateFormat } from 'utils/formatDate';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const { TextArea } = Input;
const CustomerRequirement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const [isOpen, setIsopen] = useState(false);
  const [form] = Form.useForm();
  const [customer, setCustomer] = useState([]);
  const [contactPeoples, setContactPeople] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [filter, setFilter] = useState({
    isOpen: false,
  });

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: ['customer', 'name'],
      minWidth: '300px',
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'requestDate',
      minWidth: '300px',
      render: (values, recore) => <Typography.Text>{values && formatDDMMYYYY(values)}</Typography.Text>,
    },
    {
      title: 'Nội dung yêu cầu',
      dataIndex: 'descriptionRequest',
      minWidth: '300px',
    },
    {
      title: 'Dự toán kinh phí',
      dataIndex: 'sourceBudget',
      minWidth: '200px',
    },
    {
      title: 'Nguồn vốn',
      dataIndex: 'capital',
      minWidth: '200px',
    },
    {
      title: '',
      dataIndex: 'action',
      width: '30px',
      render: (_, values) => <ButtonEdit disabled={!isAccessed(PER.YEU_CAU_KHACH_HANG_SUA)} onClick={() => onClickOpenModal(values, 'Chỉnh sửa yêu cầu khách hàng')} />,
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
      customerId: values?.customerId,
      peopleRepresentId: values?.peopleRepresentId,
      phone: values?.phone?.trim(),
      position: values?.position?.trim(),
      address: values?.address?.trim(),
      projectName: values?.projectName?.trim(),
      sourceBudget: values?.sourceBudget?.trim(),
      capital: values?.capital?.trim(),
      descriptionRequest: values?.descriptionRequest?.trim(),
      dataRefer: values?.dataRefer?.trim(),
      requestDate: values?.requestDate,
    };
    if (values.id) {
      updateValue = { ...updateValue, id: values?.id };
      handleCreateCustomerRequirement(updateValue);
    } else {
      handleCreateCustomerRequirement(updateValue);
    }
  };

  const handleCreateCustomerRequirement = async (values) => {
    setIsLoading(true);
    const result = await createCustomerReq(values);
    if (result && result.isSuccess) {
      finishAction();
      message.success(SAVE_SUCCESS);
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
  };

  const handleDeleteCustomerRequirement = (values) => {
    setIsLoading(true);

    deleteCustomersReq(values)
      .then((res) => {
        if (res.isSuccess) {
          message.success(DELETE_SUCCESS);
          readGrid(true);
        } else {
          message.error(res.message);
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
    if (record?.id) {
      getCustomerReqById(record?.id)
        .then((res) => {
          if (res.isSuccess) {
            setTitle(title);
            setIsopen(true);
            setContactPeople(res.data.customer.contactPeoples);
            form.setFieldsValue({ ...res.data, requestDate: getDateFormat(res?.data?.requestDate) });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setTitle(title);
      setIsopen(true);
    }
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDeleteCustomerRequirement(values),
      confirmLoading: isLoading,
    });
  };

  useEffect(() => {
    getCustomers();
  }, [isOpen]);

  const getCustomers = async () => {
    const response = await getCustomerDropdown();
    setCustomer(response?.data || []);
  };

  const onChangeCustomer = (val) => {
    getCustomerById(val).then((x) => {
      setContactPeople(x.data.contactPeoples);
      form.setFieldsValue({ phone: x.data.phone, address: x.data.address, position: x.data.position });
    });
  };

  const upFile = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const renderFilter = () => (
    <Filter
      isOpen={filter.isOpen}
      title={'Lọc yêu cầu khách hàng'}
      handleClosed={() => setFilter({ isOpen: false })}
      onApplyFilter={(values) => {
        dispatch(actions.filters(values));
      }}
    />
  );

  return (
    <>
      {isAccessed(PER.YEU_CAU_KHACH_HANG_XEM) && (
        <div>
          <HeaderPage
            title="YÊU CẦU KHÁCH HÀNG"
            actions="default"
            onCreate={() => onClickOpenModal({}, 'Thêm mới yêu cầu khách hàng')}
            handleDelete={onClickDelete}
            isFilter
            onFilter={() => setFilter({ isOpen: true })}
            isShowActionAdd={isAccessed(PER.YEU_CAU_KHACH_HANG_THEM)}
            isShowActionDelete={isAccessed(PER.YEU_CAU_KHACH_HANG_XOA)}
          />
          {renderFilter()}
          <div className="main__application">
            <PageWrapper>
              <Grid urlEndpoint={urlEndpointTableCustomerRequirement} columns={columns} />
            </PageWrapper>
          </div>
          <Modal
            title={title}
            open={isOpen}
            form={form}
            width={800}
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
            <Form
              id="myForm"
              layout="vertical"
              form={form}
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 23 }}
              onFinish={onFinish}
            >
              <Row>
                <Col span={12}>
                  <Form.Item hidden={true} label="id" name="id" />
                  <Form.Item
                    label="Khách hàng"
                    name="customerId"
                    rules={[{ required: true, message: 'Khách hàng không được bỏ trống!' }]}
                  >
                    <Select allowClear onChange={(e) => onChangeCustomer(e)}>
                      {customer &&
                        customer.map((item) => (
                          <Select.Option key={item.id} values={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Người đại diện"
                    name="peopleRepresentId"
                    rules={[{ required: true, message: 'Người đại diện không được bỏ trống!' }]}
                  >
                    <Select allowClear>
                      {contactPeoples &&
                        contactPeoples.map((item) => (
                          <Select.Option key={item.id} values={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Chức vụ" name="position">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="custom-width">
                  <Form.Item label="Địa chỉ" name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Ngày yêu cầu" name="requestDate">
                    <DatePicker placeholder="Chọn ngày" format={formatDDMMYYYY} defaultValue={today()} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="custom-width">
                  <Form.Item
                    label="Tên dự án"
                    name="projectName"
                    rules={[{ required: true, message: 'Tên dự án không được bỏ trống!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Dự toán kinh phí" name="sourceBudget">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Nguồn Vốn" name="capital">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="custom-width">
                  <Form.Item label="Nội dung yêu cầu" name="descriptionRequest">
                    <TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Form.Item>
                  <Upload {...upFile}>
                    <Button icon={<UploadOutlined />}>File đính kèm</Button>
                  </Upload>
                </Form.Item>
              </Row>
              <Row>
                <Col span={24} className="custom-width">
                  <Form.Item label="Dữ liệu tham khảo" name="dataRefer">
                    <TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default CustomerRequirement;
