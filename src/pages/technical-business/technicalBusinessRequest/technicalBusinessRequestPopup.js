/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { DatePicker, Form, Input, Typography, Button, Modal, Select, message, Row, Col } from 'antd';
import * as api from 'services/technicalBusiness/requestService';
import * as enums from 'common/enum';
import { SAVE_ERROR, SAVE_SUCCESS } from 'utils/common/messageContants';
import { useContext } from 'react';
import { TechnicalBusinessRequestContext } from '../context/technicalBusinessRequest';
import { formatDDMMYYYY, today, getDateFormat } from 'utils/formatDate';
import 'pages/employee/components/staffInfo.less';

const { TextArea } = Input;
const { Text } = Typography;

export const LableCustom = (props) => {
  let { value, type } = props;
  if (Object.prototype.toString.call(value) === '[object Date]' || type == 'date') {
    value = formatDDMMYYYY(value);
  }
  return <Text strong>{value}</Text>;
};

export const PhanCong = (props) => {
  const { employeeOptions, isPhanCong, setIsPhanCong, handlePhanCong, formPhanCong, supportPersonIdsOrigin } =
    useContext(TechnicalBusinessRequestContext);
  const [optionsMain, setOptionsMain] = useState(employeeOptions);
  const [optionsSupport, setOptionsSupport] = useState(employeeOptions);
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 20 },
  };
  const [form] = Form.useForm(formPhanCong);

  useEffect(() => {
    setOptionsMain(employeeOptions);
    setOptionsSupport(employeeOptions);
  }, [employeeOptions]);

  if (!isPhanCong) return null;

  const onFinish = (values) => {
    let supportPersonDeleteIds = [];
    if (supportPersonIdsOrigin)
      supportPersonDeleteIds = supportPersonIdsOrigin.filter((x) => !values.supportPersonIds.includes(x));
    const payload = {
      ...values,
      supportPersonDeleteIds: supportPersonDeleteIds,
    };
    handlePhanCong(payload);
    setIsPhanCong(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsPhanCong(false);
  };

  const onChangePersonMain = (person) => {
    if (person) {
      const newList = employeeOptions.filter((x) => x.value != person);
      setOptionsSupport(newList);
    }
  };

  const onChangePersonSuport = (state) => {
    const persons = form.getFieldValue('supportPersonIds');

    if (!state && persons) {
      const newList = employeeOptions.filter((x) => !persons.includes(x.value));
      setOptionsMain(newList);
    }
  };

  return (
    <>
      <Modal
        title={'Phân công'}
        open={isPhanCong}
        form={form}
        width={500}
        onCancel={handleCancel}
        footer={[
          <Button form="phan-cong-form" key="back" type="button" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button form="phan-cong-form" key="submit" type="primary" htmlType="submit">
            Lưu
          </Button>,
        ]}
      >
        <Form id="phan-cong-form" form={form} labelAlign="left" onFinish={onFinish} {...formItemLayout}>
          <Form.Item name={'technicalRequirementId'} hidden={true}></Form.Item>
          <Form.Item name={'mainPersonId'} label="Người chịu trách nhiệm chính">
            <Select options={optionsMain} onChange={onChangePersonMain}></Select>
          </Form.Item>
          <Form.Item name={'supportPersonIds'} label="Người hỗ trợ">
            <Select mode="multiple" options={optionsSupport} onDropdownVisibleChange={onChangePersonSuport}></Select>
          </Form.Item>
          {/* <Form.Item name={'plannedStartDate'} label="Ngày lập kế hoạch">
            <DatePicker />
          </Form.Item>
          <Form.Item name={'startDate'} label="Ngày bắt đầu">
            <DatePicker />
          </Form.Item>
          <Form.Item name={'dueDate'} label="Dự kiến hoàn thành">
            <DatePicker />
          </Form.Item>
          <Form.Item name={'closedDate'} label="Ngày hoàn thành">
            <DatePicker />
          </Form.Item>
          <Form.Item name={'note'} label="Ghi chú">
            <TextArea rows={2} />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export const TechnicalBusinessRequestComponon = (props) => {
  const {
    setIsOpen,
    isUpdate,
    customerOptions,
    form,
    updatePersonContactList,
    personContactOptions,
    isCreate,
    readGrid,
  } = props;

  // const {
  //   setIsOpen,
  //   isUpdate,
  //   customerOptions,
  //   form,
  //   updatePersonContactList,
  //   personContactOptions,
  //   isCreate,
  //   readGrid,
  // } = useContext(TechnicalBusinessRequestContext);

  const colLg = isUpdate ? 12 : 12;
  const rowGutter = 20;
  const fullLg = 24;
  const formItemLayout = {
    labelCol: { span: isUpdate ? 24 : 12 },
    wrapperCol: { span: isUpdate ? 24 : 12 },
  };

  const textAreaItemLayout = {
    labelCol: { span: isUpdate ? 24 : 12 },
    wrapperCol: { span: isUpdate ? 24 : 12 },
  };

  const onFinish = (values) => {
    if (!isCreate) {
      let id = form.getFieldValue('id');
      values = { ...values, id: id };
    }

    api.createTechnicalBusiness(values).then((res) => {
      if (res.isSuccess) {
        form.resetFields();
        setIsOpen(false);
        message.success(SAVE_SUCCESS);
        readGrid(true);
      } else {
        message.error(SAVE_ERROR);
      }
    });
  };

  const onChangeCustomer = (customerId) => {
    updatePersonContactList(customerId);
    form.setFieldValue('requirementPersonId', '');
  };

  const configRule = {
    customerId: [{ required: isUpdate, message: 'Vui lòng nhập Mã Khách hàng' }],
    requirementPersonId: [{ required: isUpdate, message: 'Vui lòng nhập Người yêu cầu' }],
    plannedStartDate: [{ required: isUpdate, message: 'Vui lòng nhập Ngày thực hiện' }],
    requirementDate: [{ required: isUpdate, message: 'Vui lòng nhập Ngày yêu cầu' }],
  };

  const onDropdownVisibleChange = (value, ssss) => {
    console.log('onDropdownVisibleChange', value);
    console.log('onDropdownVisibleChange ssssssss', ssss);
  };

  return (
    <>
      <Form
        id="technical-requirement"
        form={form}
        labelAlign="left"
        layout={isUpdate ? 'vertical' : 'horizontal'}
        onFinish={onFinish}
        style={{ display: 'grid' }}
        {...formItemLayout}
      >
        <Row gutter={rowGutter}>
          <Col lg={colLg}>
            {isUpdate ? (
              <Form.Item name="customerId" label="Mã Khách hàng" rules={configRule['customerId']}>
                <Select
                  options={customerOptions}
                  onChange={onChangeCustomer}
                  defaultValue={customerOptions[0]}
                ></Select>
              </Form.Item>
            ) : (
              <Form.Item name="customerName" label="Mã Khách hàng">
                <LableCustom />
              </Form.Item>
            )}
          </Col>
          <Col lg={colLg}>
            {isUpdate ? (
              <Form.Item name="requirementPersonId" label="Người yêu cầu" rules={configRule['requirementPersonId']}>
                <Select
                  options={personContactOptions}
                  onDeselect={onDropdownVisibleChange}
                  defaultValue={personContactOptions[0]}
                ></Select>
              </Form.Item>
            ) : (
              <Form.Item name="contactPersonName" label="Người yêu cầu">
                <LableCustom />
              </Form.Item>
            )}
          </Col>
          <Col lg={colLg} hidden={isUpdate}>
            <Form.Item name="customerName" label="Tên Khách hàng">
              <LableCustom />
            </Form.Item>
          </Col>

          <Col lg={colLg}>
            {isUpdate ? (
              <Form.Item name="requirementDate" label="Ngày yêu cầu" rules={configRule['requirementDate']}>
                <DatePicker placeholder="Chọn ngày" format={'DD-MM-YYYY'} defaultValue={today()}></DatePicker>
              </Form.Item>
            ) : (
              <Form.Item name="requirementDate" label="Ngày yêu cầu">
                <LableCustom type="date" />
              </Form.Item>
            )}
          </Col>

          <Col lg={colLg}>
            <Form.Item name="contactPersonPosition" label="Chức vụ">
              {isUpdate ? <Input /> : <LableCustom />}
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item name="customerAddress" label="Địa chỉ">
              {isUpdate ? <Input /> : <LableCustom />}
            </Form.Item>
          </Col>

          <Col lg={colLg} hidden={!isUpdate}>
            <Form.Item name="type" label="Loại">
              {isUpdate ? <Select options={enums.TechnicalRequirementTypeOptions}></Select> : <LableCustom />}
            </Form.Item>
          </Col>

          <Col lg={fullLg} hidden={true}>
            <Form.Item name="completedNote" label="Nội dung hoàn thành" {...textAreaItemLayout}>
              <TextArea rows={3} disabled={!isUpdate} />
            </Form.Item>
          </Col>

          <Col lg={colLg}>
            <Form.Item name="plannedStartDate" label="Ngày thực hiện" rules={configRule['plannedStartDate']}>
              {isUpdate ? (
                <DatePicker
                  placeholder="Chọn ngày"
                  format={'DD-MM-YYYY'}
                  defaultValue={today()}
                  disabledDate={(current) => current && current < today()}
                ></DatePicker>
              ) : (
                <LableCustom type="date" />
              )}
            </Form.Item>
          </Col>
          <Col lg={colLg}>
            <Form.Item name="customerPhone" label="Điện thoại">
              {isUpdate ? <Input /> : <LableCustom />}
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item
              name="contentRequirement"
              label="Nội dung yêu cầu"
              {...textAreaItemLayout}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {isUpdate ? <TextArea rows={3} disabled={!isUpdate} /> : <LableCustom />}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export const TechnicalBusinessRequestPopup = (props) => {
  const {
    isOpen,
    handleCancel,
    form,
    isUpdate,
    handleEdit,
    handleClosePopup,

    setIsOpen,
    customerOptions,
    updatePersonContactList,
    personContactOptions,
    isCreate,
    readGrid,
  } = useContext(TechnicalBusinessRequestContext);

  const renderBtnFooter = () => {
    const actionSave = [
      <Button form="technical-requirement" key="back" onClick={() => handleCancel()}>
        Hủy
      </Button>,
      <Button form="technical-requirement" key="submit" type="primary" htmlType="submit">
        Lưu
      </Button>,
    ];

    const actionEdit = [
      <Button form="technical-requirement" key="edit" type="primary" onClick={() => handleEdit()}>
        Chỉnh sửa
      </Button>,
    ];

    return isUpdate ? actionSave : actionEdit;
  };

  const configForm = {
    setIsOpen: { setIsOpen },
    isUpdate: { isUpdate },
    customerOptions: { customerOptions },
    form: { form },
    updatePersonContactList: { updatePersonContactList },
    personContactOptions: { personContactOptions },
    isCreate: { isCreate },
    readGrid: { readGrid },
  };

  return (
    <>
      <Modal
        title={'Yêu cầu Khách hàng'}
        open={isOpen}
        form={form}
        width={800}
        onCancel={() => handleClosePopup()}
        footer={renderBtnFooter()}
      >
        <TechnicalBusinessRequestComponon
          setIsOpen={setIsOpen}
          isUpdate={isUpdate}
          customerOptions={customerOptions}
          form={form}
          updatePersonContactList={updatePersonContactList}
          personContactOptions={personContactOptions}
          isCreate={isCreate}
          readGrid={readGrid}
        />
      </Modal>
    </>
  );
};
