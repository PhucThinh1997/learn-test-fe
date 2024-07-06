import React, { useEffect, useState } from 'react';
import { Form, Modal, TreeSelect, Button } from 'antd';
import { getUserNotInRoles } from 'services/permissions';

const AddUser = ({ isLoading, form, onFinish, isOpen, handleCancel, roleId }) => {
  const [users, setUsers] = useState([]);

  const buildUsers = (data) => {
    const users = data.map((item) => ({
      title: item.userName,
      value: item.id,
      key: item.id,
    }));
    return users;
  };

  useEffect(() => {
    if (isOpen) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId, isOpen]);

  const getUsers = async () => {
    const result = await getUserNotInRoles(roleId);
    if (result.isSuccess) {
      const users = buildUsers(result.data || []);
      setUsers(users);
    }
  };

  return (
    <Modal
      isLoading={isLoading}
      title={form?.getFieldValue('id') ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản'}
      open={isOpen}
      form={form}
      onCancel={handleCancel}
      footer={[
        <Button form="add-user-form" key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button form="add-user-form" key="submit" type="primary" htmlType="submit">
          Lưu
        </Button>,
      ]}
    >
      <Form id="add-user-form" form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tài khoản"
          name="taikhoan"
          rules={[{ required: true, message: 'Tài khoản không được bỏ trống!' }]}
        >
          <TreeSelect
            placeholder="Chọn tài khoản..."
            treeCheckable={true}
            treeData={users}
            treeDefaultExpandAll={true}
            style={{ width: '100%' }}
            allowClear={true}
            filterTreeNode={(search, item) => item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0}
            popupClassName="tree-select-user"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
