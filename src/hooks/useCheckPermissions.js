import { useGetUserPermissions } from 'pages/home/navigation/components/Navigation';
import { useCallback } from 'react';

export const useCheckPermissions = (permissions) => {
  const userPermissions = useGetUserPermissions();

  for (const permission of permissions) {
    if (userPermissions.can(`${permission.action}`, `${permission.subject}`)) {
      return true;
    }
  }

  return false;
};

const useCheckPermissionOR = () => {
  const userPermissions = useGetUserPermissions();

  const isValidPermissionOR = useCallback(
    (permissions) => {
      if (permissions) {
        if (Array.isArray(permissions?.[0])) {
          for (const permission of permissions) {
            if (userPermissions.can(permission?.[0], permission?.[1])) {
              return true;
            }
          }
        } else {
          return userPermissions.can(permissions?.[0], permissions?.[1]);
        }
      }
      return false;
    },
    [userPermissions],
  );

  return isValidPermissionOR;
};

export const useCheckPermissionAnd = () => {
  const userPermissions = useGetUserPermissions();

  const isValidPermissionAND = useCallback(
    (permissions) => {
      let allowed = true;

      if (permissions) {
        if (Array.isArray(permissions?.[0])) {
          for (const permission of permissions) {
            if (userPermissions.can(permission?.[0], permission?.[1])) {
              allowed *= true;
            } else {
              allowed *= false;
            }
          }
        } else {
          return userPermissions.can(permissions?.[0], permissions?.[1]);
        }
      }

      return allowed ? true : false;
    },
    [userPermissions],
  );

  return isValidPermissionAND;
};

export { useCheckPermissionOR };
