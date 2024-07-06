import React, { useState } from 'react';
import { Layout } from 'antd';

import HomeRoutes from 'routes/HomeRoutes';
import Sidebar from './navigation';
import HeaderProject from './header';
import Footer from './footer';
import './style.less';

const { Content, Header } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="home-page">
      <Sidebar collapsible collapsed={collapsed} collapsedWidth={80} width={250} setCollapsed={setCollapsed} />
      <Layout className="lims-app-content">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <HeaderProject handleCollapseSidebar={() => setCollapsed(!collapsed)} collapsed={collapsed} />
        </Header>
        <Content className="main__content">
          <HomeRoutes />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default HomePage;
