/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, Row, Col, Form, Upload } from 'antd';
import { formatDateYMD } from 'utils/format';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputCustom from 'components/input/inputCustom';
import "./index.less"
import { MODE } from 'constants/mode.cost';
import { getToDay } from 'utils/dateUtils';
import { valRequired } from 'utils/validate/validateUtils';
import { reportResult } from 'services/technicalBusiness/managerService';
import { uploadMultipleFiles } from 'services/file-storage';
import UploadCustom from 'components/input/uploadCustom';

const ResultTask = (props) => {
  const { id, isOpen, onClose, reloadTable } = props;

  const [form] = Form.useForm();
  const schema = yup.object().shape({
    completedDate: valRequired(yup),
    completedNote: valRequired(yup)
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
  const [mode, setMode] = useState(MODE.CREATE)
  const [fileList, setFileList] = useState([]);

  const onSubmit = (data) => {
    uploadMultipleFiles(fileList, false, (filesString) => {
      console.log("cb", filesString)
      let request = {
        ...data,
        id: id,
        completedDate: formatDateYMD(data.startDate),
      };
      if (filesString) {
        request.technicalReportFileId = filesString;
      }
      report(request)
    });
  }

  const report = (request) => {
    reportResult(request).then((res) => {
      onClose();
      reloadTable()
      return;
    })
  };

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    defaultValueInModeCreate()
  }, [id])

  const defaultValueInModeCreate = () => {
    setValue('completedDate', getToDay());
  }

  const getTitle = () => {
    return "Báo cáo kết quả";
  }

  return (
    <>
      <Modal
        title={getTitle()}
        open={isOpen}
        form={form}
        width={700}
        onCancel={handleCancel}
        className="modal-tech"
        footer={null}
      >
        <form className="form-tech" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className='col-input' span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngày hoàn thành"
                control={control}
                type="date"
                name="completedDate"
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={24}>
              <InputCustom
                TitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Kết quả"
                control={control}
                type="textarea"
                rows={4}
                name="completedNote"
                isRequired
                errors={errors}
              />
            </Col>
          </Row>
          <Row style={{ paddingBottom: '20px' }}>
            <Col className='col-input' span={24}>
              <UploadCustom
                fileList={fileList}
                label="File đính kèm kết quả"
                multiple={false}
                setFileList={(files) => setFileList(files)}
              />
            </Col>
          </Row>
          <div className="my-modal-footer">
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </form>
      </Modal >
    </>
  );
};

ResultTask.propTypes = {};
export default ResultTask;
