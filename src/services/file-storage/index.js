/** @format */

import * as api from "../../config/axios";
import * as endpoints from "./endpoints";
import axios from "axios";

export const getFileById = (id) => {
	return api.sendGet(endpoints.GET_FILE + id);
};

export const getFileModelById = (id) => {
	return api.sendGet(endpoints.GET_FILE + id + '/model');
};


export const getFileBase64ById = (id) => {
	return api.sendGet(endpoints.GET_FILE + id + "/base64");
};

export const uploadFile = (file) => {
	let formData = new FormData();
	formData.append("formFile", file);
	let hearder = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};
	return api.sendPost(endpoints.GET_FILE, formData, hearder);
};

export const uploadMultipleFiles = (fileList, isMul, cb) => {
	let promises = [];
	if (!fileList || fileList?.length === 0) {
		cb('');
		return;
	}

	fileList
		.forEach((file, index) => {
			promises.push(uploadFile(file.originFileObj));
		});

	try {
		Promise.all(promises).then((res) => {
			if (isMul) {
				cb(res.map((x) => x.data.id).toString());
			} else {
				cb(res[0].data.id.toString());
			}
		});
	} catch (error) {
		// Handle all errors
	}
};
