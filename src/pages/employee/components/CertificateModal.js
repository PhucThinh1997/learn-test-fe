import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import UploadCustom from 'common/components/uploadCommon/UploadCustom'

const CertificateModal = ({ formInstance, type = 'update', isOpen = false, onClose, isLoading, onFinish }) => (
  <Modal
    title={type === 'update' ? 'Thêm chứng chỉ' : 'Chỉnh sửa chứng chỉ'}
    open={isOpen}
    form={formInstance}
    onCancel={onClose}
    footer={[
      <Button form="certificateForm" key="back" onClick={onClose}>
        Hủy
      </Button>,
      <Button form="certificateForm" key="submit" type="primary" htmlType="submit" loading={isLoading}>
        Lưu
      </Button>,
    ]}
    destroyOnClose={true}
  >
    <Form id="certificateForm" form={formInstance} layout="vertical" onFinish={onFinish}>
      <Form.Item hidden={true} name="employeeId">
        <Input />
      </Form.Item>
      <Form.Item hidden={true} name="id">
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên chứng chỉ"
        name="name"
        rules={[{ required: true, message: 'Tên chứng chỉ không được bỏ trống!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Nơi cấp" name="placeOfIssue">
        <Input />
      </Form.Item>
      <Form.Item hidden={true} name="certificateFile">
        <Input />
      </Form.Item>
      <Form.Item label="Tài liệu" name="certificateFileId">
        <UploadCustom form={formInstance} nameField="certificateFileId" fileObjectName="certificateFile"/>
      </Form.Item>
    </Form>
  </Modal>
);
CertificateModal.propTypes = {};
export default CertificateModal;
