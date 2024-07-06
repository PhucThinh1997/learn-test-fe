import React from 'react';
import { Result, Button } from 'antd';
import { fowardTo } from 'utils/common/route';

const ImplementResult = (props) => {
  const { module } = props;
  return (
    <Result
      status="warning"
      title={module + ' sẽ sớm để phục vụ bạn!'}
      extra={
        <Button type="primary" key="back-to-dashboard" onClick={() => fowardTo('/dashboard')}>
          Về Trang chủ
        </Button>
      }
    />
  );
};

export default ImplementResult;
