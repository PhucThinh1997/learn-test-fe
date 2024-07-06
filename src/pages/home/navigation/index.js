import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { Navigation } from './components';
import imageLogo from '../../../assets/CRM_3.png';
import './style.less';

const { Sider } = Layout;

const Sidebar = (props) => {
  const { collapsed, width, collapsedWidth } = props;
  let { pathname } = useLocation();

  return (
    <Sider className={'sider main__navigation'} collapsed={collapsed} width={width} collapsedWidth={collapsedWidth}>
      <div className="logo">
        <img src={imageLogo} alt="logo" />
      </div>
      <Navigation usercls="sider__navigation" mode="inline" selectedKeys={pathname} collapsed={collapsed} />
    </Sider>
  );
};

export default Sidebar;
