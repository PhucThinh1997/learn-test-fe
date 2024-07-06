import React, { useCallback, useState } from 'react';
import { Modal, message, Typography, Row, Form, Col, Input, Table } from 'antd';
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
import { ButtonEdit, ButtonDetail, PrimaryButton } from 'common/components/Buttons';
import { formatCurrency, formatCurrencyInput } from 'utils/format';
import ButtonDetail2 from 'common/components/Buttons/ButtonDetail2';
import {
  deleteDealers,
  deleteDealerss,
  urlEndpointTableDealers,
  urlEndpointTableDealersResult,
} from 'services/dealers/dealers.service';
import Status from 'common/components/status/Status';
import { BookOutlined } from '@ant-design/icons';
import { createContract } from 'services/contract';
import ButtonTooltip from 'common/components/Buttons/ButtonToolTip';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const DealersResult = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    isOpen: false,
  });
  const [openDetail, setOpenDetail] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');
  const [form] = Form.useForm();

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const createContractByDealers = (contractID) => {
    history.push(`/chinh-sua-hop-dong/${contractID}`);
  };

  const columns = [
    {
      title: 'Ngày ký HĐ',
      dataIndex: ['contract', 'contractDate'],
      width: '130px',
      render: (_, values) => (
        <Typography.Text>{values?.registerDate ? formatDDMMYYYY(values?.registerDate) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Ngày hoàn thành HĐ',
      dataIndex: ['contract', 'contractDateComplete'],
      width: '130px',
      render: (_, values) => (
        <Typography.Text>{values?.expireDate ? formatDDMMYYYY(values?.expireDate) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Số Hợp đồng',
      dataIndex: ['contract', 'number'],
      width: '200px',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'deviceName',
      width: '350px',
    },
    {
      title: 'Model',
      dataIndex: 'deviceModel',
      width: '100px',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      align: 'right',
      render: (_, values) => (
        <Typography.Text>{values?.price ? formatCurrency(values?.price) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Thành tiền (Chưa VAT)',
      dataIndex: 'totalPrice',
      align: 'right',
      render: (_, values) => (
        <Typography.Text>{values?.totalPrice ? formatCurrency(values?.totalPrice) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: '',
      width: '30px',
      dataIndex: 'action',
      render: (_, values) => (
        <div className="wrapper-button">
          <PrimaryButton
            onClick={() => createContractByDealers(values.contractId)}
            PrimaryButton
            icon={<BookOutlined />}
          ></PrimaryButton>
        </div>
      ),
    },
  ];

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
      {isAccessed(PER.KET_QUA_DU_AN_XEM) && (
        <div>
          <div id="dealers-page">
            <HeaderPage title="HỢP ĐỒNG THỰC HIỆN" isHideAction />
            {renderFilter()}
            <div className="main__application">
              <PageWrapper>
                <Grid urlEndpoint={urlEndpointTableDealersResult} columns={columns} summaryNumberCol={8} />
              </PageWrapper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DealersResult.propTypes = {};

export default DealersResult;
