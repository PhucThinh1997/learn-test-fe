import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputCustom from '../../../components/input/inputCustom';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { valPhone, valRequired } from '../../../utils/validate/validateUtils';

import './create-quote.less';
import { useEffect } from 'react';
import {
  getQuotationNumberToCreate,
  createQuotation,
  getQuotationById,
  reviewQuotation,
} from '../../../services/quotation/index';
import { getEmployeeDropDown } from '../../../services/employee/index';
import { getCustomerDropdown, getCustomerById } from '../../../services/customer/index';
import SelectSearch from '../../../components/input/selectSearch';
import { formatCurrency } from '../../../utils/format';
import _ from 'lodash';
import { Button, Col, Row, Typography, Upload } from 'antd';
import PageWrapper from 'components/Layout/PageWrapper';
import HeaderPage from 'pages/home/header-page';
import TableProduct from './TableProduct';
import Title from 'antd/lib/typography/Title';
import StickyAction from 'components/Layout/stickyAction';
import TextArea from 'antd/lib/input/TextArea';
import { EyeOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadFile } from 'services/file-storage';
import moment from 'moment';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const enumSaveMode = {
  MODE_SAVE: 1,
  MODE_SAVE_SEND: 2,
  MODE_PREVIEW: 3,
};
const CreateQuote = () => {
  const schema = yup.object().shape({
    customerId: valRequired(yup),
    phone: valPhone(yup),
    department: valRequired(yup),
    numberTax: valRequired(yup),
    quotationInchargeId: valRequired(yup),
    position: valRequired(yup),
    quotationSymbol: valRequired(yup),
  });

  let history = useHistory();
  const params = useParams();
  const isModeEdit = !!params.id;
  const [productList, setProductList] = useState([]);
  const [listRepresent, setListRepresent] = useState([]);
  const [listCustomer, setListCustomer] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [sumDetail, setSumDetail] = useState({
    sumMoneyProduct: 0,
    sumMoneyTax: 0,
    sumMoneyPayment: 0,
  });
  const [mode, setMode] = React.useState(null);
  const [widthBottomBar, setWidthBottomBar] = useState(0);
  const [quotationDetail, setQuotationDetail] = useState();
  const [condition, setCondition] = useState([]);
  const [fileList, setFileList] = useState();
  const [errMessage, setErrMessage] = useState(null);

  const isEdit = params.id != null;

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const vats = [
    { value: 0, label: '0%' },
    { value: 5, label: '5%' },
    { value: 8, label: '8%' },
    { value: 10, label: '10%' },
  ];

  const createFromQuotation = (request) => {
    if (mode === enumSaveMode.MODE_PREVIEW) {
      reviewQuotation(request).then((res) => {
        window.open(`/tai-lieu/${res.data.id}`, '_blank');
        return;
      });
    } else {
      if (mode === enumSaveMode.MODE_SAVE_SEND) {
        request.isSendMail = true;
      }
      createQuotation(request).then((res) => {
        // showMessageSuccess();
        setTimeout(() => {
          handleBack();
        }, 1000);
      });
    }
  };

  const uploadMultipleFiles = (cb) => {
    let promises = [];
    if (!fileList) {
      cb('');
      return;
    }
    fileList
      .filter((x) => !x.isEditFile)
      .forEach((file, index) => {
        promises.push(uploadFile(file.originFileObj));
      });
    try {
      Promise.all(promises).then((res) => {
        cb(res.map((x) => x.data.id).toString());
      });
    } catch (error) {
      // Handle all errors
    }
  };

  useEffect(() => {
    if (productList.length > 0) {
      setErrMessage({ ...errMessage, ...{ productError: '' } });
    }
    if (condition.length > 0) {
      setErrMessage({ ...errMessage, ...{ conditionError: '' } });
    }
  }, [productList, condition]);

  const onSubmit = (data) => {
    setErrMessage(null);
    if (!productList || productList.length === 0) {
      setErrMessage({ ...errMessage, ...{ productError: 'Vui lòng nhập sản phẩm' } });
      return;
    }

    if (!condition || condition.length === 0) {
      setErrMessage({ ...errMessage, ...{ conditionError: 'Vui lòng nhập điều khoản' } });
      return;
    }

    if (condition && condition.length > 0) {
      let conditionClone = _.cloneDeep(condition);
      conditionClone.forEach((x) => {
        x.error = x.title === '' || x.content === '';
      });
      setCondition(conditionClone);
      if (conditionClone.some((x) => x.error === true)) {
        return;
      }
    }

    uploadMultipleFiles((filesString) => {
      const quotationDetails = productList.map((x) => ({
        id: isModeEdit && x.guildId ? x.guildId : null,
        deviceTechnicalFeature: x.deviceTechnicalFeature,
        quantity: x.quantity,
        unitPrice: x.unitPrice,
        isDeleted: isModeEdit ? x.isDeleted : false,
      }));

      let request = {
        ...data,
        id: params?.id,
        orderId: isEdit ? quotationDetail.orderId : params?.orderId,
        quotationDate: moment.isMoment(data.quotationDate)
          ? data.quotationDate?.format('YYYY-MM-DD')
          : data.quotationDate,
        totalAmount: caculateSumMoney(productList),
        quotationDetails: isModeEdit ? quotationDetails : quotationDetails.filter((x) => !x.isDeleted),
        vat: data.vat ?? 0,
        commercialTerms: condition.map((item, index) => ({
          order: index + 1,
          title: item.title,
          content: item.content,
        })),
      };

      if (filesString === '' && isEdit && fileList && fileList.length > 0) {
        request.configurationFileIds = fileList
          .filter((x) => x.isEditFile)
          .map((x) => x.id)
          .toString();
      }
      if (filesString) {
        if (isEdit) {
          const listFileOld = fileList.filter((x) => x.isEditFile).map((x) => x.id);
          const listFileNew = filesString.split(',');
          const fileStringEdit = listFileNew.concat(listFileOld).toString();
          request.configurationFileIds = fileStringEdit;
        } else {
          request.configurationFileIds = filesString;
        }
      }
      createFromQuotation(request);
    });
  };

  const handleBack = () => {
    history.push('/bao-gia');
  };

  const caculateSumMoney = (productList) => {
    let listSumMoney = [];
    productList.forEach((e) => {
      listSumMoney.push(e.quantity * e.unitPrice);
    });
    const sum = listSumMoney.map((x) => x).reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  };

  const caculatorTax = () => {
    let getTax = watch('vat');
    let sumMoneyProduct = caculateSumMoney(productList);
    let sumMoneyTax = (sumMoneyProduct / 100) * getTax;
    let sumMoneyPayment = sumMoneyTax + sumMoneyProduct;

    setSumDetail({
      sumMoneyProduct: sumMoneyProduct,
      sumMoneyTax: sumMoneyTax,
      sumMoneyPayment: sumMoneyPayment,
    });
  };

  useEffect(() => {
    caculatorTax();
  }, [productList]);

  const onChangeCustomer = (val) => {
    getCustomerById(val).then((x) => {
      setValue('numberTax', x.data.taxCode);
      setValue('address', x.data.address);
      setValue('phone', x.data.phone);
      setValue('position', x.data.position);
      setValue('department', x.data.department);
    });
  };

  const loadQuotationById = () => {
    if (params.id) {
      getQuotationById(params.id).then((res) => {
        const data = res?.data;
        if (data) {
          var customerData = data?.customer;
          var quotationDate = new Date(data?.quotationDate);

          var date = quotationDate.toISOString().substring(0, 10);
          setValue('quotationDate', date);
          setValue('customerId', customerData?.id);
          setValue('address', customerData?.address);
          setValue('numberTax', customerData?.taxCode);

          setValue('number', data?.number);

          setValue('quotationSymbol', data?.quotationSymbol);
          setValue('vat', data?.vat);
          setValue('conditions', data?.conditions);
          setValue('phone', customerData?.phone);
          setValue('position', customerData?.position);
          setValue('department', customerData.department);
          setValue('quotationInchargeId', data?.quotationInCharge.id);
          setCondition(data?.commercialTerms);

          setQuotationDetail(data);
          var detail = data.quotationDetails.map((x, index) => ({
            id: index + 1,
            guildId: x.id,
            deviceTechnicalFeature: x.deviceTechnicalFeature,
            quantity: x.quantity,
            unitPrice: x.unitPrice,
            sum: x.quantity * x.unitPrice,
          }));
          setProductList(detail);
          if (data.configurationFiles) {
            data.configurationFiles.forEach((x) => {
              x.name = x.fileName;
              x.isEditFile = true;
            });
            setFileList(data.configurationFiles);
          }
        }
      });
    }
  };

  const removeHeaderCommon = () => {
    var elem = document.getElementsByClassName('ant-layout-footer')[0];
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
    let offsetWidth = document.getElementsByClassName('section-wrapper')[0].offsetWidth;
    setWidthBottomBar(offsetWidth - 3);
  };

  useEffect(() => {
    setValue('quotationDate', new Date().toISOString().substring(0, 10));
    getQuotationNumberToCreate().then((res) => {
      setValue('number', res.data);
    });

    getCustomerDropdown().then((res) => {
      const customerOption = res.data.map((x) => ({
        value: x.id,
        label: x.name,
      }));
      setListCustomer(customerOption);
    });
    getEmployeeDropDown().then((res) => {
      const empOption = res.data.map((x) => ({
        value: x.id,
        label: x.name,
      }));
      setListEmployee(empOption);
    });
    loadQuotationById();
    removeHeaderCommon();
  }, []);

  const style = {
    background: '#0092ff',
    padding: '8px 0',
  };

  const deleteCondition = (id) => {
    var conditionClone = _.cloneDeep(condition);
    let conditionRemove = [];
    if (isEdit) {
      conditionRemove = conditionClone.filter((x) => x.id !== id);
    } else {
      conditionRemove = conditionClone.filter((x) => x.uniqueId !== id);
    }
    setCondition(conditionRemove);
  };

  const addCondition = (isAdd) => {
    var conditionClone = _.cloneDeep(condition);

    if (isAdd) {
      var conditions = {
        uniqueId: _.uniqueId(),
        title: '',
        content: '',
        error: false,
      };

      conditionClone.push(conditions);
    } else {
      conditionClone.splice(-1);
    }

    setCondition(conditionClone);
  };

  const onChangeCondition = (e, uniqueId, type) => {
    let val = e.target.value;

    var conditionClone = _.cloneDeep(condition);

    conditionClone.forEach((item) => {
      if (isEdit) {
        if (item.id === uniqueId) {
          item[type] = val;
        }
      } else {
        if (item.uniqueId === uniqueId) {
          item[type] = val;
        }
      }
    });

    setCondition(conditionClone);
  };

  const renderInputQuote = (type, name, className, placeholder = '', row = 2, item, typeRender) => (
    <>
      <TextArea
        value={item[typeRender]}
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        rows={row}
        onChange={(e) => onChangeCondition(e, isEdit ? item.id : item.uniqueId, typeRender)}
      />
    </>
  );

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const renderCondition = () =>
    condition.map((item, i) => (
      <>
        <Row>
          <Col className="condition-title" span={1}>
            <Typography.Text> Điều {i + 1}: </Typography.Text>
          </Col>
          <Col className="condition-title" span={22}>
            {renderInputQuote(
              'textarea',
              `conditionTitle${item.id + 1}`,
              '',
              `Tiêu đề điều ${i + 1}`,
              1,
              item,
              'title',
            )}
          </Col>
          <Col className="condition-title" span={1}>
            <Button className="delete-condition-btn" type="danger" onClick={() => deleteCondition(item.uniqueId)}>
              <DeleteOutlined />
            </Button>
          </Col>

          <Col span={22} offset={1} className="content-condition">
            {renderInputQuote('textarea', `conditionContent${i + 1}`, '', `Nội dung điều ${i + 1}`, 3, item, 'content')}
          </Col>
        </Row>
        <Row>
          {item.error && (
            <Col span={23} offset={1}>
              <div className="ant-form-item-explain-error">Tiêu đề và nội dung không được để trống</div>
            </Col>
          )}
        </Row>
      </>
    ));

  return (
    <>
      <HeaderPage title="BÁO GIÁ KHÁCH HÀNG" actions="" />
      <div className="main__application">
        <PageWrapper>
          <Title className="title-quote" level={3}>
            BÁO GIÁ{' '}
          </Title>
          <form id="form-quote" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col span={14}>
                <SelectSearch
                  isTitleInline
                  label="Khách hàng"
                  control={control}
                  name="customerId"
                  options={listCustomer}
                  isRequired
                  onChange={(val) => onChangeCustomer(val)}
                  className="input-boder-bottom"
                  errors={errors}
                />
              </Col>
              <Col span={8} offset={2}>
                <InputCustom
                  isTitleInline
                  label="Ngày báo giá"
                  control={control}
                  type="date"
                  isRequired
                  errors={errors}
                  name="quotationDate"
                  className="input-boder-bottom"
                />
              </Col>
            </Row>
            <Row>
              <Col span={14}>
                <InputCustom
                  isTitleInline
                  label="Địa chỉ"
                  control={control}
                  type="text"
                  name="address"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={8} offset={2}>
                <InputCustom
                  isTitleInline
                  label="Số báo giá"
                  disabled={true}
                  control={control}
                  type="number"
                  name="number"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <InputCustom
                  isTitleInline
                  label="Mã số thuế"
                  control={control}
                  type="text"
                  name="numberTax"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={7} offset={1}>
                <InputCustom
                  isTitleInline
                  label="Người đại diện"
                  control={control}
                  type="text"
                  name="department"
                  className="input-boder-bottom"
                  isRequired
                  disabled
                  errors={errors}
                />
              </Col>
              <Col span={8} offset={2}>
                <SelectSearch
                  isTitleInline
                  label="Người báo giá"
                  control={control}
                  name="quotationInchargeId"
                  options={listEmployee}
                  className="input-boder-bottom"
                  isRequired
                  errors={errors}
                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <InputCustom
                  isTitleInline
                  label="Số điện thoại"
                  control={control}
                  name="phone"
                  errors={errors}
                  isRequired
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={7} offset={1}>
                <InputCustom
                  isTitleInline
                  label="Chức vụ"
                  control={control}
                  type="text"
                  name="position"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={8} offset={2}>
                <InputCustom
                  isTitleInline
                  label="Ký hiệu báo giá"
                  control={control}
                  type="text"
                  name="quotationSymbol"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Text className="title-header"> Thông tin sản phẩm </Typography.Text>
                <TableProduct
                  originData={productList}
                  handleChangeData={(data) => {
                    setProductList(data);
                    caculatorTax();
                  }}
                  // handleChangeData={setContactPerson}
                  rowKey="id"
                />
                {errMessage && (
                  <Row>
                    <div className="ant-form-item-explain-error">{errMessage?.productError}</div>
                  </Row>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={8} offset={16}>
                <table className="table-result-money">
                  <tr style={{ paddingBottom: '100px' }}>
                    <td>
                      <Typography.Text> Cộng tiền bằng: </Typography.Text>
                    </td>
                    <td>
                      <Typography.Text> {formatCurrency(sumDetail.sumMoneyProduct)} </Typography.Text>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography.Text> Thuế GTGT: </Typography.Text>
                    </td>
                    <td>
                      <SelectSearch
                        label=""
                        name="vat"
                        control={control}
                        options={vats}
                        defaultValue={0}
                        onChange={() => caculatorTax()}
                        className="input-boder-bottom"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography.Text> Tiền thuế GTGT: </Typography.Text>
                    </td>
                    <td>
                      <Typography.Text> {formatCurrency(sumDetail.sumMoneyTax)} </Typography.Text>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography.Text> Tổng tiền thanh toán: </Typography.Text>
                    </td>
                    <td>
                      <Typography.Text> {formatCurrency(sumDetail.sumMoneyPayment)} </Typography.Text>
                    </td>
                  </tr>
                </table>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Upload
                  accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,.zip,.rar"
                  onChange={handleChange}
                  multiple
                  {...props}
                >
                  <Button icon={<UploadOutlined />}>Chọn file cấu hình sản phẩm</Button>
                </Upload>
              </Col>
            </Row>
            <Row style={{ paddingTop: '20px' }}>
              <Col span={24}>
                <Typography.Text className="title-header"> Điều khoản thương mại </Typography.Text>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => addCondition(true)}>
                  Thêm
                </Button>
              </Col>
            </Row>
            {errMessage && (
              <Row>
                <div className="ant-form-item-explain-error">{errMessage?.conditionError}</div>
              </Row>
            )}
            {renderCondition()}
            <Row>
              <StickyAction>
                <Col span={20} offset={4}>
                  <Row>
                    <Col span={8}>
                      <div>
                        <Button
                          className="button-footer-action"
                          outline
                          color="secondary"
                          type="reset"
                          onClick={handleBack}
                        >
                          Hủy bỏ
                        </Button>
                        <Button
                          outline
                          htmlType="submit"
                          className="button-footer-action"
                          onClick={() => setMode(enumSaveMode.MODE_PREVIEW)}
                        >
                          <EyeOutlined />
                          Xem trước
                        </Button>
                      </div>
                    </Col>
                    <Col span={8} offset={8}>
                      <div style={{ textAlign: 'right' }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="button-footer-action"
                          onClick={() => setMode(enumSaveMode.MODE_SAVE)}
                        >
                          Lưu
                        </Button>
                        {isAccessed(PER.BAO_GIA_GUI_MAIL) && (
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => setMode(enumSaveMode.MODE_SAVE_SEND)}
                            className="button-footer-action"
                          >
                            Lưu và gửi mail KH
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </StickyAction>
            </Row>
          </form>
        </PageWrapper>
      </div>
    </>
  );
};

export default CreateQuote;
