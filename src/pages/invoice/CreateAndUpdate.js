/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Upload, Typography } from 'antd';
import { formatDateYMD } from 'utils/format';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputCustom from 'components/input/inputCustom';
import SelectSearch from 'components/input/selectSearch';
import { createInvoice, getInvoiceById } from 'services/invoice';
import { MODE } from 'constants/mode.cost';
import { getToDay } from 'utils/dateUtils';
import { valRequired } from 'utils/validate/validateUtils';
import './index.less';
import { getCustomerDropdown } from 'services/customer/index';
import { getEmployeeDropDown } from 'services/employee/index';
import { UploadOutlined } from '@ant-design/icons';
import UploadCustom from 'components/input/uploadCustom';
import { uploadMultipleFiles } from 'services/file-storage';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const CreateAndUpdate = (props) => {
  const { id, isOpen, onClose, form, reloadTable } = props;
  const schema = yup.object().shape({
    number: valRequired(yup),
    customerId: valRequired(yup),
    salerId: valRequired(yup),
    amount: valRequired(yup),
    vat: valRequired(yup),
    totalAmount: valRequired(yup),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
  const [mode, setMode] = useState(id ? MODE.DETAIL : MODE.CREATE);
  const [listCustomer, setListCustomer] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getCustomers();
    getEmployees();
  }, [isOpen]);

  const getCustomers = async () => {
    const response = await getCustomerDropdown();
    if (response && response.data) {
      const customers = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setListCustomer(customers);
    }
  };

  const getEmployees = async () => {
    const response = await getEmployeeDropDown();
    if (response && response.data) {
      const employees = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setEmployee(employees);
    }
  };

  const onSubmit = (data) => {
    uploadMultipleFiles(fileList, false, (filesString) => {
      let request = {
        ...data,
        releaseDate: formatDateYMD(data.releaseDate),
      };

      if (filesString) {
        request.fileId = filesString;
      }
      // if mode edit then add id edit
      if (id) {
        request.id = id;
      }
      createOrUpdateInvoice(request);
    });

  };

  const createOrUpdateInvoice = (request) => {
    createInvoice(request).then((res) => {
      if (res) {
        onClose();
        reloadTable();
      }
      return;
    });
  };

  const handleCancel = () => {
    onClose();
  };

  const onLoad = () => {
    getInvoiceById(id).then((res) => {
      Object.keys(res.data).forEach((key) => {
        setValue(key, res.data[key]);
      });
    });
  };

  useEffect(() => {
    if (id && (mode === MODE.EDIT || mode === MODE.DETAIL)) {
      onLoad();
      setMode(MODE.DETAIL);
    } else {
      defaultValueInModeCreate();
    }
  }, [id]);

  const defaultValueInModeCreate = () => {
    setValue('releaseDate', getToDay());
  };

  const getTitle = () => {
    let title = 'Chi tiết hóa đơn';

    if (mode === MODE.CREATE) {
      title = 'Thêm mới hóa đơn';
    }
    if (mode === MODE.EDIT) {
      title = 'Chỉnh sửa mới hóa đơn';
    }

    return title;
  };

  const getSumPrice = () => {
    const amount = watch('amount');
    const vat = watch('vat');
    if (!amount || !vat) {
      setValue('totalAmount', '');
      return;
    }
    setValue('totalAmount', Number(amount) + Number(vat));
  };

  return (
    <>
      <Modal
        title={getTitle()}
        open={isOpen}
        form={form}
        width={800}
        onCancel={handleCancel}
        className="modal-invoice"
        footer={null}
      >
        <form className="form-invoice" onSubmit={handleSubmit(onSubmit)}>
          {(mode !== MODE.CREATE && isAccessed(PER.HOA_DON_SUA)) && (
            <Row>
              <Col span={24} className="btn-edit">
                <Button type="primary" onClick={() => setMode(mode === MODE.EDIT ? MODE.DETAIL : MODE.EDIT)}>
                  {mode === MODE.EDIT ? 'Chi tiết' : 'Chỉnh sửa'}
                </Button>
              </Col>
            </Row>
          )}
          <Row>
            <Col className="col-input" span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Số hóa đơn"
                control={control}
                type="text"
                name="number"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={12}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Khách hàng"
                control={control}
                name="customerId"
                options={listCustomer}
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngày phát hành"
                control={control}
                type="date"
                name="releaseDate"
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={12}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Người bán hàng"
                control={control}
                name="salerId"
                options={employee}
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Số tiền (Chưa VAT)"
                control={control}
                type="text"
                name="amount"
                onChange={() => getSumPrice()}
                isRequired
                errors={errors}
                formatInput
              />
            </Col>
            <Col className="col-input" span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Thuế VAT"
                control={control}
                type="text"
                name="vat"
                onChange={() => getSumPrice()}
                isRequired
                errors={errors}
                formatInput
              />
            </Col>
            <Col className="col-input" span={12}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Thành tiền"
                control={control}
                type="text"
                name="totalAmount"
                disabled
                isRequired
                errors={errors}
                formatInput
              />
            </Col>
          </Row>
          {mode !== MODE.DETAIL && (
            <Row style={{ paddingBottom: '20px' }}>
              <Col className="col-input" span={12}>
                <UploadCustom
                  fileList={fileList}
                  label="Chọn File hóa đơn"
                  multiple={false}
                  setFileList={(files) => setFileList(files)}
                />
              </Col>
            </Row>
          )}


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
      </Modal>
    </>
  );
};

CreateAndUpdate.propTypes = {};
export default CreateAndUpdate;
