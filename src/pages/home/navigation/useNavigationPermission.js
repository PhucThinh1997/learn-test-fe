// import useGetUserPermissions from 'hooks/useUserPermissions';

// export function  useNavigationPermission = (routes) => {
export function useNavigationPermission(routes) {
  const permissionMockup = [
    'KHOA_PHONG_BAN',
    'NHAN_VIEN'
  ];
  routes.forEach(groupMenu => {
    let permissionsGroup = false
    if (!groupMenu.children) {
      groupMenu.permissions = true
      return;
    }

    groupMenu.children.forEach(subMenu => {
      if (permissionMockup.includes(subMenu.permissions)) {
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
  return routes
};