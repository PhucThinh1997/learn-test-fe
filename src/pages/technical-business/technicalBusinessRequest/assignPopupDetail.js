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
import { formatDDMMYYYY, today, getDateFormat } from 'utils/formatDate';
import * as enums from 'common/enum';
import { assignTaskTechnicalBusinesss, createTechnicalBusiness, getTechnicalBusinessById } from 'services/technicalBusiness/requestService';
import { getCustomerDropdown } from 'services/customer';
import { getContactPersonByCustomerId } from 'services/contact-person';
import { mapToSelectOption } from 'utils/utils';
import { getEmployeeDropDown } from 'services/employee';
import EmployeeAssign from './EmployeeAssign';

const AssignPopupDetail = (props) => {
  const { taskDetail, isOpen, onClose, reloadTable } = props;
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
  const [mode, setMode] = useState(MODE.DETAIL)
  const [customerOptions, setCustomerOptions] = useState([])
  const [personContactOptions, setPersonContactOptions] = useState([])
  const [employeeOptions, setEmployeeOptions] = useState([])
  const [employeeSupportOptions, setEmployeeSupportOptions] = useState([])
  const [listAssignEmp, setListAssignEmp] = useState([])
  const [test, setTest] = useState({})

  const onSubmit = (data) => {

  }


  const handleCancel = () => {
    onClose();
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
    getEmployeeDropDown().then((res) => {
      const empOption = mapToSelectOption(res.data)
      setEmployeeOptions(empOption);
    });
  }

  useEffect(() => {
    defaultValueInModeDetail()
  }, [taskDetail])

  const defaultValueInModeDetail = () => {
    setValue('startDate', taskDetail.startDate);
    setValue('dueDate', taskDetail.dueDate);
    setValue('empMainId', taskDetail.employeeId);
    setValue('contentAssign', taskDetail.contentWork);
  }

  const getTitle = () => {
    return "Chi tiết công việc";
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
        width={600}
        onCancel={handleCancel}
        className="modal-tech"
        footer={null}
      >
        <form className="form-tech" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className='col-input' span={24}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Trách nhiệm chính"
                control={control}
                name="empMainId"
                options={employeeOptions}
                isRequired
                errors={errors}
              />
            </Col>
            <Col className='col-input' span={24}>
              <div style={{ paddingBottom: '20px' }}>
                <span className="ant-input-group ant-input-group-compact">
                  <div style={{ width: '150px' }}>
                    <span className="ant-typography">Người hổ trợ :</span>
                  </div>
                  <div style={{ width: 'width: calc(100% - 150px)' }}>
                    <span className="ant-typography">
                      <strong>{props.taskDetail?.employeeSupporters.toString()}</strong>
                    </span>
                  </div>
                </span>
              </div>
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

          <div className="my-modal-footer">
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>
          </div>
        </form>
      </Modal >
    </>
  );
};

AssignPopupDetail.propTypes = {};
export default AssignPopupDetail;
