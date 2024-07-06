import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Input, Row, Typography, Button, Spin, Form, message } from 'antd';
import Grid from 'components/Grid';
import { ButtonDelete } from 'common/components/Buttons';
import { PlusCircleOutlined } from '@ant-design/icons';
import Space from 'components/Space';
import * as selectors from '../controllers/selectors';
import './RoleUsers.less';
import { getUserInRole, saveUserToRole, deleteUserToRole } from 'services/permissions';
import PageWrapper from 'components/Layout/PageWrapper';
import AddUser from './AddUser';
import { DELETE_SUCCESS } from 'utils/common/messageContants';

const RoleUsers = () => {
  const activeRoleId = useSelector(selectors.selectActiveRoleId());

  const [isLoading, setLoading] = useState(false);
  const [userInRole, setUserInRole] = useState({
    allUsers: [],
    currentUsers: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    if (activeRoleId) {
      setSearchValue('');
    }
  }, [activeRoleId]);

  const onFinish = () => {
    const { taikhoan } = form.getFieldsValue();
    handleSubmit({ roleId: activeRoleId, userIds: taikhoan });
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    const result = await saveUserToRole(data);
    if (result.isSuccess) {
      form.resetFields();
      setIsOpen(false);
      getPermissionUser();
    } else {
      message.error(result.message);
    }
    setLoading(false);
  };
  const onClickDelete = useCallback(
    async (id) => {
      setLoading(true);
      const result = await deleteUserToRole({ roleId: activeRoleId, userIds: [id] });
      if (result.isSuccess) {
        message.success(DELETE_SUCCESS);
        getPermissionUser();
      } else {
        message.error(result.message);
      }
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeRoleId],
  );

  const columns = useMemo(
    () => [
      {
        title: 'Tên người dùng',
        dataIndex: 'userName',
      },
      {
        title: 'Tài khoản',
        dataIndex: 'email',
        width: '46%',
      },
      {
        title: '',
        dataIndex: 'action',
        width: '30px',
        // eslint-disable-next-line no-unused-vars
        render: (_, value) => <ButtonDelete onClick={() => onClickDelete(value.id)}></ButtonDelete>,
      },
    ],
    [onClickDelete],
  );

  useEffect(() => {
    if (activeRoleId) {
      getPermissionUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoleId]);

  const getPermissionUser = async () => {
    setLoading(true);
    const data = await getUserInRole(activeRoleId);
    if (data.isSuccess) {
      setUserInRole({
        allUsers: data.data,
        currentUsers: data.data,
      });
    }
    setLoading(false);
  };
  if (!activeRoleId) return null;

  const handleSearch = (text) => {
    const users = userInRole.allUsers;

    if (!text) {
      setUserInRole({ allUsers: users, currentUsers: users });
      return;
    }
    const newUsers = users.filter((el) => {
      if (el.tenNhanVien && el.tenNhanVien.toLowerCase().includes(text.toLowerCase())) return el;
    });
    setUserInRole({ allUsers: users, currentUsers: newUsers });
  };

  const handleOnChangeSearch = (e) => setSearchValue(e.target.value);

  return (
    <>
      <Row className="role-users">
        <RoleUserTool
          addUser={() => setIsOpen(true)}
          onSearch={handleSearch}
          searchValue={searchValue}
          onChangeSearch={handleOnChangeSearch}
        />
      </Row>
      <PageWrapper className={userInRole.currentUsers.length === 0 ? 'no-record' : ''}>
        <Spin spinning={isLoading}>
          {userInRole.currentUsers.length > 0 ? (
            <Grid
              rowKey="id"
              hasRowSelected={false}
              columns={columns}
              shouldShowTotal={true}
              data={userInRole.currentUsers}
              pageSize={5}
            />
          ) : (
            !isLoading && <span> Không có tài khoản cho nhóm quyền</span>
          )}
        </Spin>
      </PageWrapper>
      <AddUser
        isLoading={isLoading}
        isOpen={isOpen}
        handleCancel={() => {
          form.resetFields();
          setIsOpen(false);
        }}
        form={form}
        onFinish={onFinish}
        roleId={activeRoleId}
      />
    </>
  );
};

RoleUsers.propTypes = {};

export default RoleUsers;

export const RoleUserTool = ({ addUser, onSearch, searchValue, onChangeSearch }) => (
  <Row className="role-users__tool" align="space-between">
    <Typography.Title level={4} style={{ margin: 0 }}>
      Danh sách tài khoản
    </Typography.Title>
    <Space>
      <Input.Search
        value={searchValue}
        onChange={onChangeSearch}
        placeholder="Tìm kiếm tài khoản"
        type="primary"
        onSearch={onSearch}
        enterButton
        allowClear
      />
      <Button type="primary" style={{ width: '170px' }} onClick={addUser} icon={<PlusCircleOutlined />}>
        Thêm tài khoản
      </Button>
    </Space>
  </Row>
);
