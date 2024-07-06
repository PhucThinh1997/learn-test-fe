import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';

import { updateSearch } from 'redux/global/actions';
import Scrollbars from 'components/Scrollbars';
import { sidebarRoutes } from 'routes/paths';
import NestableLinkItem from './NestableLinkItem';
// import { useNavigationPermission } from '../useNavigationPermission';
import './Navigation.less';
import useGetUserPermissions from 'hooks/useUserPermissions';
import { PERMISSIONS } from 'static/Permissions';
import { useLocalStorage } from 'hooks/localStorage';

const Navigation = (props) => {
  const { onSelect, collapsed } = props;
  const dispatch = useDispatch();
  const [sidebarItems, setSidebarItems] = useState([]);
  // let routePermissions = useNavigationPermission(sidebarRoutes);
  // let sidebarItems = formattedSidebars(routePermissions, collapsed);
  const [itemSub, setItems] = useState(JSON.parse(localStorage.getItem('items')));
  const permissionsUser = JSON.parse(localStorage.getItem('userInfo'))?.permissions;

  const onClick = (e) => {
    localStorage.setItem('items', JSON.stringify(e.key));
    if (e.keyPath.length > 1) {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[1]));
    } else {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[0]));
    }
    setItems(e.key);

    dispatch(updateSearch(''));
  };

  const filterRouterPermission = (routes) => {
    if (!permissionsUser) return
    if (permissionsUser.includes(PERMISSIONS.admin.ADMIN) || permissionsUser.includes(PERMISSIONS.admin.SUPPER_ADMIN)) { return routes }

    routes.forEach(groupMenu => {
      let permissionsGroup = false
      if (!groupMenu.children) {
        groupMenu.permissions = true
        return;
      }

      groupMenu.children.forEach(subMenu => {
        if (permissionsUser.includes(subMenu.permissions)) {
          subMenu.permissions = true
          if (!permissionsGroup) {
            permissionsGroup = true
          }
        } else {
          subMenu.permissions = false
        }
      })
      groupMenu.permissions = permissionsGroup
    });

    routes = routes.filter(menuItem => menuItem.permissions === true)
    routes.filter(x => x.children).forEach(x => {
      if (x.children) {
        let childrenHasPer = x.children.filter(x => x.permissions === true)
        x.children = childrenHasPer
      }
    })
    return routes
  }

  useEffect(() => {
    const routePermissions = filterRouterPermission(sidebarRoutes)
    const sidebarItems = formattedSidebars(routePermissions, collapsed);
    setSidebarItems(sidebarItems)
  }, [])

  return (
    <Scrollbars className="scroll-bars--navigation" style={{ height: 'calc(100% - 250px)' }} autoHide>
      <Menu
        selectedKeys={[itemSub]}
        onClick={onClick}
        onSelect={onSelect}
        className="menu-navigation"
        mode="inline"
        items={sidebarItems}
        multiple={false}
        subMenuCloseDelay={0}
      />
    </Scrollbars>
  );
};

Navigation.propTypes = {};

export default Navigation;

const formattedSidebars = (sidebars, collapsed) => {
  if (!sidebars) return;

  return sidebars.map((side) => ({
    ...side,
    path: side.path ? side.path : undefined,
    permissions: side.permissions === true ? side.permissions.toString() : side.permissions,
    label: <NestableLinkItem {...side} collapsed={collapsed} />,
    children: side.children && formattedSidebars(side.children, collapsed),
  }));
};
