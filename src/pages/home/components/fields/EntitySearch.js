import React from 'react';
import { HeaderLayout } from 'common/components';

const EntitySearch = (props) => {
  const { children, ...rest } = props;

  return <HeaderLayout {...rest}>{children}</HeaderLayout>;
};

EntitySearch.propTypes = {};

export default EntitySearch;
