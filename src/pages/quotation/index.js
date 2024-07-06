import React, { useState } from 'react';
import { Modal, message, Typography, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import { ButtonEdit } from 'common/components/Buttons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import { BLANK_VALUE } from 'static/Constants';
import { DELETE_ERROR, DELETE_SUCCESS } from 'utils/common/messageContants';
import { urlEndpointTableQuotation, deleteQuotations } from 'services/quotation/';
import { formatDDMMYYYY } from 'utils/formatDate';
import * as actions from 'redux/global/actions';
import Filter from 'pages/home/components/filter/filterCommon';
import { API_ENDPOINT } from 'config/env';
import { ButtonEdit } from 'common/components/Buttons';
import { formatCurrency } from 'utils/format';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const Quotation = () => {
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
      title: 'Số báo giá',
      dataIndex: 'number',
      width: '60px',
    },
    {
      title: 'Ngày báo giá',
      dataIndex: 'quotationDate',
      width: '150px',
      render: (_, values) => (
        <Typography.Text>{values?.quotationDate ? formatDDMMYYYY(values?.quotationDate) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Người báo giá',
      dataIndex: ['quotationInCharge', 'name'],
      width: '250px',
    },
    {
      title: 'Khách hàng',
      dataIndex: ['customer', 'name'],
      minWidth: '250px',
    },
    {
      title: 'Tổng tiền (Chưa VAT)',
      dataIndex: 'totalAmount',
      align: 'right',
      width: '200px',
      render: (value) => `${value ? formatCurrency(Number(value)) : ''}`,
    },
    {
      title: 'File báo giá',
      dataIndex: ['file', 'fileName'],
      render: (_, values) => (
        <NavLink to={`/ tai - lieu / ${values?.file?.id}`}>{values?.file?.fileName ?? ''}</NavLink>
      ),
    },
    // {
    //   title: 'File cấu hình',
    //   dataIndex: ['configurationFiles'],
    //   render: (_, values) => renderListFile(values.configurationFiles),
    // },
    {
      title: '',
      dataIndex: 'action',
      render: (_, values) => (
        <NavLink to={`chinh-sua-bao-gia/${values.id}`}>
          <ButtonEdit disabled={!isAccessed(PER.BAO_GIA_SUA)} />
        </NavLink>
      ),
      width: 30,
    },
  ];

  const renderListFile = (configurationFiles) => {
    if (!configurationFiles) return;

    return configurationFiles.map((x) => (
      <div>
        {' '}
        <a href={`${API_ENDPOINT}${x.filePathUrl.slice(1)}`}>{x.fileName}</a>{' '}
      </div>
    ));
  };

  const handleDeleteQuotation = (values) => {
    setIsLoading(true);
    deleteQuotations(values)
      .then((res) => {
        if (res.isSuccess) {
          message.success(DELETE_SUCCESS);
          readGrid(true);
        } else {
          message.error(res.message);
        }
      })
      .catch(() => {
        message.error(DELETE_ERROR);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  const onCreateQuote = () => {
    history.push('/tao-bao-gia');
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => handleDeleteQuotation(values),
      confirmLoading: isLoading,
    });
  };

  const renderFilter = () => (
    <Filter
      isOpen={filter.isOpen}
      title={'Lọc hóa đơn'}
      handleClosed={() => setFilter({ isOpen: false })}
      onApplyFilter={(values) => {
        dispatch(actions.filters(values));
      }}
    />
  );

  return (
    <>
      {isAccessed(PER.BAO_GIA_XEM) && (
        <div>
          <HeaderPage
            title="BÁO GIÁ"
            actions="default"
            onCreate={onCreateQuote}
            isFilter
            onFilter={() => setFilter({ isOpen: true })}
            handleDelete={onClickDelete}
            isShowActionAdd={isAccessed(PER.BAO_GIA_THEM)}
            isShowActionDelete={isAccessed(PER.BAO_GIA_XOA)}
          />
          {renderFilter()}
          <div className="main__application">
            <PageWrapper>
              <Grid urlEndpoint={urlEndpointTableQuotation} columns={columns} summaryNumberCol={5} />
            </PageWrapper>
          </div>
        </div>
      )}
    </>
  );
};

export default Quotation;
