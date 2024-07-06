import React, { useContext, useEffect, useState } from 'react';

import { BLANK_VALUE, SEARCH_CRITERIA } from 'static/Constants';
import { BarsOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { PrimaryButton } from 'common/components/Buttons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import { useDispatch } from 'react-redux';
import { PhanCong } from './technicalBusinessRequestPopup';
import { deleteTechnicalBusinesss, urlEndpointTableTechnicalBusiness } from 'services/technicalBusiness/requestService';
import { formatDDMMYYYY, today } from 'utils/formatDate';
import * as enums from 'common/enum';
import { Form, Modal } from 'antd';
import CreateAndUpdate from './createAndUpdate';
import * as actions from 'redux/global/actions';
import AssignPopup from './assignPopup';
import ButtonTooltip from 'common/components/Buttons/ButtonToolTip';
import { isAccessed } from 'utils/utils';
const TechnicalBusinessRequest = () => {

  const [id, setId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAssign, setIsOpenAssign] = useState(false);
  const [idRequest, setIdRequest] = useState('');
  const [technicalRequirementTasks, setTechnicalRequirementTasks] = useState([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onClickDetail = (values) => {
    setId(values.id);
    setIsOpen(true);
  };

  const onClickPhanCong = (value) => {
    setIsOpenAssign(true)
    setIdRequest(value.id)
    setTechnicalRequirementTasks(value.technicalRequirementTasks)
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu đã chọn?',
      okText: 'Xác Nhận',
      cancelText: 'Hủy',
      onOk: () => {
        {
          deleteTechnicalBusinesss(values).then((x) => {
            readGrid(true);
          });
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerId',
      render: (value, recore) => {
        return (
          <>
            <label>{recore.customer.name}</label>
          </>
        );
      },
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'requirementDate',
      render: (value) => {
        return <label>{formatDDMMYYYY(value)}</label>;
      },
    },
    {
      title: 'Ngày thực hiện',
      dataIndex: 'plannedStartDate',
      render: (value) => {
        return <label>{formatDDMMYYYY(value)}</label>;
      },
    },
    // {
    //   title: 'Nội dung',
    //   dataIndex: 'contentRequirement',
    // },
    {
      title: 'Người nhận yêu cầu',
      dataIndex: ['requestRecipient', 'name'],
    },
    // {
    //   title: 'Chức vụ',
    //   dataIndex: 'code',
    // },
    // {
    //   title: 'Điện thoại',
    //   dataIndex: 'phone',
    // },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      render: (value) => {
        return <label>{value != null ? enums.TechnicalRequirementStateOptions[value].label : BLANK_VALUE}</label>;
      },
    },
    // {
    //   title: 'Người nhận yêu cầu',
    //   dataIndex: 'technicalRequirementAssignments',
    //   render: (values) => {
    //     return (
    //       <label>
    //         {/* {values != [] ? values.find((x) => x.role == enums.TechnicalRequirementAssignmentRole.Mainer)?.employee?.name : BLANK_VALUE} */}
    //       </label>
    //     );
    //   },
    // },

    {
      title: '',
      dataIndex: 'action',
      render: (values, record) => (
        <div className="wrapper-button" style={{ textAlign: 'center', width: 'auto' }}>
          <ButtonTooltip tip="Xem chi tiết">
            <PrimaryButton icon={<BarsOutlined />} onClick={() => onClickDetail(record)}></PrimaryButton>
          </ButtonTooltip>
          {record.state === 0 && isAccessed(enums.PER.YEU_CAU_KI_THUAT_NHAN_YEU_CAU) && (
            <PrimaryButton onClick={() => onClickPhanCong(record)}>Phân công</PrimaryButton>
          )}
        </div>

      ),
      width: 35,
    },
  ];

  const onCreate = () => {
    setId('');
    setIsOpen(true);
  };

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };
  return (
    <>
      {isAccessed(enums.PER.YEU_CAU_KI_THUAT_XEM) && (
        <div>
          <div id="tech-page">
            <HeaderPage
              title="YÊU CẦU KĨ THUẬT"
              actions="default"
              onCreate={() => onCreate()}
              handleDelete={onClickDelete}
              isShowActionAdd={isAccessed(enums.PER.YEU_CAU_KI_THUAT_THEM)}
            />
            <div className="main__application">
              <PageWrapper>
                <Grid columns={columns} urlEndpoint={`${urlEndpointTableTechnicalBusiness}`} />
              </PageWrapper>
            </div>
            {isOpenAssign && (
              <AssignPopup
                idRequest={idRequest}
                isOpen={isOpenAssign}
                technicalRequirementTasks={technicalRequirementTasks}
                reloadTable={() => readGrid(true)}
                form={form}
                onClose={() => {
                  setIdRequest('');
                  setIsOpenAssign(false);
                }}
              />
            )}

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

TechnicalBusinessRequest.propTypes = {};

export default TechnicalBusinessRequest;
