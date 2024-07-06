import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const Indicator = (props) => {
  const { loading, children, delay, size, tip } = props;
  return (
    <Spin spinning={loading} size={size} delay={delay} tip={tip}>
      {children}
    </Spin>
  );
};

Indicator.propTypes = {
  /**
   * children items inside spinner
   */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**
   * the spinner loading state
   */
  loading: PropTypes.bool.isRequired,
  /**
   * spinner size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * A minimal millisecond number waiting before spinner appears
   */
  delay: PropTypes.string,
  /**
   * message display along to spinner
   */
  tip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Indicator.defaultProps = {
  loading: false,
  children: [],
  size: 'medium',
};
export default Indicator;
