import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Row, Col, Button, Dropdown, message } from 'antd';
import { useSelector } from 'react-redux';

import { fowardTo } from 'utils/common/route';
import { cleanUp, getData } from 'utils/storage';
import { USER_KEY, SESSION_KEY, ITEMMENU, SUBMENU, USER_INFO } from 'static/Constants';
import { LoginOutlined, LogoutOutlined, UnlockOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Space from 'components/Space';

import './header.less';
import { logoutAPI } from 'services/login';
import ChangePasswordPopup from './ChangePasswordPopup';
import { CHANGE_PASS_SUCCESS, SAVE_SUCCESS } from 'utils/common/messageContants';

const Header = (props) => {
  const { handleCollapseSidebar, collapsed } = props;
  const userInfo = useSelector((state) => state.global.userInfo);
  const [userName, setUserName] = useState(userInfo);
  const [isOpenPopupChangePass, setIsOpenPopupChangePass] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (!userInfo) {
        const infoLocalStr = await getData(USER_INFO);

        if (infoLocalStr) {
          let userInfoObj = JSON.parse(infoLocalStr)
          setUserName(userInfoObj.displayName);
        } else {
          logout();
        }
      }
    };

    getUser();
  }, []);

  const logout = () => {
    logoutAPI().then(x => {
      cleanUp([USER_KEY, SESSION_KEY, ITEMMENU, SUBMENU, USER_INFO]);
      window.location.reload()
      setTimeout(() => {
        fowardTo('/login');

      }, 1)
    })

  };

  const changePass = () => {
    setIsOpenPopupChangePass(true)
  }

  const handleClickMenu = (item) => {
    switch (item.key) {
      case 'userInfo':
        break;
      case 'changePass':
        changePass();
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      label: 'Thông tin user',
      key: 'userInfo',
      icon: <LoginOutlined />,
    },
    {
      label: 'Đổi mật khẩu',
      key: 'changePass',
      icon: <UnlockOutlined />,
    },
    {
      label: 'Đăng xuất',
      key: 'logout',
      icon: <LogoutOutlined />,
    },
  ];

  const dropdownMenu = <Menu className="menu-dropdown" items={menuItems} onClick={handleClickMenu} />;

  return (
    <div className="header">
      <Row className="wrapper" justify="space-between">
        <Col style={{ fontWeight: 'bold' }}>
          <Space>
            <Button onClick={handleCollapseSidebar} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />{' '}
            CRM SYSTEM
          </Space>
        </Col>
        <Col>
          <Dropdown overlay={dropdownMenu} trigger={['click']}>
            <Button className="header__btn" type="outlined" icon={<UserOutlined />}>
              Chào! {userName || 'User'}
            </Button>
          </Dropdown>
          {isOpenPopupChangePass && (
            <ChangePasswordPopup
              isOpen={isOpenPopupChangePass}
              onClose={() => setIsOpenPopupChangePass(false)}
              changePassSuccess={() => {
                setIsOpenPopupChangePass(false)
                message.success(CHANGE_PASS_SUCCESS);
              }} />
          )}
        </Col>
      </Row>
    </div>
  );
};

Header.propTypes = {
  controlOptions: PropTypes.array,
  optionType: PropTypes.string,
};

export default Header;
