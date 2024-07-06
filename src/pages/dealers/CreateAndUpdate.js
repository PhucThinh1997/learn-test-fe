/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { formatDateYMD } from 'utils/format';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputCustom from 'components/input/inputCustom';
import './index.less';
import SelectSearch from 'components/input/selectSearch';
import { createDealers, getDealersById } from 'services/dealers/dealers.service';
import { MODE } from 'constants/mode.cost';
import { getToDay } from 'utils/dateUtils';
import { valRequired } from 'utils/validate/validateUtils';
import { listResult } from './enum';
import { getCustomerDropdown } from 'services/customer';

const CreateAndUpdate = (props) => {
  const { id, isOpen, onClose, form, reloadTable } = props;
  const schema = yup.object().shape({
    code: valRequired(yup),
    dealersName: valRequired(yup),
    registerDate: valRequired(yup),
    expireDate: valRequired(yup),
    deviceName: valRequired(yup),
    deviceModel: valRequired(yup),
    quantity: valRequired(yup),
    price: valRequired(yup),
    totalPrice: valRequired(yup),
    status: valRequired(yup),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
  const [mode, setMode] = useState(id ? MODE.DETAIL : MODE.CREATE);

  const onSubmit = (data) => {
    let request = {
      ...data,
      status: Number(data.status),
      expireDate: formatDateYMD(data.expireDate),
      registerDate: formatDateYMD(data.registerDate),
    };
    // if mode edit then add id edit
    if (id) {
      request.id = id;
    }
    createOrUpdateDealers(request);
  };

  const createOrUpdateDealers = (request) => {
    createDealers(request).then((res) => {
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
    getDealersById(id).then((res) => {
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
    setValue('registerDate', getToDay());
    setValue('expireDate', getToDay());
    setValue('status', 0);
  };

  const getTitle = () => {
    let title = 'Chi tiết công ty đăng ký dự án';

    if (mode === MODE.CREATE) {
      title = 'Thêm mới công ty đăng ký dự án';
    }
    if (mode === MODE.EDIT) {
      title = 'Chỉnh sửa mới công ty đăng ký dự án';
    }

    return title;
  };

  const getSumPrice = () => {
    const quantity = watch('quantity');
    const price = watch('price');
    if (!quantity || !price) {
      setValue('totalPrice', '');
      return;
    }
    setValue('totalPrice', quantity * price);
  };

  return (
    <>
      <Modal
        title={getTitle()}
        open={isOpen}
        form={form}
        width={1200}
        onCancel={handleCancel}
        className="modal-dealers"
        footer={null}
      >
        <form className="form-dealers" onSubmit={handleSubmit(onSubmit)}>
          {mode !== MODE.CREATE && (
            <Row>
              <Col span={24} className="btn-edit">
                <Button type="primary" onClick={() => setMode(mode === MODE.EDIT ? MODE.DETAIL : MODE.EDIT)}>
                  {mode === MODE.EDIT ? 'Chi tiết' : 'Chỉnh sửa'}
                </Button>
              </Col>
            </Row>
          )}
          <Row>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Mã Dealers"
                control={control}
                type="text"
                name="code"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={16}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Công ty đăng ký"
                control={control}
                type="text"
                name="dealersName"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngày đăng ký"
                control={control}
                type="date"
                name="registerDate"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={16}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Dự án"
                control={control}
                type="text"
                name="projectName"
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngày hết hạn"
                control={control}
                type="date"
                name="expireDate"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={16}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Khách hàng sử dụng"
                control={control}
                type="text"
                name="customerName"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Ngân sách"
                control={control}
                type="text"
                name="budget"
                errors={errors}
              />
            </Col>

            <Col className="col-input" span={16}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Tên thiết bị"
                control={control}
                type="text"
                name="deviceName"
                isRequired
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Model"
                control={control}
                type="text"
                name="deviceModel"
                isRequired
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Số lượng"
                control={control}
                type="number"
                name="quantity"
                isRequired
                onChange={(value) => getSumPrice()}
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Đơn giá (Chưa VAT)"
                control={control}
                type="text"
                name="price"
                onChange={(value) => getSumPrice()}
                isRequired
                errors={errors}
                formatInput
              />
            </Col>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Thành tiền"
                control={control}
                type="text"
                name="totalPrice"
                isRequired
                disabled
                errors={errors}
                formatInput
              />
            </Col>
            <Col className="col-input" span={8}>
              <SelectSearch
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Kết quả"
                control={control}
                name="status"
                options={listResult}
                isRequired
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Giá đối thủ (chưa VAT)"
                control={control}
                type="text"
                name="competitorPrice"
                errors={errors}
                formatInput
              />
            </Col>
            <Col className="col-input" span={16}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Thông tin khác"
                control={control}
                type="text"
                name="otherInfo"
                errors={errors}
              />
            </Col>
          </Row>
          <Row>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="STT"
                control={control}
                type="text"
                name="sequence"
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Đối thủ chính"
                control={control}
                type="text"
                name="competitorDeviceName"
                errors={errors}
              />
            </Col>
            <Col className="col-input" span={8}>
              <InputCustom
                isTitleInline={mode === MODE.DETAIL}
                isShowText={mode === MODE.DETAIL}
                label="Công ty chào giá"
                control={control}
                type="text"
                name="competitorName"
                errors={errors}
              />
            </Col>
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
      </Modal>
    </>
  );
};

CreateAndUpdate.propTypes = {};
export default CreateAndUpdate;
