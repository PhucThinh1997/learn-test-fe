import React, { useState, useCallback, useEffect } from 'react';
import { Form, message, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import * as rolePermissionsServices from 'services/permissions';
import { DELETE_ERROR, DELETE_SUCCESS } from 'utils/common/messageContants';
import * as actions from './controllers/actions';

export const useGetRoles = () => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState({
    allRoles: [],
    currentRoles: [],
  });
  const [status, setStatus] = useState('idle');

  const handleSearch = (text) => {
    const allRole = roles.allRoles;

    if (!text) {
      setRoles({ allRoles: allRole, currentRoles: allRole });
      return;
    }
    const newRoles = allRole.filter((el) => {
      if (el.displayName && el.displayName.toLowerCase().includes(text.toLowerCase())) return el;
    });
    setRoles({ allRoles: allRole, currentRoles: newRoles });
  };

  const handleFirstRole = useCallback(
    (roles) => {
      if (roles?.length > 0) {
        dispatch(actions.setActivedRoleDetail(roles[0]));
        dispatch(actions.setActivedRoleId(roles[0]?.id));
      }
    },
    [dispatch],
  );

  const getRoleList = useCallback(async () => {
    try {
      setStatus('loading');
      const result = await rolePermissionsServices.getRoles();
      if (result?.isSuccess) {
        setRoles({
          allRoles: result?.data,
          currentRoles: result?.data,
        });
        setStatus('success');
        handleFirstRole(result?.data);
      } else {
        setRoles({
          allRoles: [],
          currentRoles: [],
        });
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }, [handleFirstRole]);

  useEffect(() => {
    getRoleList();
  }, [getRoleList]);

  return { roles, status, getRoleList, handleSearch };
};

export const useSaveRole = (callbackFunc) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (name, description, id, permissions) => {
    const data = {
      id: id,
      input: {
        id: id,
        name: name,
        description: description,
      },
    };
    setIsLoading(true);
    const result = await rolePermissionsServices.saveRole(data);
    if (result.isSuccess) {
      form.resetFields();
      callbackFunc && callbackFunc(result?.data?.roleId);
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
  };

  const onFinishModal = () => {
    const { name, description, id } = form.getFieldsValue();
    handleSubmit(name, description, id, []);
  };

  return {
    form,
    handleSubmit,
    isLoading,
    onFinishModal,
  };
};

export const useDeleteRole = (callbackFunc) => {
  const deleteRole = useCallback(
    async (roleId) => {
      const result = await rolePermissionsServices.deleteRole(roleId);
      if (result.isSuccess) {
        message.success(DELETE_SUCCESS);
        callbackFunc && callbackFunc();
      } else {
        message.error(DELETE_ERROR);
      }
    },
    [callbackFunc],
  );

  const onClickDelete = useCallback(
    (roleId) => {
      Modal.confirm({
        title: 'Xác Nhận',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
        okText: 'Xác Nhận',
        cancelText: 'Hủy',
        onOk: () => deleteRole(roleId),
      });
    },
    [deleteRole],
  );

  return {
    deleteRole,
    onClickDelete,
  };
};
