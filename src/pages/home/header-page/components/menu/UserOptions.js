import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import {
  ProfileOutlined,
  HomeOutlined,
  GlobalOutlined,
  UserSwitchOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const UserOptions = (props) => {
  const { username, ...rest } = props;
  return (
    <Menu {...rest}>
      <Menu.ItemGroup title={'Welcome, ' + username}>
        <Menu.Item key="my-profile" icon={<ProfileOutlined style={{ fontSize: 16 }} />}>
          Profile
        </Menu.Item>
        <Menu.Item key="my-company" icon={<HomeOutlined style={{ fontSize: 16 }} />}>
          Company
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="approved-sites" icon={<GlobalOutlined style={{ fontSize: 16 }} />}>
          Appro
        </Menu.Item>
        <Menu.Item key="impersonate" icon={<UserSwitchOutlined style={{ fontSize: 16 }} />}>
          adjf
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="help-center" icon={<QuestionCircleOutlined style={{ fontSize: 16 }} />}>
          Helper
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" icon={<LogoutOutlined style={{ fontSize: 16 }} />}>
          Loout
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};

UserOptions.propTypes = {
  /**
   * Current logged in username
   */
  username: PropTypes.string,
};
export default UserOptions;
