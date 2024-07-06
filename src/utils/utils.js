export const mapToSelectOption = (data) => {
  const options = data.map((x) => {
    return {
      value: x.id,
      label: x.name,
    };
  });
  return options
};

export const isAccessed = (permissionsAction) => {
  if (!permissionsAction) return

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const permissionsList = userInfo.permissions
  if (permissionsList && permissionsList.length > 0) {
    return permissionsList.includes(permissionsAction)
  }

  return false
}
