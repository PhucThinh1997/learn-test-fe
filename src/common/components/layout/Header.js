import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

/**
 * Basic header which inherits from header layout of ant design
 * @author
 */
const Header = (props) => {
  const { children, align, ...rest } = props;
  return (
    <Layout.Header {...rest} align={align}>
      {children}
    </Layout.Header>
  );
};

Header.propTypes = {
  /**
   * Align children in header
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * List children will render inside header
   */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
};

export default Header;
