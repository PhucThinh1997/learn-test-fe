import React, { useCallback, useMemo, useState } from 'react';
import { Row, Typography, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ButtonDelete, ButtonEdit } from 'common/components/Buttons';
import AddRoleModal from './AddRole';
import Space from 'components/Space';
import * as actions from '../controllers/actions';
import * as selectors from '../controllers/selectors';
import { useDeleteRole, useGetRoles, useSaveRole } from '../utils';
import Grid from 'components/Grid';
import PageWrapper from 'components/Layout/PageWrapper';
import './RoleList.less';

const RoleList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { roles, getRoleList, handleSearch } = useGetRoles();
  const idsSelection = useSelector(selectors.selectActiveRoleId());

  const onSaveSuccess = useCallback(() => {
    getRoleList();
    setIsOpen(false);
  }, [getRoleList]);

  const { form, isLoading, onFinishModal: onFinish } = useSaveRole(onSaveSuccess);
  const { onClickDelete } = useDeleteRole(() => getRoleList());

  const onClickUpdateModal = useCallback(
    (values) => {
      form.setFieldsValue(values);
      setIsOpen(true);
    },
    [form],
  );

  const columns = useMemo(
    () => [
      {
        title: 'Tên nhóm',
        dataIndex: 'name',
        width: '50%',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        sorter: false,
        width: '46%',
      },
      {
        title: '',
        dataIndex: 'action',
        render: (_, value) => (
          <>
            {value?.name !== 'Administrators' && (
              <Space>
                <ButtonEdit onClick={() => onClickUpdateModal(value)} />
                <ButtonDelete onClick={() => onClickDelete(value.id)} />
              </Space>
            )}
          </>
        ),
        width: '4%',
      },
    ],
    [onClickDelete, onClickUpdateModal],
  );

  const rowSelection = {
    type: 'radio',
    selectedRowKeys: [idsSelection],
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(actions.setActivedRoleId(selectedRowKeys[0]));
      dispatch(actions.setActivedRoleDetail(selectedRows[0]));
    },
  };

  return (
    <>
      <div className="role-list">
        <RoleTool addRole={() => setIsOpen(true)} onSearch={handleSearch} />
        <PageWrapper>
          <Grid
            rowKey="id"
            columns={columns}
            data={roles.currentRoles}
            rowSelection={rowSelection}
            shouldShowTotal={false}
            pageSize={20}
          />
        </PageWrapper>
      </div>
      <AddRoleModal
        isLoading={isLoading}
        isOpen={isOpen}
        handleCancel={() => {
          form.resetFields();
          setIsOpen(false);
        }}
        form={form}
        onFinish={onFinish}
      />
    </>
  );
};

export default RoleList;

export const RoleTool = ({ addRole, onSearch }) => (
  <Row className="role-list__tool" align="space-between">
    <Typography.Title level={4} style={{ margin: 0 }}>
      Nhóm quyền
    </Typography.Title>
    <Space>
      <Input.Search placeholder="Tìm kiếm nhóm quyền" type="primary" onSearch={onSearch} enterButton allowClear />
      <Button type="primary" style={{ width: '170px' }} onClick={addRole} icon={<PlusCircleOutlined />}>
        Thêm nhóm quyền
      </Button>
    </Space>
  </Row>
);
