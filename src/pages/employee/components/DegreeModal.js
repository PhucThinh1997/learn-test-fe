import React, { useRef } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import UploadCustom from 'common/components/uploadCommon/UploadCustom'

export const DEGREE_OPTION = [
	{ value: 0, label: "Trung Cấp" },
	{ value: 1, label: "Cao đẳng" },
	{ value: 2, label: "Cử nhân" },
	{ value: 3, label: "Thạc sĩ" },
	{ value: 4, label: "Tiến sĩ" },
];

const DegreeModal = ({ formInstance, type = 'update', isOpen = false, onClose, isLoading, onFinish }) => (
  
  <Modal
    title={type === 'update' ? 'Thêm bằng cấp' : 'Chỉnh sửa bằng cấp'}
    open={isOpen}
    form={formInstance}
    onCancel={onClose}
    footer={[
      <Button form="degreeForm" key="back" onClick={onClose}>
        Hủy
      </Button>,
      <Button form="degreeForm" key="submit" type="primary" htmlType="submit" loading={isLoading}>
        Lưu
      </Button>,
    ]}
    destroyOnClose={true}
  >
    <Form id="degreeForm" form={formInstance} layout="vertical" onFinish={onFinish}>
      <Form.Item hidden={true} name="employeeId">
        <Input />
      </Form.Item>
      <Form.Item hidden={true} name="id">
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên bằng cấp"
        name="name"
        rules={[{ required: true, message: 'Tên bằng cấp không được bỏ trống!' }]}
      >
        <Select
          // defaultValue="lucy"
          style={{ width: 120 }}
          // onChange={handleChange}
          options={DEGREE_OPTION}
        />
      </Form.Item>
      <Form.Item label="Chuyên ngành" name="major">
        <Input />
      </Form.Item>
      <Form.Item label="Xếp loại" name="levelOfTraining">
        <Input />
      </Form.Item>
      <Form.Item label="Hình thức đào tạo" name="formOfTraining">
        <Input />
      </Form.Item>
      <Form.Item label="Năm tốt nghiệp" name="yearOfGraduation">
        <InputNumber min={1971} />
      </Form.Item>
      <Form.Item label="Trường đào tạo" name="university">
        <Input />
      </Form.Item>
      <Form.Item label="Số hiệu trường" name="numberOfUniversity">
        <InputNumber min={1971} />
      </Form.Item>
      <Form.Item hidden={true} name="degreeFile">
        <Input />
      </Form.Item>
      <Form.Item label="Tài liệu" name="degreeFileId">
        <UploadCustom form={formInstance} nameField="degreeFileId" fileObject="degreeFile" fileObjectName="degreeFile"/>
      </Form.Item>
    </Form>
  </Modal>
);
DegreeModal.propTypes = {};
export default DegreeModal;
