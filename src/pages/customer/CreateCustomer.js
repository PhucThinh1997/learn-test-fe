/* eslint-disable react/prop-types */
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Loading from 'components/Loading/Loading';
import React, { useCallback, useEffect, useState } from 'react';
import * as service from 'services/customer';
import { SAVE_SUCCESS, SAVE_ERROR } from 'utils/common/messageContants';
import './style.less';
import GridContactPerson from './GridContactPerson';
import { getEmployeeDropDown } from '../../services/employee/index';
import { useSelector } from 'react-redux';
import { PER } from 'common/enum';
import { isAccessed } from 'utils/utils';

const CreateOrUpdateCustomer = (props) => {
  const { customerId, isOpen, handleClosed, title, reloadTable } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [listEmployeeManage, setListEmployeeManage] = useState([]);

  const onClose = () => {
    setContactPerson([]);
    form.resetFields();
    handleClosed();
  };

  const handleGetCustomerById = useCallback(async () => {
    setLoading(true);
    const result = await service.getCustomerById(customerId);
    if (result.isSuccess) {
      result.data.employeeManageId = result.data?.employeeManage?.id;
      form.setFieldsValue(result.data);
    }
    setLoading(false);
  }, [form, customerId]);

  const getEmployeeManager = () => {

    getEmployeeDropDown().then((res) => {
      let empRes = res.data
      let empOption = []
      if (isAccessed(PER.PHAN_QUYEN)) {
        empOption = empRes
      }
      else {
        empOption = empRes.filter(x => x.id === userInfo.employeeId).map((x) => ({
          id: x.id,
          name: x.name,
        }));
      }
      setListEmployeeManage(empOption);
    });
  };

  useEffect(() => {
    if (customerId) {
      handleGetCustomerById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  useEffect(() => {
    getEmployeeManager();
  }, []);

  const onFinish = (values) => {
    const updateValues = {
      ...values,
      code: values.code?.trim(),
      name: values.name?.trim(),
      department: values.department?.trim(),
      phone: values.phone?.trim(),
      email: values.email?.trim(),
      taxCode: values.taxCode?.trim(),
      position: values.position?.trim(),
      headAddress: values.headAddress?.trim(),
      address: values.address?.trim(),
      employeeManageId: values.employeeManageId,
    };
    createCustomer(updateValues);
  };

  const createCustomer = async (values) => {
    const data = await service.createCustomer(values);
    if (data.isSuccess) {
      setContactPerson([]);
      form.resetFields();
      handleClosed();
      reloadTable();
      message.success(SAVE_SUCCESS);
    } else {
      handleClosed();
      reloadTable();
      message.error(data.message);
    }
  };
  const setContactPerson = (values) => {
    form.setFieldsValue({
      contactPeoples: values,
    });
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button type="default" form="formCreateUpdateCustomer" key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button form="formCreateUpdateCustomer" key="submit" type="primary" htmlType="submit">
          Lưu
        </Button>,
      ]}
    >
      {loading ? (
        <Loading />
      ) : (
        <Form
          id="formCreateUpdateCustomer"
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 24 }}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  <Form.Item hidden={true} label="id" name="id" />
                  <Form.Item
                    label="Mã khách hàng"
                    name="code"
                    rules={[{ required: true, message: 'Mã khách hàng không được bỏ trống!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Tên khách hàng"
                    name="name"
                    rules={[{ required: true, message: 'Tên khách hàng không được bỏ trống.' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Người quản lý"
                    name="employeeManageId"
                    rules={[{ required: true, message: 'Người quản không được bỏ trống.!' }]}
                  >
                    <Select allowClear>
                      {listEmployeeManage &&
                        listEmployeeManage.map((item) => (
                          <Select.Option key={item.id} values={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Nhóm khách hàng"
                    name="customerGroupId"
                    rules={[{ required: true, message: 'Nhóm khách hàng không được bỏ trống!' }]}
                  >
                    <Select allowClear>
                      {props.customerGroup &&
                        props.customerGroup.map((item) => (
                          <Select.Option key={item.id} values={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item label="Email" name="email">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Mã số thuế"
                    name="taxCode"
                    rules={[{ required: true, message: 'Mã số thuế không được bỏ trống!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Lĩnh vực"
                    name="fieldId"
                    rules={[{ required: true, message: 'Lĩnh vực không được bỏ trống!' }]}
                  >
                    <Select allowClear>
                      {props.fields &&
                        props.fields.map((item) => (
                          <Select.Option key={item.id} values={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item label="Người đại diện" name="department">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Chức vụ" name="position">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Điện thoại di động" name="phoneNumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="custom-width">
                  <Form.Item label="Địa chỉ kinh doanh" name="headAddress">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="custom-width">
                  <Form.Item label="Địa chỉ văn phòng/sản xuất" name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="custom-width">
                  <Form.Item name="contactPeoples">
                    <GridContactPerson
                      originData={form.getFieldValue('contactPeoples') || []}
                      handleChangeData={setContactPerson}
                      rowKey="id"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

CreateOrUpdateCustomer.propTypes = {};

export default CreateOrUpdateCustomer;
