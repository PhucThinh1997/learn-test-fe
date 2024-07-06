import React from 'react';
import PropTypes from 'prop-types';
import './Footer.less';

const Footer = (props) => {
  const { children, ...rest } = props;
  return (
    <div className="footer">
      <div className="footer-col">
        <span>@Copyright</span>
      </div>
    </div>
  );
};

Footer.propTypes = {
  /**
   * list children will render within footer component
   */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Footer;
