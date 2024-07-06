import React, { useCallback, useEffect, useState, useMemo, memo } from 'react';
import { Typography, Button, Spin, Space, Modal, message, Row, Input, TreeSelect } from 'antd';
import { PlusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Services
import { getPermissionsInRole, getPermissionsTreeModel, saveRole } from 'services/permissions';
import { DELETE_SUCCESS, DELETE_ERROR, SAVE_ERROR, SAVE_SUCCESS } from 'utils/common/messageContants';

// Components
import Grid from 'components/Grid';
import PageWrapper from 'components/Layout/PageWrapper';

import * as selectors from '../controllers/selectors';

import './PermissionList.less';
import TreePermissions from './TreePermission/TreePermissions';
import { isAccessed } from 'utils/utils';

const PermissionList = () => {
  const roleSelected = useSelector(selectors.selectActiveRoleDetail());
  const permissionsAvailable = useSelector(selectors.setPermissionsAvaiable());
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;

  const [permissions, setPermission] = useState({
    allPermisions: [],
    currentPermisions: [],
  });
  const [permissionsSelected, setPermissionsSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [treePermissions, setTreePermissions] = useState([]);
  const [checkedData, setCheckedData] = useState([]);


  const permissionsUnInRole = useMemo(() => {
    // #29 - Filter permissions exist in role before
    const permissionsUnRole = permissionsAvailable.filter(
      (el) => !permissions.allPermisions.find((element) => element.name === el.name),
    );

    return (
      permissionsUnRole.map((item) => ({
        label: item.name,
        value: item.id,
        key: item.id,
      })) || []
    );
  }, [permissions, permissionsAvailable]);

  useEffect(() => {
    if (roleSelected) {
      const getPermissionUser = async () => {
        await getPermissionsData();
      };

      getPermissionUser();

      // Clear search value
      setSearchValue('');
    }
  }, [roleSelected]);

  const getPermissionsData = async () => {
    setLoading(true);
    const data = await getPermissionsInRole(roleSelected?.id);

    if (data?.isSuccess) {
      let permission = data?.data || [];
      //permission = permission.map((item, index) => ({ ...item, id: `${index}_${item.permissionName}` }));
      setPermission({
        allPermisions: permission,
        currentPermisions: permission,
      });
      setCheckedData(permission.map(x => x.id))
    }
    setLoading(false);
  };

  const handleSearch = (text) => {
    const allPers = permissions.allPermisions;

    if (!text) {
      setPermission({
        allPermisions: allPers,
        currentPermisions: allPers,
      });
      return;
    }
    const newPermisions = allPers.filter((el) => {
      if (el.permissionDisplayName && el.permissionDisplayName.toLowerCase().includes(text.toLowerCase())) return el;
    });
    setPermission({
      allPermisions: allPers,
      currentPermisions: newPermisions,
    });
  };

  const handleOnChangeSearch = useCallback((e) => setSearchValue(e.target.value), [searchValue]);

  const onClickDelete = useCallback(
    (value) => {
      Modal.confirm({
        title: 'Xác Nhận',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
        okText: 'Xác Nhận',
        cancelText: 'Hủy',
        onOk: () => handleDeletePermission(value),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [permissions],
  );

  const handleDeletePermission = useCallback(
    async (value) => {
      setLoading(true);
      const allPer = permissions?.allPermisions || [];
      const currentPer = permissions?.currentPermisions || [];

      // Remove permission in all permissions
      const permissionUpdate = allPer.filter((item) => item.id !== value.id);

      // Remove permission in current permissions
      const currentPermissionUpdate = currentPer.filter((item) => item.id !== value.id);

      let dataUpdated = [];

      permissionUpdate.map((item) => {
        if (item.id !== permissionUpdate.id) {
          dataUpdated.push(item.id);
        }
      });

      const res = await handleSaveRole(dataUpdated);

      if (res.isSuccess) {
        message.success(DELETE_SUCCESS);
        setPermission({
          currentPermisions: currentPermissionUpdate,
          allPermisions: permissionUpdate,
        });
      } else {
        message.error(res?.message || DELETE_ERROR);
      }
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [permissions],
  );

  const handleSaveRole = useCallback(
    async (dataUpdated) => {
      const payload = {
        id: roleSelected.id,
        input: {
          id: roleSelected.id,
          name: roleSelected.name,
          description: roleSelected.description,
          permissions: dataUpdated,
        },
      };

      const res = await saveRole(payload);

      return res;
    },
    [roleSelected, permissionsSelected],
  );

  const onCreate = useCallback(() => {
    setToggleModal(true);
  }, [permissions, permissionsAvailable]);


  const handleCancel = () => {
    setToggleModal(false);
    setPermissionsSelected([]);
  };

  const handleOnChangePermissions = useCallback(
    (value) => {
      setPermissionsSelected(value);
    },
    [permissionsUnInRole, permissionsSelected],
  );

  const handleAddNewPermissions = (perChecked) => {
    setCheckedData(perChecked)
    setLoading(true);
    // #29 - Add permissions in role
    handleSaveRole(perChecked).then(res => {
      if (res.isSuccess) {
        message.success(SAVE_SUCCESS);
      } else {
        message.error(res?.message || SAVE_ERROR);
      }
      setLoading(false);
    })
  };

  useEffect(() => {
    let a = isAccessed('thinh')
    getPermissionsTreeModel().then(res => {
      setTreePermissions(res.data)
    })
  }, []);

  return (
    <>
      <PageWrapper className={permissions.currentPermisions?.length == 0 ? 'no-record' : ''}>
        <Spin spinning={isLoading}>
          <TreePermissions
            treeData={treePermissions}
            checkedData={checkedData}
            savePermissionsIntoRole={(perChecked) => handleAddNewPermissions(perChecked)}
          />
        </Spin>
      </PageWrapper>
    </>
  );
};

PermissionList.propTypes = {
  roleSelected: PropTypes.object,
};

export default memo(PermissionList);
