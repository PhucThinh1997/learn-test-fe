import React, { useState } from 'react';
import { Modal, Typography, Form } from 'antd';
import { ExclamationCircleOutlined, BarsOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import { BLANK_VALUE } from 'static/Constants';
import { formatDDMMYYYY } from 'utils/formatDate';
import * as actions from 'redux/global/actions';
import Filter from 'pages/home/components/filter/filterCommon';
import { PrimaryButton } from 'common/components/Buttons';
import { formatCurrency } from 'utils/format';
import CreateAndUpdate from './CreateAndUpdate';
import { deleteDealers, urlEndpointTableDealers } from 'services/dealers/dealers.service';
import { listResult } from './enum';
import Status from 'common/components/status/Status';
import { BookOutlined } from '@ant-design/icons';
import ButtonTooltip from 'common/components/Buttons/ButtonToolTip';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const Dealers = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    isOpen: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');
  const [form] = Form.useForm();

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const createContractByDealers = (idDealers) => {
    history.push(`/tao-hop-dong?idDealers=${idDealers}`);
  };

  const columns = [
    {
      title: 'Ngày đăng ký',
      dataIndex: 'registerDate',
      render: (_, values) => (
        <Typography.Text>{values?.registerDate ? formatDDMMYYYY(values?.registerDate) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expireDate',
      render: (_, values) => (
        <Typography.Text className={values.isWarning ? 'is-warning-text' : ''}>
          {values?.expireDate ? formatDDMMYYYY(values?.expireDate) : BLANK_VALUE}
        </Typography.Text>
      ),
    },
    {
      title: 'Tên công ty đăng ký dự án',
      dataIndex: 'dealersName',
    },
    {
      title: 'Khách hàng sử dụng',
      dataIndex: 'customerName',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'deviceName',
    },
    {
      title: 'Model',
      dataIndex: 'deviceModel',
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
      title: 'Kết quả',
      dataIndex: 'status',
      render: (_, values) => <Status text={listResult[values.status].label} keys={listResult[values.status].color} />,
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_, values) => (
        <div className="wrapper-button">
          <ButtonTooltip tip="Xem chi tiết">
            <PrimaryButton
              icon={<BarsOutlined />}
              onClick={() => {
                setId(values.id);
                setIsOpen(true);
              }}
            />
          </ButtonTooltip>
          {values.isCreateContract && (
            <ButtonTooltip tip="Tạo hợp đồng">
              <PrimaryButton
                onClick={() => createContractByDealers(values.id)}
                PrimaryButton
                icon={<BookOutlined />}
              ></PrimaryButton>
            </ButtonTooltip>
          )}
        </div>
      ),
    },
  ];

  const onCreateQuote = () => {
    setId('');
    setIsOpen(true);
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => {
        deleteDealers(values).then((x) => {
          readGrid(true);
        });
      },
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
      {isAccessed(PER.DS_DANG_KY_DU_AN_XEM) && (
        <div>
          <div id="dealers-page">
            <HeaderPage
              title="DANH SÁCH CÔNG TY ĐĂNG KÝ DỰ ÁN"
              actions="default"
              onCreate={onCreateQuote}
              handleDelete={onClickDelete}
              isShowActionAdd={isAccessed(PER.DS_DANG_KY_DU_AN_THEM)}
              // isShowActionDelete={isAccessed(PER.DS_DANG_KY_DU_AN_XOA)}
            />
            {renderFilter()}
            <div className="main__application">
              <PageWrapper>
                <Grid
                  scroll={{ x: 1700 }}
                  urlEndpoint={urlEndpointTableDealers}
                  columns={columns}
                  summaryNumberCol={9}
                />
              </PageWrapper>
            </div>
            {isOpen && (
              <CreateAndUpdate
                id={id}
                isOpen={isOpen}
                reloadTable={() => readGrid(true)}
                form={form}
                onClose={() => {
                  setId('');
                  setIsOpen(false);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

Dealers.propTypes = {};

export default Dealers;
