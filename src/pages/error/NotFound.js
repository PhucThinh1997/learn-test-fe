import React from 'react';
import { Result, Button } from 'antd';

const NotFound = (props) => {
  const { customIcon, ...rest } = props;
  return (
    <Result
      status="404"
      title="404"
      icon={customIcon}
      subTitle={'Not found'}
      extra={<Button type="primary">Back Home</Button>}
      {...rest}
    />
  );
};

export default NotFound;
