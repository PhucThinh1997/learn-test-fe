import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile, getFileModelById } from 'services/file-storage/index';
import _ from 'lodash'

const UploadCustom = ({ form, nameField, fileObjectName }) => {
  const getFiles = () => {
    let files = form?.getFieldValue(fileObjectName)
    if (files) {
      return [{
        uid: files.id,
        name: files.fileName,
        status: 'done',
        url: '',
        thumbUrl: '',
      }]
    }
    return []
  }

  const [fileList, setFileList] = useState(getFiles());
  const isShowButtomImport = fileList.length < 1;

  const convertData = (data) => {
    if(_.isEmpty(data)) return data
    return {id: data[0].uid, fileName: data[0].name };
  }

  const upFile = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    defaultFileList: fileList,
    onRemove: (file) => {
      let filesUpdate = fileList.filter((x) => {
        return x.uid != file.uid;
      });

      setFileList(filesUpdate);
      form.setFieldValue(nameField, '');
      form.setFieldValue(fileObjectName, filesUpdate);
    },
    onChange(info) {
      if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
        uploadFile(info.file)
          .then((res) => {
            if (res?.data?.id) {
              setFileList((pre) => {
                let files = pre.map((x) => {
                  if (x.uid == info.file.uid) x.uid = res?.data?.id;
                  return x;
                });

                return files;
              });

              let fileObj =  convertData(fileList)
              form.setFieldValue(fileObjectName, fileObj);
              form.setFieldValue(nameField, res?.data?.id);
            }
          })
          .catch((err) => () => {
            alert('Có lỗi xảy ra khi tải tệp');
          })
          .finally(() => {});
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return <Upload {...upFile}>{isShowButtomImport && <Button icon={<UploadOutlined />}>File đính kèm</Button>}</Upload>;
};

export default UploadCustom;
