/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getFieldsDropDowns } from 'services/fields/';

const Filter = (props) => {
  const {  isOpen, handleClosed, title, onApplyFilter } = props;
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    onApplyFilter(values)
    handleClosed();
  };

  useEffect(() => {
    getFields();
  }, []);

  const getFields = () => {
    getFieldsDropDowns().then(res => {
      setFields(res?.data || []);
    });
   
  };

  const renderFormFilter = () => {
    return (
      <Form
        id="filterForm"
        labelCol={{ span: 14 }}
        wrapperCol={{ span: 23 }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24}>
            <Form.Item
                label="Lĩnh Vực"
                name="fields"
              >
                 <Select>
                    {fields &&
                      fields.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
              </Form.Item>
            </Col>
         
          </Row>
        </Col>
      </Row>
    </Form>
    )
  }

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={handleClosed}
      width={500}
      footer={[
        <Button type="link" form="filterForm" key="back" onClick={onReset}>
          Bộ lọc mặc định
        </Button>,
        <Button form="filterForm" key="submit" type="primary" htmlType="submit">
          Lọc
        </Button>,
      ]}
    >

     {renderFormFilter()}
    </Modal>
  );
};

Filter.propTypes = {};

export default Filter;
