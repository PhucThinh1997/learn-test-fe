/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, Row, Col, Form } from 'antd';
import { formatDateYMD } from 'utils/format';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputCustom from 'components/input/inputCustom';
import "./index.less"
import SelectSearch from 'components/input/selectSearch';
import { createtech, getTechnicalById } from 'services/dealers/dealers.service';
import { MODE } from 'constants/mode.cost';
import { getToDay } from 'utils/dateUtils';
import { valRequired } from 'utils/validate/validateUtils';
import { TechnicalBusinessRequestContext } from '../context/technicalBusinessRequest';
import { formatDDMMYYYY, today, getDateFormat, DateTimeToDate } from 'utils/formatDate';
import * as enums from 'common/enum';
import { assignTaskTechnicalBusinesss, createTechnicalBusiness, getTechnicalBusinessById } from 'services/technicalBusiness/requestService';
import { getCustomerDropdown } from 'services/customer';
import { getContactPersonByCustomerId } from 'services/contact-person';
import { mapToSelectOption } from 'utils/utils';
import { getEmployeeDropDown, getEmployeesByPermissions } from 'services/employee';
import EmployeeAssign from './EmployeeAssign';
import { STATUS_TASK } from 'pages/dealers/enum';

const AssignPopup = (props) => {
  const { idRequest, isOpen, onClose, reloadTable, technicalRequirementTasks } = props;
  const [form] = Form.useForm();
  const schema = yup.object().shape({
    empMainId: valRequired(yup),
    contentAssign: valRequired(yup)
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
  const [mode, setMode] = useState(MODE.EDIT)
  const [customerOptions, setCustomerOptions] = useState([])
  const [personContactOptions, setPersonContactOptions] = useState([])
  const [employeeOptions, setEmployeeOptions] = useState([])
  const [employeeSupportOptions, setEmployeeSupportOptions] = useState([])
  const [listAssignEmp, setListAssignEmp] = useState([])
  const [test, setTest] = useState({})
  const [idReq, setIdReq] = useState(null)

  useEffect(() => {
    getTechnicalById(idRequest).then((res) => {
      setIdReq(res.data.id)
      let technical = res.data.technicalRequirementTasks.map(x => {
        return {
          ...x,
          nameEmpMain: x.employee?.name,
          empSupport: x.employeeSupporters.map(m => { return { label: m } }),
          contentAssign: x.contentWork,
          isDelete: false,
          state: x.state,
          reject: x.rejectRemarks
        }
      })
      if (technical.length > 0) {
        setListAssignEmp(technical)
      }
    })


  }, [idRequest])

  const onSubmit = (data) => {
    let request = {
      ...data,
      type: Number(data.type),
      startDate: formatDateYMD(data.startDate),
      dueDate: formatDateYMD(data.dueDate),
      nameEmpMain: employeeOptions.find(x => x.value === data.empMainId).label,
      isDelete: true,
      state: STATUS_TASK.THEM_MOI
    };

    let assignEmp = _.cloneDeep(listAssignEmp)
    assignEmp.push(request)
    setListAssignEmp(assignEmp)
    clearAll()
  }

  const clearAll = () => {
    reset()
    setValue('empMainId', '');
    setValue('empSupport', '');
    setValue('contentAssign', '');
    defaultValueInModeCreate()
  }

  const handleCancel = () => {
    onClose();
  };

  const saveOnServer = () => {
    let listAssign = listAssignEmp.map(x => {
      if (x.isDelete) {
        return {
          employeeId: x.empMainId,
          employeeSupporterIds: x.empSupport.map(x => x.value).toString(),
          dueDate: x.dueDate,
          startDate: x.startDate,
          contentWork: x.contentAssign
        }
      } else {
        return {
          id: x.id,
          technicalRequirementId: x.technicalRequirementId,
          employeeId: x.empMainId,
          employeeSupporterIds: x.empSupport.map(x => x.value).toString(),
          state: x.state,
          rejectRemarks: x.rejectRemarks,
          note: x.note,
          role: x.role,
          plannedStartDate: DateTimeToDate(x.plannedStartDate),
          startDate: DateTimeToDate(x.startDate),
          dueDate: DateTimeToDate(x.dueDate),
          closedDate: DateTimeToDate(x.closedDate),
          contentWork: x.contentAssign,
          completedNote: x.completedNote,
          completedDate: DateTimeToDate(x.completedDate),
          technicalReportFileId: x.technicalReportFileId
        }
      }

    })
    // call API save all
    let request = {
      technicalRequirementId: idRequest,
      inputs: listAssign
    }
    // if mode edit then add id edit
    if (listAssignEmp.filter(x => !x.isDelete).length > 0) {
      request.id = idReq
    }

    console.log(request)
    assignTaskTechnicalBusinesss(request).then((res) => {
      onClose();
      reloadTable()
    })
  }

  const onChangeCustomer = (customerId) => {
    getContactPersonById(customerId)
  };

  const getContactPersonById = (customerId) => {
    getContactPersonByCustomerId(customerId).then((res) => {
      const options = mapToSelectOption(res.data)
      setPersonContactOptions(options);
    });
  }

  useEffect(() => {
    getEmployeeDDL()
  }, []);

  const getEmployeeDDL = () => {
    // lay tat ca nhan vien ky thuat bao gom ca truong phong
    getEmployeesByPermissions({ permissionCodes: enums.PER.QUAN_LY_CONG_VIEC_XEM }).then((res) => {
      const empOption = mapToSelectOption(res.data)
      setEmployeeOptions(empOption);
    });
  }

  useEffect(() => {

    defaultValueInModeCreate()
  }, [idRequest])

  const defaultValueInModeCreate = () => {
    setValue('startDate', getToDay());
    setValue('dueDate', getToDay());
  }

  const getTitle = () => {
    let title = "Chi tiết yêu cầu Khách hàng";

    if (mode === MODE.CREATE) {
      title = "Tạo yêu cầu Khách hàng "
    }
    if (mode === MODE.EDIT) {
      title = "Phân công"
    }

    return title;
  }

  useEffect(() => {
    if (employeeSupportOptions.length === 0) {
      let empMainId = watch('empMainId')
      let cloneEmployeeOptions = _.cloneDeep(employeeOptions);
      if (empMainId) {
        setEmployeeSupportOptions(cloneEmployeeOptions.filter(x => x.value != empMainId))
      }

    }
  }, [employeeSupportOptions]);


  return (
    <>
      <Modal
        title={getTitle()}
        open={isOpen}
        form={form}
        width={1100}
        onCancel={handleCancel}
        className="modal-tech"
        footer={null}
      >
        <form className="form-tech" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={24} className="btn-edit">
              <Button key="submit" type="primary" htmlType="submit" >
                Thêm
              </Button>
              {/* <Button onClick={() => { clearAll() }} >
                clearAll
              </Button> */}
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={12}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Người chịu trách nhiệm chính"
                control={control}
                name="empMainId"

                options={employeeOptions}
                isRequired
                errors={errors}
                onChange={(id) => {
                  setEmployeeSupportOptions([])

                }}
              />
            </Col>
            <Col className='col-input' span={12}>
              <SelectSearch
                isMulti
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Người hổ trợ"
                defaultValue={test}
                control={control}
                name="empSupport"
                options={employeeSupportOptions}
                errors={errors}
                isDisabled={!(employeeSupportOptions.length > 0)}
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngày thực hiện"
                control={control}
                type="date"
                name="startDate"
              />
            </Col>
            <Col className='col-input' span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngày kết thúc"
                control={control}
                type="date"
                name="dueDate"
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={24}>
              <InputCustom
                TitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Nội dung công việc"
                control={control}
                type="textarea"
                rows={3}
                name="contentAssign"
                isRequired
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={24}>
              <EmployeeAssign
                originData={listAssignEmp}
                rowKey="id"
                handleChangeData={(newData) => { setListAssignEmp(newData) }}
              />
            </Col>
          </Row>

          <div className="my-modal-footer">
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>
            {mode !== MODE.DETAIL && (
              <Button disabled={listAssignEmp.filter(x => x.isDelete).length <= 0} type="primary" onClick={() => saveOnServer()}>
                Lưu
              </Button>
            )}
          </div>
        </form>
      </Modal >
    </>
  );
};

AssignPopup.propTypes = {};
export default AssignPopup;
