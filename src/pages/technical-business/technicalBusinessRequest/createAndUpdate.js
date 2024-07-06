/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, Row, Col } from 'antd';
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
import { createTechnicalBusiness, getReceiverDropdown, getTechnicalBusinessById } from 'services/technicalBusiness/requestService';
import { getCustomerDropdown } from 'services/customer';
import { getContactPersonByCustomerId } from 'services/contact-person';
import { mapToSelectOption } from 'utils/utils';
import EmployeeAssign from './EmployeeAssign';
import { getEmployeeDropDown, getEmployeesByPermissions } from 'services/employee';

const CreateAndUpdate = (props) => {
  const { id, isOpen, onClose, form, reloadTable } = props;
  const schema = yup.object().shape({
    type: valRequired(yup),
    customerId: valRequired(yup),
    contactPersonId: valRequired(yup),
    requirementDate: valRequired(yup),
    plannedStartDate: valRequired(yup),
    contentRequirement: valRequired(yup),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
  const [mode, setMode] = useState(id ? MODE.DETAIL : MODE.CREATE)
  const [customerOptions, setCustomerOptions] = useState([])
  const [personContactOptions, setPersonContactOptions] = useState([])
  const [technicalRequirementTasks, setTechnicalRequirementTasks] = useState([])
  const [empOptions, setEmpOptions] = useState([])
  const [infoCustomers, setInfoCustomers] = useState([])

  const onSubmit = (data) => {
    let request = {
      ...data,
      type: Number(data.type),
      plannedStartDate: formatDateYMD(data.plannedStartDate),
      requirementDate: formatDateYMD(data.requirementDate)
    };
    // if mode edit then add id edit
    if (id) {
      request.id = id
    }
    createTechnical(request)
  }

  const createTechnical = (request) => {
    createTechnicalBusiness(request).then((res) => {
      if (res.isSuccess) {
        onClose();
        reloadTable()
      }
      return;
    })
  };

  const handleCancel = () => {
    onClose();
  };

  const onLoad = () => {

    getTechnicalById(id).then((res) => {
      Object.keys(res.data).forEach(key => {
        setValue(key, res.data[key])
      })
      getContactPersonById(res.data.customerId)
      let technical = res.data.technicalRequirementTasks.map(x => {
        return {
          nameEmpMain: x.employee?.name,
          empSupport: x.employeeSupporters.map(m => { return { label: m } }),
          contentAssign: x.contentWork,
          state: x.state
        }
      })
      setTechnicalRequirementTasks(technical)

    })

  }

  const onChangeCustomerPerson = (id) => {
    let cus = infoCustomers.find(x => x.id === id)
    setValue('customerPhone', cus.phone)
    setValue('contactPersonPosition', cus.position)
    // setValue('position', cus.position)
  }

  const onChangeCustomer = (customerId) => {
    getContactPersonById(customerId)
  };

  const getContactPersonById = (customerId) => {

    getContactPersonByCustomerId(customerId).then((res) => {
      setInfoCustomers(res.data)
      const options = mapToSelectOption(res.data)
      setPersonContactOptions(options);
    });
  }

  const getEmpOptions = () => {

    // Lay all truong phong ky thuat
    getEmployeesByPermissions({ permissionCodes: enums.PER.YEU_CAU_KI_THUAT_NHAN_YEU_CAU }).then((res) => {
      const options = mapToSelectOption(res.data)
      setEmpOptions(options);
    });

  }

  useEffect(() => {
    getCustomerDDL()
    getEmpOptions()
  }, []);

  const getCustomerDDL = () => {
    getCustomerDropdown().then((res) => {
      const option = mapToSelectOption(res.data)
      setCustomerOptions(option);
    });
  }

  useEffect(() => {
    if (id && (mode === MODE.EDIT || mode === MODE.DETAIL)) {
      onLoad()
      setMode(MODE.DETAIL)
    } else {
      defaultValueInModeCreate()
    }
  }, [id])

  const defaultValueInModeCreate = () => {
    setValue('plannedStartDate', getToDay());
    setValue('requirementDate', getToDay());
  }

  const getTitle = () => {
    let title = "Chi tiết yêu cầu Khách hàng";

    if (mode === MODE.CREATE) {
      title = "Tạo yêu cầu Khách hàng "
    }
    if (mode === MODE.EDIT) {
      title = "Chỉnh sửa yêu cầu Khách hàng"
    }

    return title;
  }


  return (
    <>
      <Modal
        title={getTitle()}
        open={isOpen}
        form={form}
        width={900}
        onCancel={handleCancel}
        className="modal-tech"
        footer={null}
      >
        <form className="form-tech" onSubmit={handleSubmit(onSubmit)}>
          {mode !== MODE.CREATE && (
            <Row>
              <Col span={24} className="btn-edit">
                <Button type="primary" onClick={() => setMode(mode === MODE.EDIT ? MODE.DETAIL : MODE.EDIT)} >
                  {mode === MODE.EDIT ? 'Chi tiết' : 'Chỉnh sửa'}
                </Button>
              </Col>
            </Row>
          )}
          <Row>
            <Col className='col-input' span={12}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Tên Khách hàng"
                control={control}
                name="customerId"
                options={customerOptions}
                onChange={onChangeCustomer}
                isRequired
                errors={errors}
              />
            </Col>
            <Col className='col-input' span={12}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Người liên hệ"
                control={control}
                // name="requirementPersonId"
                name="contactPersonId"
                options={personContactOptions}
                onChange={onChangeCustomerPerson}
                isRequired
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngày yêu cầu"
                control={control}
                type="date"
                name="requirementDate"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className='col-input' span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Chức vụ"
                control={control}
                type="text"
                name="contactPersonPosition"
                errors={errors}
              />
            </Col>
            <Col className='col-input' span={24}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Địa chỉ"
                control={control}
                type="text"
                name="customerAddress"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={12}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Người nhận yêu cầu"
                control={control}
                name="requestRecipientId"
                options={empOptions}
                isRequired
                errors={errors}
              />
            </Col>
            <Col className='col-input' span={12}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Loại"
                control={control}
                name="type"
                isRequired
                options={enums.listResultType}
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-input' span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Chọn ngày"
                control={control}
                type="date"
                name="plannedStartDate"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className='col-input' span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Điện thoại"
                control={control}
                type="text"
                name="customerPhone"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className='col-input' span={24}>
              <InputCustom
                TitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Nội dung yêu cầu"
                control={control}
                type="textarea"
                rows={3}
                name="contentRequirement"
                isRequired
                errors={errors}
              />
            </Col>
            {mode === MODE.DETAIL && (
              <Col className='col-input' span={24}>
                <EmployeeAssign
                  originData={technicalRequirementTasks}
                  rowKey="id"
                  hideButton
                />
              </Col>
            )}
          </Row>

          <div className="my-modal-footer">
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>
            {mode !== MODE.DETAIL && (
              <Button key="submit" type="primary" htmlType="submit">
                Lưu
              </Button>
            )}
          </div>
        </form>
      </Modal >
    </>
  );
};

CreateAndUpdate.propTypes = {};
export default CreateAndUpdate;
