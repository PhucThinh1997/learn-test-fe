import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputCustom from '../../../components/input/inputCustom';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { valRequired } from '../../../utils/validate/validateUtils';
import { getCustomerById } from '../../../services/customer/index';
import './contract-v2.less';
import { useEffect } from 'react';
import { createContract, reviewContract, getContractById } from '../../../services/contract/index';
import { getEmployeeDropDown } from '../../../services/employee/index';
import { getCustomerDropdown } from '../../../services/customer/index';
import SelectSearch from '../../../components/input/selectSearch';
import { Button, Col, Input, Row, Typography, Upload } from 'antd';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import Title from 'antd/lib/typography/Title';
import { EyeOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import StickyAction from 'components/Layout/stickyAction';
import { uploadFile } from 'services/file-storage';
import { useLocation } from 'react-router-dom';
import { getDealersById } from 'services/dealers/dealers.service';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';
const { TextArea } = Input;

const enumSaveMode = {
  MODE_SAVE: 1,
  MODE_SAVE_SEND: 2,
  MODE_PREVIEW: 3,
};

const CreateContract = (props) => {
  const schema = yup.object().shape({
    customerId: valRequired(yup),
    total: valRequired(yup),
    contractDate: valRequired(yup),
    customerAddress: valRequired(yup),
    customerTax: valRequired(yup),
    customerRepresentativeName: valRequired(yup),
    customerPosition: valRequired(yup),
    employeeManageContractId: valRequired(yup),
  });
  let history = useHistory();
  const params = useParams();

  const [listCustomer, setListCustomer] = useState([]);
  const [mode, setMode] = React.useState(null);
  const [quotationDetail, setQuotationDetail] = useState();
  const [condition, setCondition] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  const [fileList, setFileList] = useState();
  const [isExitsCustomer, setIsExitsCustomer] = useState(null);
  const isEdit = params.id != null;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idDealers = queryParams.get('idDealers');
  const [listEmployee, setListEmployee] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const createFromContract = (request) => {
    if (mode === enumSaveMode.MODE_PREVIEW) {
      reviewContract(request).then((res) => {
        window.open(`/tai-lieu/${res.data.id}`, '_blank');
        return;
      });
    } else {
      if (mode === enumSaveMode.MODE_SAVE_SEND) {
        request.isSendMail = true;
      }
      createContract(request).then((res) => {
        handleBack();
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

  const propsUploadFile = {
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

  useEffect(() => {
    if (condition.length > 0) {
      setErrMessage({ ...errMessage, ...{ conditionError: '' } });
    }
  }, [condition]);

  const onSubmit = (data) => {
    if (!condition || condition.length === 0) {
      setErrMessage({ ...errMessage, ...{ conditionError: 'Vui lòng nhập hợp đồng' } });
      return;
    }

    uploadMultipleFiles((filesString) => {
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

      let request = {
        ...data,
        contractDetails: condition.map((x) => ({ title: x.title, content: x.content })),
      };

      // Is mode edit
      if (params.id) {
        request.id = params.id;
        //remove filed
        delete request.status;
        delete request.contractFileId;
        delete request.peopleRepresentId;
        delete request.dealersId;
      }

      // Move from screen dealers
      if (isExitsCustomer === false && !!idDealers) {
        request.dealersId = idDealers;
        request.customerId = idDealers;
      }

      // handle upload filesID
      if (filesString === '' && isEdit && fileList && fileList.length > 0) {
        request.contractAddendumFileIds = fileList
          .filter((x) => x.isEditFile)
          .map((x) => x.id)
          .toString();
      }
      if (filesString) {
        if (isEdit) {
          const listFileOld = fileList.filter((x) => x.isEditFile).map((x) => x.id);
          const listFileNew = filesString.split(',');
          const fileStringEdit = listFileNew.concat(listFileOld).toString();
          request.contractAddendumFileIds = fileStringEdit;
        } else {
          request.contractAddendumFileIds = filesString;
        }
      }

      createFromContract(request);
    });
  };

  const handleBack = () => {
    history.push('/hop-dong');
  };

  const onChangeCustomer = (val) => {
    getCustomerById(val).then((x) => {
      setValue('customerAddress', x.data.address);
      setValue('customerTax', x.data.taxCode);
      setValue('bankAccount', x.data.bankAccount);
      setValue('customerPhone', x.data.phone);
      setValue('customerPosition', x.data.position);
      setValue('customerRepresentativeName', x.data.customerRepresentativeName);
    });
  };

  const loadQuotationById = () => {
    if (isEdit) {
      getContractById(params.id).then((res) => {
        const data = res?.data;
        if (data) {
          Object.keys(data).forEach((key) => {
            if (res.data[key]) {
              setValue(key, res.data[key]);
            } else {
              setValue(key, '');
            }
          });

          setCondition(data.contractDetails);
          setQuotationDetail(data);
          if (data.contractAddendumFiles) {
            data.contractAddendumFiles.forEach((x) => {
              x.name = x.fileName;
              x.isEditFile = true;
            });
            setFileList(data.contractAddendumFiles);
          }
        }
      });
    }
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

  const renderCondition = () =>
    condition.map((item, i) => (
      <>
        <Row>
          <Col className="condition-title" span={1}>
            <Typography.Text> Điều {i + 1}: </Typography.Text>
          </Col>
          <Col className="condition-title" span={22}>
            {renderInputContract('textarea', `conditionTitle${i + 1}`, '', `Tiêu đề điều ${i + 1}`, 1, item, 'title')}
          </Col>
          <Col className="condition-title" span={1}>
            <Button className="delete-condition-btn" type="danger" onClick={() => deleteCondition(item.id)}>
              <DeleteOutlined />
            </Button>
          </Col>

          <Col span={22} offset={1} className="content-condition">
            {renderInputContract(
              'textarea',
              `conditionContent${i + 1}`,
              '',
              `Nội dung điều ${i + 1}`,
              3,
              item,
              'content',
            )}
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

  useEffect(() => {
    setValue('contractDate', new Date().toISOString().substring(0, 10));
    setValue('number', '17/2022');
    getEmployeeDropDown().then((res) => {
      const employees = res.data.map((x) => ({ value: x.id, label: x.name }));
      setListEmployee(employees);
    });
    getCustomerDropdown().then((res) => {
      const customerOption = res.data.map((x) => ({
        value: x.id,
        label: x.name,
      }));

      if (idDealers) {
        getDealersById(idDealers).then((dealers) => {
          let isExitsCustomer = customerOption.some((x) => x.value === dealers.data.code);
          setIsExitsCustomer(isExitsCustomer);
          if (isExitsCustomer) {
            setListCustomer(customerOption);
          } else {
            let dealerCustoms = [
              {
                value: dealers.data.code,
                label: dealers.data.dealersName,
              },
            ];
            setListCustomer(dealerCustoms);
          }
          setValue('customerId', dealers.data.code);
          setValue('total', dealers.data.totalPrice);
        });
      } else {
        setListCustomer(customerOption);
      }
    });
    getEmployeeDropDown().then((res) => {
      const empOption = res.data.map((x) => ({
        value: x.id,
        label: x.name,
      }));
    });
    loadQuotationById();
  }, []);

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

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);
  };

  const renderInputContract = (type, name, className, placeholder = '', row = 2, item, typeRender) => (
    <>
      <TextArea
        value={item[typeRender]}
        type={type}
        name={name}
        // errors={errors}
        className={className}
        placeholder={placeholder}
        rows={row}
        onChange={(e) => onChangeCondition(e, item.uniqueId, typeRender)}
      />
    </>
  );

  return (
    <div>
      <HeaderPage title="HỢP ĐỒNG KHÁCH HÀNG" actions="" />
      <div className="main__application">
        <PageWrapper>
          <Title className="title-contract" level={3}>
            HỢP ĐỒNG{' '}
          </Title>
          <form id="form-quote" onSubmit={handleSubmit(onSubmit)}>
            <Row className="row-info">
              <Col span={14}>
                <SelectSearch
                  isTitleInline
                  label="Khách hàng"
                  control={control}
                  name="customerId"
                  options={listCustomer}
                  isRequired
                  errors={errors}
                  onChange={(val) => onChangeCustomer(val)}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={8} offset={2}>
                <InputCustom
                  isTitleInline
                  label="Ngày tạo HĐ"
                  control={control}
                  type="date"
                  name="contractDate"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
            </Row>
            <Row className="row-info">
              <Col span={14}>
                <InputCustom
                  isTitleInline
                  label="Địa chỉ"
                  control={control}
                  type="text"
                  name="customerAddress"
                  errors={errors}
                  isRequired
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={8} offset={2}>
                <InputCustom
                  isTitleInline
                  label="Số hợp đồng"
                  control={control}
                  name="number"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
            </Row>
            <Row className="row-info">
              <Col span={8}>
                <InputCustom
                  isTitleInline
                  label="Mã số thuế"
                  control={control}
                  type="text"
                  name="customerTax"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={6}>
                <InputCustom
                  isTitleInline
                  label="Số tài khoản"
                  control={control}
                  type="text"
                  name="bankAccountNumber"
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={8} offset={2}>
                <InputCustom
                  isTitleInline
                  label="Ngày hoàn thành HĐ"
                  control={control}
                  type="date"
                  isRequired
                  errors={errors}
                  name="contractDateComplete"
                  className="input-boder-bottom"
                />
              </Col>
            </Row>
            <Row className="row-info">
              <Col span={14}>
                <InputCustom
                  isTitleInline
                  label="Tên ngân hàng"
                  control={control}
                  type="text"
                  name="customerBankName"
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={8} offset={2}>
                <InputCustom
                  isTitleInline
                  label="Tổng tiền"
                  control={control}
                  type="text"
                  name="total"
                  className="input-boder-bottom"
                  isRequired
                  disabled={!!idDealers}
                  errors={errors}
                  formatInput
                />
              </Col>
            </Row>
            <Row className="row-info">
              <Col span={8}>
                <InputCustom
                  isTitleInline
                  label="Người đại diện"
                  control={control}
                  type="text"
                  name="customerRepresentativeName"
                  className="input-boder-bottom"
                  isRequired
                  errors={errors}
                />
              </Col>
              <Col span={6}>
                <InputCustom
                  isTitleInline
                  label="Số điện thoại"
                  control={control}
                  type="number"
                  name="customerPhone"
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
              <Col span={8} offset={2}>
                <SelectSearch
                  isTitleInline
                  label="Người quản lý HĐ"
                  control={control}
                  name="employeeManageContractId"
                  options={listEmployee}
                  className="input-boder-bottom"
                  isRequired
                  errors={errors}
                />
              </Col>
            </Row>
            <Row>
              <Col span={14}>
                <InputCustom
                  isTitleInline
                  label="Chức vụ"
                  control={control}
                  type="text"
                  name="customerPosition"
                  isRequired
                  errors={errors}
                  className="input-boder-bottom"
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Upload
                  accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,.zip,.rar"
                  onChange={handleChange}
                  multiple
                  {...propsUploadFile}
                >
                  <Button icon={<UploadOutlined />}>Chọn file phụ lục hợp đồng</Button>
                </Upload>
              </Col>
            </Row>

            <Row style={{ paddingTop: '20px' }}>
              <Col span={24}>
                <Typography.Text className="title-header"> Điều khoản hợp đồng </Typography.Text>
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
                        {isAccessed(PER.HOP_DONG_GUI_MAIL) && (
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
    </div>
  );
};

export default CreateContract;
