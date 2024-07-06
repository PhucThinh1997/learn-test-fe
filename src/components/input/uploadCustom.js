import * as React from 'react';
import './input.less';
import _ from 'lodash';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadCustom = (props) => {
    let fileList = props.fileList

    const upFile = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            props.setFileList(newFileList);
        },
        beforeUpload: (file) => {
            props.setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const handleChange = (info) => {
        let newFileList = [...info.fileList];
        props.setFileList(newFileList);
    };

    return <Upload
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,.zip,.rar"
        onChange={handleChange}
        multiple={props.multiple}
        {...upFile}
    >
        <Button icon={<UploadOutlined />}>{props.label}</Button>
    </Upload>
};

export default UploadCustom;
