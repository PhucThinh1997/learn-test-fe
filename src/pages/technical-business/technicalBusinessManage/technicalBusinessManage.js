import React, { useContext, useEffect, useState } from 'react';

import { BLANK_VALUE, SEARCH_CRITERIA } from 'static/Constants';
import { PrimaryButton, DangerButton } from 'common/components/Buttons';
import { BarsOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Grid from 'components/Grid';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import { useDispatch } from 'react-redux';

import { TechnicalBusinessManageContext } from '../context/technicalBusinessManage';
import { urlEndpointTable } from 'services/technicalBusiness/managerService';
import { formatDDMMYYYY, today } from 'utils/formatDate';
import * as enums from 'common/enum';
import {
  TechnicalBusinessRequestComponon,
  TechnicalBusinessRequestPopup,
} from '../technicalBusinessRequest/technicalBusinessRequestPopup';
import TechnicalBusinessManagePopup from './TechnicalBusinessManagePopup';
import { Button, Form, Input, Modal } from 'antd';
import ButtonTooltip from 'common/components/Buttons/ButtonToolTip';
import './index.less'
import AssignPopupDetail from '../technicalBusinessRequest/assignPopupDetail';
import ResultTask from './resultTask';
import Status from 'common/components/status/Status';
import { STATUS_TASK, listResultTask } from 'pages/dealers/enum';
import * as actions from 'redux/global/actions';
import { isAccessed } from 'utils/utils';

const TechnicalBusinessManage = () => {
  const {
    innitData,
    updatePersonContactList,
    setIsUpdate,
    setIsOpen,
    setIsCreate,
    convertDateValue,
    approveTask,
    isLoading,
  } = useContext(TechnicalBusinessManageContext);

  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  const [isOpenAssign, setIsOpenAssign] = useState(false);
  const [taskDetail, setTaskDetail] = useState(null);
  const [isOpenResultPopup, setIsOpenResultPopup] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Tên nhân viên',
      dataIndex: 'employee',
      render: (value, recore) => {
        return (
          <>
            <label>{value?.name}</label>
          </>
        );
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'contentWork',
      width: '300px',
      render: (_, values) => <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{values.contentWork}</div>,
    },
    {
      title: 'Ngày thực hiện',
      dataIndex: 'startDate',
      render: (value) => {
        return <label>{formatDDMMYYYY(value)}</label>;
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'dueDate',
      render: (value) => {
        return <label>{formatDDMMYYYY(value)}</label>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      width: '150px',
      render: (_, values) => <Status text={listResultTask[values.state].label} keys={listResultTask[values.state].color} />,
    },
    {
      title: 'Nhận / Từ chối',
      dataIndex: 'requestTask',
      align: 'center',
      render: (_, values) => (
        <div className="wrapper-button" style={{ textAlign: 'center' }}>
          <ButtonTooltip tip="Chấp nhận">
            <PrimaryButton disabled={values.state !== 0} icon={<CheckOutlined />} onClick={() => onAccept(values)}></PrimaryButton>
          </ButtonTooltip>
          <ButtonTooltip tip="Từ chối">
            <DangerButton disabled={values.state !== 0} icon={<CloseOutlined />} onClick={() => onConfirmRefused(values)}></DangerButton>
          </ButtonTooltip>
        </div >
      ),
      width: 80,
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_, values) => (
        <div className="wrapper-button">
          <ButtonTooltip tip="Xem chi tiết">
            <PrimaryButton icon={<BarsOutlined />} onClick={() => onClickDetail(values)}></PrimaryButton>
          </ButtonTooltip>
          {STATUS_TASK.DANG_THUC_HIEN === values.state && (
            <PrimaryButton onClick={() => onShowResult(values)}>Kết quả</PrimaryButton>
          )}

        </div>

      ),
      width: 120,
    },
  ];

  const readGrid = (refresh) => {
    dispatch(actions.refreshGrid(refresh));
  };

  const onAccept = (data) => {
    const payload = {
      id: data.id,
      assignmentId: data.employeeId,
      state: enums.TechnicalRequirementAssignmentState.Active, // tiếp nhận
    };
    approveTask(payload);
  };

  const onReject = (data) => {
    const payload = {
      id: data.id,
      assignmentId: data.assignmentId,
      state: enums.TechnicalRequirementAssignmentState.Refused, // từ chối tiếp nhận
      rejectRemarks: data.rejectRemarks,
    };
    approveTask(payload, (data) => {
      setModal2Open(false)
    });
  };

  const onClickDetail = (values) => {
    setTaskDetail(values)
    setIsOpenAssign(true)
  };

  const onConfirmRefused = (data) => {
    form.resetFields()
    form.setFieldsValue({
      id: data.id,
      assignmentId: data.employeeId,
    });
    setModal2Open(true);
  };

  const onShowResult = (value) => {
    setTaskId(value.id)
    setIsOpenResultPopup(true);
  };

  return (
    <>

      {isAccessed(enums.PER.QUAN_LY_CONG_VIEC_XEM) && (
        <div>
          <div id="task-page">
            <HeaderPage
              title=" PHÂN LỊCH CÔNG VIỆC"
              actions="default" isHideAction
            />
            <div className="main__application">
              <PageWrapper>
                <Grid columns={columns} urlEndpoint={`${urlEndpointTable}`} />
              </PageWrapper>
            </div>
            <TechnicalBusinessManagePopup />
            {isOpenResultPopup && (
              <ResultTask
                id={taskId}
                isOpen={isOpenResultPopup}
                reloadTable={() => readGrid(true)}
                onClose={() => {
                  setIsOpenResultPopup(false);
                }}
              />
            )}

            {isOpenAssign && (
              <AssignPopupDetail
                taskDetail={taskDetail}
                isOpen={isOpenAssign}
                form={form}
                onClose={() => {
                  setIsOpenAssign(false);
                }}
              />
            )}
            <Modal
              title="Lý do từ chối"
              centered
              open={modal2Open}
              onOk={(value) => onReject(value)}
              onCancel={() => setModal2Open(false)}
              footer={[
                <Button form="form-reject" key="back" onClick={() => setModal2Open(false)}>
                  Hủy
                </Button>,
                <Button form="form-reject" key="submit" type="primary" htmlType="submit">
                  Từ chối
                </Button>,
              ]}
            >
              <Form form={form} id="form-reject" onFinish={(data) => onReject(data)}>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="assignmentId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="rejectRemarks">
                  <Input.TextArea required rows={3} />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      )}
      {/* <KetQua /> */}
    </>
  );
};

TechnicalBusinessManage.propTypes = {};

export default TechnicalBusinessManage;
