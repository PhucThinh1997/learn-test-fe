import React from 'react';
import { Form, Input, Modal, Button } from 'antd';

const AddRole = ({ isLoading, form, onFinish, isOpen, handleCancel }) => (
  <Modal
    isLoading={isLoading}
    title={form?.getFieldValue('id') ? 'Chỉnh sửa nhóm quyền' : 'Thêm nhóm quyền'}
    open={isOpen}
    form={form}
    onCancel={handleCancel}
    footer={[
      <Button form="add-role-form" key="back" onClick={handleCancel}>
        Hủy
      </Button>,
      <Button form="add-role-form" key="submit" type="primary" htmlType="submit">
        Lưu
      </Button>,
    ]}
  >
    <Form id="add-role-form" form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item hidden={true} label="id" name="id" />
      <Form.Item
        label="Tên nhóm quyền"
        name="name"
        rules={[{ required: true, message: 'Tên nhóm quyền không được bỏ trống!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <Input.TextArea />
      </Form.Item>
    </Form>
  </Modal>
);

export default AddRole;
