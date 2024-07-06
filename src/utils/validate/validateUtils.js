export const valRequired = (yup) => {
	return yup.string().required("Vui lòng nhập");
};

export const valPhone = (yup) => {
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	return yup
		.string()
		.matches(phoneRegExp, "Số điện thoại không hợp lệ")
		.required("Không được để trống");
};
