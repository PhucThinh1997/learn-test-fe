import React from 'react';
import { Layout } from 'antd';

/**
 * Basic content which inherits layout content component of ant design
 * @author
 */
const Content = (props) => {
  const { children, ...rest } = props;
  return <Layout.Content {...rest}>{children}</Layout.Content>;
};

export default Content;
