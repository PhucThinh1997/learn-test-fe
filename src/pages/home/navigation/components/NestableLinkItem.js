import React from 'react';
import { NavLink } from 'react-router-dom';
import './NestableLinkItem.less';

const NestableLinkItem = (props) => {
  const { path, label, collapsed } = props;
  const Icon = props?.ic;

  const renderText = () => (
    <div className="navlink-menu__text">
      {Icon ? <Icon /> : null} {!collapsed && label}
    </div>
  );

  return (
    <div>
      {path ? (
        <NavLink to={`/${path}`} className="navlink-menu">
          {renderText()}
        </NavLink>
      ) : (
        renderText()
      )}
    </div>
  );
};

NestableLinkItem.propTypes = {};

export default NestableLinkItem;
