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
import CreateAndUpdate from './CreateAndUpdate';
import { deleteInvoice, urlEndpointTableInvoice } from 'services/invoice';
import ButtonTooltip from 'common/components/Buttons/ButtonToolTip';
import { formatCurrency } from 'utils/format';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const Invoice = () => {
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

  const columns = [
    {
      title: 'Số hóa đơn',
      dataIndex: 'number',
      width: '150px',
    },
    {
      title: 'Ngày phát hành',
      dataIndex: 'releaseDate',
      width: '120px',
      render: (_, values) => (
        <Typography.Text>{values?.releaseDate ? formatDDMMYYYY(values?.releaseDate) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Khách hàng',
      dataIndex: ['customer', 'name'],
      width: '350px',
    },
    {
      title: 'Người bán hàng',
      dataIndex: ['saler', 'name'],
    },
    {
      title: 'Số tiền (Chưa VAT)',
      dataIndex: 'amount',
      width: '150px',
      align: 'right',
      render: (_, values) => (
        <Typography.Text>{values?.amount ? formatCurrency(values?.amount) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Thuế VAT',
      dataIndex: 'vat',
      width: '150px',
      align: 'right',
      render: (_, values) => (
        <Typography.Text>{values?.vat ? formatCurrency(values?.vat) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalAmount',
      width: '150px',
      align: 'right',
      render: (_, values) => (
        <Typography.Text>{values?.totalAmount ? formatCurrency(values?.totalAmount) : BLANK_VALUE}</Typography.Text>
      ),
    },
    {
      title: '',
      width: '30px',
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
        deleteInvoice(values).then((x) => {
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
      {isAccessed(PER.HOA_DON_XEM) && (
        <div>
          <div id="invoice-page">
            <HeaderPage
              title="HÓA ĐƠN BÁN RA"
              actions="default"
              onCreate={onCreateQuote}
              handleDelete={onClickDelete}
              isShowActionAdd={isAccessed(PER.HOA_DON_THEM)}
              isShowActionDelete={isAccessed(PER.HOA_DON_XOA)}
            />
            {renderFilter()}
            <div className="main__application">
              <PageWrapper>
                <Grid urlEndpoint={urlEndpointTableInvoice} columns={columns} summaryNumberCol={7} />
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

Invoice.propTypes = {};

export default Invoice;
