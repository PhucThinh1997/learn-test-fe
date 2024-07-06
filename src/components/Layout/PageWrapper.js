import React from 'react';
import classnames from 'classnames';

import './PageWrapper.less';

function PageWrapper({ className, children, ...rest }) {
  return (
    <div className={classnames('section-wrapper', className)} {...rest}>
      {children}
    </div>
  );
}

PageWrapper.propTypes = {};

export default PageWrapper;
