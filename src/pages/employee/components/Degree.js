import React, { useEffect, useMemo, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Button } from 'antd';
import { ButtonDelete, ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import Space from 'components/Space';
import DegreeModal from './DegreeModal';
import { WrapperSection } from '../Detail';
import './DegreeGrid.less';
import { v4 as uuid } from 'uuid';
import _ from 'lodash'

const DEGREE_OPTION = [
  { value: 0, label: "Trung Cấp" },
  { value: 1, label: "Cao đẳng" },
  { value: 2, label: "Cử nhân" },
  { value: 3, label: "Thạc sĩ" },
  { value: 4, label: "Tiến sĩ" },
];

const DegreeGrid = ({ data = [], employeeId, getDataDetail, isUpdate, setDegrees }) => {
  const [openModalDegree, setOpenModalDegree] = useState(false);
  const [formattedData, setFormattedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  useEffect(() => {
    let dataSource = data.filter((x) => x.isDeleted == false)
    // const formatedData = dataSource?.length > 0 ? dataSource?.map((d) => ({ ...d })) : [];
    setFormattedData(dataSource);
  }, [data]);

  useEffect(() => {
    const dataDegree = { ...formattedData };
    setFormattedData(dataDegree);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const onFinish = (values) => {
    if (selectedData) {
      const newDegree = data.map((item) => {
        if ((!_.isUndefined(item.id) && item.id === selectedData.id) ||(item.rowId === selectedData.rowId)) {
          return {
            ...item,
            name: values.name,
            major: values.major,
            levelOfTraining: values.levelOfTraining,
            formOfTraining: values.formOfTraining,
            yearOfGraduation: values.yearOfGraduation,
            university: values.university,
            numberOfUniversity: values.numberOfUniversity,
            degreeFileId: values.degreeFileId,
            degreeFile: values.degreeFile
          };
        }
        return item;
      });
      setDegrees(newDegree);
    } else {
      const newDegree = [...data];
      newDegree.push({ ...values, rowId: uuid(), isDeleted : false });
      setDegrees(newDegree);
    }
    form.resetFields();
    setOpenModalDegree(false);
  };

  const handleClose = () => {
    setOpenModalDegree(false);
    form.resetFields();
  };

  const handleDeleteDegree = (id, index) => {
    let dataSource = _.clone({ ...formattedData });
    const newDegrees = _.map( dataSource , (item) => {
      if (item.id === id) item.isDeleted = true;
      return item
    });
    let dataSet = _.filter(dataSource, (x) => x.isDeleted == false)
    setFormattedData(dataSet)
    setDegrees(newDegrees);
  };

  const handleConfirmDelete = (value, index) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDeleteDegree(value.id, index),
    });
  };

  const columns = useMemo(
    () => [
      {
        title: 'Tên bằng cấp',
        dataIndex: 'name',
        width:'50px',
        minWidth: '50px',
        render: (_,recore) => {
          return <span> { DEGREE_OPTION.find((x) => x.value == recore.name)?.label}</span>
        }
      },
      {
        title: 'Chuyên ngành',
        dataIndex: 'major',
        minWidth: '150px',
      },
      {
        title: 'Xếp loại',
        dataIndex: 'levelOfTraining',
        width: '200px',
      },
      {
        title: 'Hình thức đào tạo',
        dataIndex: 'formOfTraining',
        width: '200px',
      },
      {
        title: 'Năm tốt nghiệp',
        dataIndex: 'yearOfGraduation',
        width: '150px',
      },
      {
        title: 'Trường đào tạo',
        dataIndex: 'university',
        width: '250px',
      },
      {
        title: 'Số hiệu',
        dataIndex: 'numberOfUniversity',
        width: '100px',
      },
      {
        title: 'Tài liệu',
        dataIndex: 'degreeFileId',
        minWidth: '250px',
        inputType: 'upload',
        render: (value, recore, index)=> { 
           return <>
            <lable>{ recore?.degreeFile?.fileName }</lable>
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
                setOpenModalDegree(true);
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
      title="3. Bằng cấp"
      actions={
        <Button form="degreeForm" type="primary" onClick={() => setOpenModalDegree(true)} disabled={!isUpdate}>
          Thêm bằng cấp
        </Button>
      }
    >
      <Grid columns={columns} data={formattedData} pagination={false} rowSelection={null} />
      <DegreeModal
        isOpen={openModalDegree}
        onClose={handleClose}
        staffId={employeeId}
        getDataDetail={getDataDetail}
        formInstance={form}
        onFinish={onFinish}
      />
    </WrapperSection>
  );
};

DegreeGrid.propTypes = {};

export default DegreeGrid;
