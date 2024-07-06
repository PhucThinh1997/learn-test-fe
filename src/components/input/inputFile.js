import React, { useState } from 'react';
import './inputFile.less';
import _ from 'lodash';
import InputCustom from './inputCustom';
import { uploadFile } from '../../services/file-storage/index';
import { Button, Input, Typography } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';

const InputFile = (props) => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  let errUpload = true;
  const acceptDef = '.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf';

  const onChangeFile = (e) => {
    let file = e.target.files[0];

    if (props.isUpload && file != undefined) {
      setLoading(true);
      uploadFile(file)
        .then((res) => {
          if (res?.data?.id) {
            errUpload = false;
            props.getFileIdAfterUpload(res.data.id);
            setShowFileInput(false);
            setFile(file);
            props.getFile(file);
          }
        })
        .catch((err) => () => {})
        .finally(() => {
          setLoading(false);
          if (errUpload) {
            alert('Có lỗi xảy ra khi tải tệp');
            errUpload = true;
            return;
          }
        });
    }
  };

  const renderAttachmentFile = () => {
    if (file?.name && !showFileInput) {
      return (
        <>
          {props?.label !== '' && (
            <Typography.Text className='label-text'>
              {props.label}
            </Typography.Text>
          )}
          <div className="label-text">
            {file.name}
			<EditOutlined  onClick={() => {
                setFile(null);
                setShowFileInput(true);
              }}/>
          </div>
        </>
      );
    }
    if (props.isHook) {
      return (
        <InputCustom
          label={props.label}
          accept={props?.accept ? props.accept : acceptDef}
          control={props.control}
          type="file"
          name={props.name}
          onChange={(e) => onChangeFile(e)}
        />
      );
    } else {
      return (
        <>
          <div>
            {props?.label !== '' && (
              <div className="label-text">
                <Typography.Text>
                  {props.label}
                </Typography.Text>
              </div>
            )}
          </div>
          <div className="btn btn-info btn-file btn-sm" disabled>
            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            {!loading && (
              <>
                <Button icon={<UploadOutlined />}>{props.buttonLabel ?? 'Tải tệp'}</Button>
                <Input
                  id="file"
                  class="inputfile"
                  label={props.label}
                  accept={props?.accept ? props.accept : acceptDef}
                  type="file"
                  name={props.name}
                  onChange={(e) => onChangeFile(e)}
                />
              </>
            )}
          </div>
        </>
      );
    }
  };

  return renderAttachmentFile();
};

export default InputFile;
