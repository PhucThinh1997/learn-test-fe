/* eslint-disable react/prop-types */
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Loading from 'components/Loading/Loading';
import React, { useCallback, useEffect, useState } from 'react';
import * as service from 'services/customer';
import { SAVE_SUCCESS, SAVE_ERROR } from 'utils/common/messageContants';
import './style.less';
import GridContactPerson from './GridContactPerson';
const FilterQuote = (props) => {
  const { customerId, isOpen, handleClosed, title, reloadTable } = props;

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    handleClosed();
  };

  const handleGetCustomerById = useCallback(async () => {
    setLoading(true);
    const result = await service.getCustomerById(customerId);
    if (result.isSuccess) {
      form.setFieldsValue(result.data);
    }
    setLoading(false);
  }, [form, customerId]);

  useEffect(() => {
    if (customerId) {
      handleGetCustomerById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

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
    };
    createCustomer(updateValues);
  };

  const createCustomer = async (values) => {
    const data = await service.createCustomer(values);
    if (data.isSuccess) {
      handleClosed();
      reloadTable();
      message.success(SAVE_SUCCESS);
    } else {
      handleClosed();
      reloadTable();
      message.error(data.message);
    }
  };
  // const updateCustomer = async (values) => {
  //     const data = await service.updateCustomer(values);
  //     if (data.isSuccess) {
  //         handleClosed();
  //         reloadTable();
  //         message.success(SAVE_SUCCESS);
  //     } else {
  //         message.error(SAVE_ERROR);
  //     }
  // };

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
        <Button type="default" form="myForm" key="back" onClick={handleClosed}>
          Hủy
        </Button>,
        <Button form="myForm" key="submit" type="primary" htmlType="submit">
          Lưu
        </Button>,
      ]}
    >
      {loading ? (
        <Loading />
      ) : (
        <Form
          id="myForm"
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 23 }}
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
                <Col span={8}>
                  <Form.Item
                    label="Tên khách hàng"
                    name="name"
                    rules={[{ required: true, message: 'Tên khách hàng không được bỏ trống.' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
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
              </Row>
              <Row>
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
                <Col span={8}>
                  <Form.Item label="Phòng ban" name="department">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Vị trí" name="position">
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
                    <GridContactPerson originData={form.getFieldValue('contactPeoples')} handleChangeData={setContactPerson} rowKey="id" />
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

FilterQuote.propTypes = {};

export default FilterQuote;
