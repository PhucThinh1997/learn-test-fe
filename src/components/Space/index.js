import React from 'react';
import { Space as AntSpace } from 'antd';
import clsx from 'classnames';
import './styles.less';

const Space = ({ children, className = '', fullWidth = false, ...rest }) => (
  <AntSpace className={clsx(fullWidth && 'space-full-width', className)} {...rest}>
    {children}
  </AntSpace>
);

Space.propTypes = {};

export default Space;
