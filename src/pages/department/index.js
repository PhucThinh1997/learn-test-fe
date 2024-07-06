import { Form, message, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DELETE_ERROR, DELETE_SUCCESS } from 'utils/common/messageContants';
import { deleteDepartments } from 'services/department/index';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import Grid from 'components/Grid';
import { urlEndpointTableDepartment, dropdownDepartments } from 'services/department/index';
import CreateAndUpdate from './CreateAndUpdate';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/global/actions';
import { ButtonEdit } from 'common/components/Buttons';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const Department = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsopen] = useState(false);
  const [code, setCode] = useState('');
  const [dropdownDepartment, setDropDownDepartment] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã Khoa/Phòng/Ban',
      dataIndex: 'code',
      minWidth: 200,
    },
    {
      title: 'Tên Khoa/Phòng/Ban',
      dataIndex: 'name',
      minWidth: 300,
    },
    {
      title: 'Chức năng nhiệm vụ',
      dataIndex: 'mandates',
      minWidth: 300,
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      minWidth: 300,
    },
    // {
    //   title: 'Thuộc Khoa/Phòng/Ban',
    //   dataIndex: ['parent', 'name'],
    // },
    {
      title: 'Số lượng nhân viên',
      dataIndex: 'numberEmployees',
    },
    {
      title: '',
      dataIndex: 'action',
      width: 30,
      render: (_, values) => <ButtonEdit disabled={!isAccessed(PER.KHOA_PHONG_BAN_SUA)} onClick={() => onClickUpdate(values)} />,
    },
  ];

  useEffect(() => {
    getDepartments();
  }, [isOpen]);

  const getDepartments = async () => {
    const response = await dropdownDepartments();
    setDropDownDepartment(response?.data || []);
  };

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const handleDelete = (values) => {
    deleteDepartments(values)
      .then((res) => {
        if (res.isSuccess) {
          message.success(DELETE_SUCCESS);
          readGrid(true);
        } else {
          message.error(DELETE_ERROR);
        }
      })
      .catch(() => {
        message.error('Xóa thất bại! Vui lòng thử lại');
      });
  };

  const onClickUpdate = (record) => {
    form.setFieldsValue(record);
    setIsopen(true);
  };

  const onClickDelete = (values) => {
    if (!values.length) return;

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
    form.resetFields();
    setIsopen(true);
  };

  return (
    <>
      {isAccessed(PER.KHOA_PHONG_BAN_XEM) && (
        <div>
          <HeaderPage
            title="KHOA/PHÒNG/BAN"
            actions="default"
            onCreate={onOpenModel}
            handleDelete={onClickDelete}
            isShowActionAdd={isAccessed(PER.KHOA_PHONG_BAN_THEM)}
            isShowActionDelete={isAccessed(PER.KHOA_PHONG_BAN_XOA)}
          />
          <div className="main__application">
            <PageWrapper>
              <Grid columns={columns} urlEndpoint={urlEndpointTableDepartment} />
            </PageWrapper>
          </div>
          <CreateAndUpdate
            isOpen={isOpen}
            ID={code}
            form={form}
            reload={() => readGrid(true)}
            onClose={() => setIsopen(false)}
            setMaPhongBan={setCode}
            dropdownDepartment={dropdownDepartment}
            title={code ? `Chỉnh sửa khoa phòng ban` : 'Thêm mới khoa phòng ban'}
          />
        </div>
      )}
    </>

  );
};

Department.propTypes = {};

export default Department;
