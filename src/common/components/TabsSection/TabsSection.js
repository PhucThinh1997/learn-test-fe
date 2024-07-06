import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import classnames from 'classnames';
import './TabsSection.less';

function TabsSection(props) {
  const { items, className, defaultActiveKey = '0', ...rest } = props;

  return (
    <div className={classnames('tabs-section', className)}>
      <Tabs items={items} type="card" tabBarGutter={0} defaultActiveKey={defaultActiveKey} {...rest} />
    </div>
  );
}

TabsSection.propTypes = {
  item: PropTypes.array,
  className: PropTypes.string,
};

export default TabsSection;
