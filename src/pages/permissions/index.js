import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';

import HeaderPage from 'pages/home/header-page';
import RoleList from './components/RoleList';
import PermissionList from './components/PermissionList';
import RoleUsers from './components/RoleUsers';
import PageWrapper from 'components/Layout/PageWrapper';

import { useInjectReducer } from 'utils/common/injectedReducers';
// import { useInjectSaga } from 'utils/common/injectSaga';
import reducers from './controllers/reducer';
import * as actions from './controllers/actions';

// Services
import { getPermissionsAvailable } from 'services/permissions';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';
// import PermissionListV2 from './components/PermissionListV2';
// import saga from './controllers/saga';

const key = 'rolePermission';

const Permission = () => {
  useInjectReducer({ key, reducer: reducers });
  // useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  useEffect(() => {
    const getPermissionsAvailableInRole = async () => {
      const res = await getPermissionsAvailable();
      if (res.isSuccess) {
        const permissionsAvailable = res.data || [];
        dispatch(actions.setPermissionsAvailbe(permissionsAvailable));
      }
    };

    getPermissionsAvailableInRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="permisions">
      {isAccessed(PER.PHAN_QUYEN) && (
        <div>

          <HeaderPage title="PHÂN QUYỀN" actions={false} />
          <div className="main__application">
            <PageWrapper>
              <Row gutter={16}>
                <Col span={16}>
                  <RoleList />
                  <RoleUsers />
                </Col>
                <Col span={8}>
                  <PermissionList />
                </Col>
              </Row>
            </PageWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

Permission.propTypes = {};

export default Permission;
