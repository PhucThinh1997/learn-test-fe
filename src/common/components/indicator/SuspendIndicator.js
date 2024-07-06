import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin, Row } from 'antd';
/**
 * delay showing indicator after milliseconds
 * @author
 */
const DelayedFallback = (props) => {
  const { size, delay, tip } = props;
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [show, delay]);

  return (
    <>
      {show && (
        <Row style={{ height: '100vh' }} justify="center" align="middle">
          <Spin size={size} tip={tip} />
        </Row>
      )}
    </>
  );
};

DelayedFallback.propTypes = {
  /**
   * spinner size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * delay milliseconds before showing spinner
   */
  delay: PropTypes.number,
  /**
   * show spinner state
   */
  show: PropTypes.bool,
};

DelayedFallback.defaultProps = {
  size: 'medium',
  show: false,
};

export default DelayedFallback;
