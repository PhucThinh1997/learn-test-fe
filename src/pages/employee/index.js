import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined, BarsOutlined } from '@ant-design/icons';
import { Form, message, Modal, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton } from 'common/components/Buttons';
import CreateAndUpdate from './CreateAndUpdate';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';

import * as actions from 'redux/global/actions';
import { deleteEmployees } from 'services/employee/index';
import { urlEndpointTableEmployee } from 'services/employee/index';
import { DELETE_ERROR, DELETE_SUCCESS } from 'utils/common/messageContants';
import { formatMMDDYYYY } from 'utils/formatDate';
import { BLANK_VALUE } from 'static/Constants';
import ButtonTooltip from 'common/components/Buttons/ButtonToolTip';
import { PER } from 'common/enum';
import { isAccessed } from 'utils/utils';

const Employee = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsopen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã nhân sự',
      dataIndex: 'code',
      width: 150,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',

      flex: 1,
      minWidth: 200,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (_, values) => <Typography.Text>{values?.gender || BLANK_VALUE}</Typography.Text>,
      width: 150,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      render: (_, values) => (
        <Typography.Text>{values?.dateOfBirth ? formatMMDDYYYY(values?.dateOfBirth) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',

      flex: 1,
      minWidth: 200,
    },
    {
      title: 'Phòng/Ban',
      dataIndex: 'department',

      flex: 1,
      minWidth: 200,
      render: (_, values) => <Typography.Text>{values?.department?.name}</Typography.Text>,
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_, values) => (
        <ButtonTooltip tip="Xem chi tiết">
          <NavLink to={`/quan-ly-nhan-vien/${values.id}`}>
            <PrimaryButton icon={<BarsOutlined />} onClick={() => onClickDetail(values)} />
          </NavLink>
        </ButtonTooltip>
      ),
      width: 30,
    },
  ];

  const onClickDetail = (values) => {
    setOpenDetail(!openDetail);
    setEmployeeId(values.id);
  };

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };
  const handleDelete = (values) => {
    deleteEmployees(values).then((res) => {
      if (res.isSuccess) {
        message.success(DELETE_SUCCESS);
        readGrid(true);
      } else {
        message.success(DELETE_ERROR);
      }
    });
  };

  const onClickOpenModal = (record = {}) => {
    setEmployeeId(record.id);
    form.setFieldsValue(record);
    setIsopen(true);
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDelete(values),
    });
  };

  const onOpenModel = () => {
    onClickOpenModal({});
  };

  return (
    <>
      {isAccessed(PER.NHAN_VIEN_XEM) && (
        <div>
          <HeaderPage
            title="QUẢN LÝ NHÂN VIÊN"
            actions="default"
            onCreate={onOpenModel}
            handleDelete={onClickDelete}
            isShowActionAdd={isAccessed(PER.NHAN_VIEN_THEM)}
            isShowActionDelete={isAccessed(PER.NHAN_VIEN_XOA)}
          />
          <div className="main__application">
            <PageWrapper>
              <Grid columns={columns} urlEndpoint={`${urlEndpointTableEmployee}`} />
            </PageWrapper>
          </div>
          <CreateAndUpdate
            isOpen={isOpen}
            ID={employeeId}
            reloadTable={() => readGrid(true)}
            form={form}
            onClose={() => setIsopen(false)}
            title={'Thêm mới nhân viên'}
          />
        </div>
      )}
    </>
  );
};

Employee.propTypes = {};

export default Employee;
