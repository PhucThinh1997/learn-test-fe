import React, { useEffect, useMemo, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Button } from 'antd';
import { ButtonDelete, ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import Space from 'components/Space';
import CertificateModal from './CertificateModal';
import { WrapperSection } from '../Detail';
import './Certificate.less';
import { v4 as uuid } from 'uuid';
import _ from 'lodash'

const CertificateGrid = ({ data = [], employeeId, getDataDetail, isUpdate, setCertificates }) => {
  const [openModalCertificate, setOpenModalCertificate] = useState(false);
  const [formattedData, setFormattedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const [form] = Form.useForm();
  useEffect(() => {
    let dataSource = data.filter((x) => x.isDeleted == false)
    // const formatedData = data?.length > 0 ? data?.map((d) => ({ ...d })) : [];
    setFormattedData(dataSource);
  }, [data]);

  useEffect(() => {
    const dataCertificate = { ...formattedData };
    setFormattedData(dataCertificate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const onFinish = (values) => {
    if (selectedData) {
      const newCertificate = data.map((item) => {
        if ((!_.isUndefined(item.id) && item.id === selectedData.id) ||(item.rowId === selectedData.rowId)) {
          return {
            ...item,
            name: values.name,
            placeOfIssue: values.placeOfIssue,
            certificateFileId: values.certificateFileId,
            certificateFile: values.certificateFile,
          };
        }
        return item;
      });
      setCertificates(newCertificate);
    } else {
      const newCertificate = [...data];
      newCertificate.push({ ...values, rowId: uuid(), isDeleted : false });
      setCertificates(newCertificate);
    }
    form.resetFields();
    setOpenModalCertificate(false);
  };

  const handleClose = () => {
    setOpenModalCertificate(false);
    form.resetFields();
  };

  const handleDeleteCertificate = (id) => {
    let dataSource = _.clone({ ...formattedData });
    const newCertificates = _.map( dataSource , (item) => {
      if (item.id === id) item.isDeleted = true;
      return item
    });
    let dataSet = _.filter(dataSource, (x) => x.isDeleted == false)
    setFormattedData(dataSet)
    setCertificates(newCertificates);
  };

  const handleConfirmDelete = (value) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDeleteCertificate(value.id),
    });
  };

  const columns = useMemo(
    () => [
      {
        title: 'Tên chứng chỉ',
        dataIndex: 'name',
        width: '200px',
      },
      {
        title: 'Nơi cấp',
        dataIndex: 'placeOfIssue',
      },
      {
        title: 'Tài liệu',
        dataIndex: 'certificateFileId',
        minWidth: '250px',
        inputType: 'upload',
        render: (value, recore, index)=> { 
           return <>
            <lable>{ recore?.certificateFile?.fileName }</lable>
           </>
          
        }
      },
      {
        title: '',
        dataIndex: 'action',
        width: '30px',
        render: (_, value, index) => (
          <Space>
            <ButtonEdit
              disabled={!isUpdate}
              onClick={() => {
                setSelectedData(value);
                setOpenModalCertificate(true);
                form.setFieldsValue(value);
              }}
            />
            <ButtonDelete disabled={!isUpdate} onClick={() => handleConfirmDelete(value, index)} />
          </Space>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [employeeId, formattedData],
  );

  return (
    <WrapperSection
      title="4. Chứng chỉ"
      actions={
        <Button
          form="certificateForm"
          type="primary"
          onClick={() => setOpenModalCertificate(true)}
          disabled={!isUpdate}
        >
          Thêm chứng chỉ
        </Button>
      }
    >
      <Grid columns={columns} data={formattedData} pagination={false} rowSelection={null} />
      <CertificateModal
        isOpen={openModalCertificate}
        onClose={handleClose}
        staffId={employeeId}
        getDataDetail={getDataDetail}
        formInstance={form}
        onFinish={onFinish}
      />
    </WrapperSection>
  );
};

CertificateGrid.propTypes = {};

export default CertificateGrid;
