import React from 'react';
import { Scrollbars as ScrollbarsReactCustom } from 'react-custom-scrollbars-2';
import clsx from 'classnames';
import './styles.less';

const Scrollbars = ({ className, children, ...rest }) => (
  <ScrollbarsReactCustom className={clsx('scroll-bars', className && className)} {...rest}>
    {children}
  </ScrollbarsReactCustom>
);

export default Scrollbars;
