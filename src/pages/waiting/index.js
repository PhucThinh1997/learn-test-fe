import React, { useEffect } from 'react';
import { WAITING_SCREEN } from 'static/Constants';
import { Row, Col } from 'antd';
import Indicator from 'common/components/indicator/Indicator';
import { fowardTo } from 'utils/common/route';
import './style.less';

/**
 * Waiting screen display 3 seconds before moving on
 * @author
 */
const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => fowardTo('/dashboard'), WAITING_SCREEN);
  });
  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }} className="waiting">
      <Col xs={24} sm={18} md={16} lg={13}>
        <Indicator loading tip="Loading" size="large" />
      </Col>
    </Row>
  );
};

export default SplashScreen;
