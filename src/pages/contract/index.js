import React, { useState } from 'react';
import { Modal, message, Typography, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import { ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import { DELETE_ERROR, DELETE_SUCCESS } from 'utils/common/messageContants';
import { urlEndpointTableContract, deleteContracts } from 'services/contract';
import * as actions from 'redux/global/actions';
import { formatDDMMYYYY } from 'utils/formatDate';
import { BLANK_VALUE } from 'static/Constants';
import Filter from 'pages/home/components/filter/filterCommon';
import { formatCurrency } from 'utils/format';
import { ButtonEdit } from 'common/components/Buttons';
import './index.less';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const Contract = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    isOpen: false,
  });

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const columns = [
    {
      title: 'Số Hợp đồng',
      dataIndex: 'number',
    },
    {
      title: 'Ngày ký Hợp đồng',
      dataIndex: 'contractDate',
      minWidth: '150px',
      render: (_, values) => (
        <Typography.Text>{values?.contractDate ? formatDDMMYYYY(values?.contractDate) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Ngày hoàn thành',
      dataIndex: 'contractDateComplete',
      minWidth: '150px',
      render: (_, values) => (
        <Typography.Text className={values.isWarning ? 'is-warning-text' : ''}>
          {values?.contractDateComplete ? formatDDMMYYYY(values?.contractDateComplete) : BLANK_VALUE}
        </Typography.Text>
      ),
    },
    {
      title: 'Người quản lý hợp đồng',
      dataIndex: ['employeeManageContract', 'name'],
      minWidth: '350px',
    },
    {
      title: 'Khách hàng',
      dataIndex: ['customer', 'name'],
      minWidth: '350px',
    },
    {
      title: 'Tổng tiền (Chưa VAT)',
      dataIndex: 'total',
      width: '200px',
      align: 'right',
      render: (value) => `${value ? formatCurrency(Number(value)) : ''}`,
    },
    // {
    //   title: 'File hợp đồng',
    //   dataIndex: ['contractFile', 'fileName'],
    //   minWidth: '300px',
    //   render: (_, values) => (
    //     <NavLink to={`/tai-lieu/${values?.contractFile?.id}`}>{values?.contractFile?.fileName ?? ''}</NavLink>
    //   ),
    // },
    {
      title: '',
      dataIndex: 'action',
      render: (_, values) => (
        <NavLink to={`chinh-sua-hop-dong/${values.id}`}>
          <ButtonEdit disabled={!isAccessed(PER.HOP_DONG_SUA)} />
        </NavLink>
      ),
      width: 30,
    },
  ];

  const handleDeleteCustomer = (values) => {
    setIsLoading(true);
    deleteContracts(values)
      .then((res) => {
        if (res.isSuccess) {
          message.success(DELETE_SUCCESS);
          readGrid(true);
        } else {
          message.error(DELETE_ERROR);
        }
      })
      .catch(() => {
        message.error(DELETE_ERROR);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  const onCreateContract = () => {
    history.push('/tao-hop-dong');
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDeleteCustomer(values),
      confirmLoading: isLoading,
    });
  };

  const renderFilter = () => (
    <Filter
      isOpen={filter.isOpen}
      title={'Lọc hợp đồng'}
      handleClosed={() => setFilter({ isOpen: false })}
      onApplyFilter={(values) => {
        dispatch(actions.filters(values));
      }}
    />
  );

  return (
    <div id="contract-page">
      {isAccessed(PER.HOP_DONG_XEM) && (
        <div>
          <HeaderPage
            title="HỢP ĐỒNG"
            actions="default"
            onCreate={onCreateContract}
            isFilter
            onFilter={() => setFilter({ isOpen: true })}
            handleDelete={onClickDelete}
            isShowActionAdd={isAccessed(PER.HOP_DONG_THEM)}
            isShowActionDelete={isAccessed(PER.HOP_DONG_XOA)}
          />
          {renderFilter()}
          <div className="main__application">
            <PageWrapper>
              <Grid urlEndpoint={urlEndpointTableContract} columns={columns} summaryNumberCol={6} />
            </PageWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contract;
