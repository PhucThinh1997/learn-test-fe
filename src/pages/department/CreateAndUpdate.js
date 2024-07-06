/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, InputNumber, Select } from 'antd';
import { createDepartment, getDepartmentById, updateDepartment } from 'services/department/index';
import { SAVE_SUCCESS } from 'utils/common/messageContants';
import './style.less';

const CreateAndUpdate = (props) => {
  const { isOpen, ID, onClose, title, form, reload, setCode, dropdownDepartment } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = (values) => {
    let updateValues = {
      code: values?.code?.trim() || '',
      name: values?.name?.trim() || '',
      mandates: values?.mandates?.trim() || '',
      location: values?.location?.trim() || '',
      sequence: values?.sequence,
      parentId: values?.parentId,
    };

    const id = form.getFieldValue('id')
    if (id) {
      updateValues = { ...updateValues, id: id};
      handleUpdateDepartment({ id: id, input: updateValues });
    } else {
      handleCreateDepartment(updateValues);
    }
  };
  const handleCreateDepartment = async (values) => {
    setIsLoading(true);
    const result = await createDepartment(values);
    if (result.isSuccess) {
      handleCancel();
      reload(true);
      message.success(SAVE_SUCCESS);
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
  };

  const handleUpdateDepartment = async (values) => {
    setIsLoading(true);
    const result = await updateDepartment(values);
    if (result.isSuccess) {
      handleCancel();
      reload(true);

      message.success(SAVE_SUCCESS);
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={isOpen}
        className="forn-create-department"
        form={form}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button form="myForm" key="submit" type="primary" htmlType="submit">
            Lưu
          </Button>,
        ]}
      >
        <Form id="myForm" form={form} layout="vertical" onFinish={onFinish}>
          {ID && <Form.Item hidden={true} name="id"></Form.Item>}
          <Form.Item
            label="Mã Khoa/Phòng/Ban"
            name="code"
            rules={[{ required: true, message: 'Mã khoa/phòng/ban không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên Khoa/Phòng/Ban"
            name="name"
            rules={[{ required: true, message: 'Tên khoa/phòng/ban không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Chức năng nhiệm vụ" name="mandates">
            <Input />
          </Form.Item>
          <Form.Item label="Vị trí" name="location">
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Thuộc Khoa/Phòng/Ban"
            name="parentId"
            // rules={[{ required: true, message: 'Vui lòng nhập Thuộc Khoa/Phòng/Ban!' }]}
          >
            <Select>
              {dropdownDepartment &&
                dropdownDepartment.map((item, index) => (
                  <Select.Option key={index} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item> */}
          <Form.Item label="Thứ tự sắp xếp" name="sequence">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

CreateAndUpdate.propTypes = {};
export default CreateAndUpdate;
