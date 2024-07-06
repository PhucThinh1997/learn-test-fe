import React, { useEffect, useState } from 'react';
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Typography,
  Button,
  Upload,
  message,
} from 'antd';
import { DefaultButton, PrimaryButton } from 'common/components/Buttons';
import { BLANK_VALUE } from 'static/Constants';
import { formatDDMMYYYY, today } from 'utils/formatDate';
import { formatCurrency } from 'utils/format';
import { dropdownDepartments } from 'services/department';
import { getFieldsDropDowns } from 'services/fields';
import { uploadFile, getFileModelById } from 'services/file-storage/index';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import './staffInfo.less';
import _ from 'lodash';
import InputMoney from 'common/components/InputMoney';

const { Title } = Typography;
const { Text } = Typography;

const ColItem = ({ span = 8, children, ...rest }) => (
  <Col md={16} lg={span} {...rest}>
    {children}
  </Col>
);

const StaffInfo = ({ form, dataDetail, onFinish, isUpdate, type, setIsUpdate, handleUpdateEmployee }) => {
  const [department, setDepartment] = useState([]);
  const [fields, setFields] = useState([]);
  const [gender, setGender] = useState('Nam');
  const [fileList, setFileList] = useState([]);

  const isCreate = type === 'isCreate';
  const styleItem = {
    marginBottom: '15px',
  };

  useEffect(() => {
    handleGetDepartment();
    handleGetFields();
    // getAllfileUpload()
  }, []);

  // useEffect(() => {
  //   if (fileList.length == 0 && _.isNil(dataDetail?.laborContractFileId)) return '';

  //   if (fileList.length == 0) {
  //     updatefileUpload(dataDetail.laborContractFileId);
  //   }
  // }, [dataDetail.laborContractFileId]);

  const getAllfileUpload = async () => {
    if (_.isNil(dataDetail?.laborContractFileId)) return;
    let file = await getFileModelById(dataDetail.laborContractFileId);
    if (file.data) {
      setFileList([...fileList, file.data]);
    }
  };

  const updatefileUpload = async (id) => {
    if (_.isNil(id)) return;
    let file = await getFileModelById(id);
    if (file.data) {
      let fiel = {
        uid: file.data.id,
        name: file.data.fileName,
        status: 'done',
        url: '',
        percent: 33,
      };
      setFileList([...fileList, fiel]);
    }
  };

  const getNameFile = (id) => {
    if (fileList.length == 0 && _.isNil(id)) return BLANK_VALUE;

    if (fileList.length == 0) {
      updatefileUpload(id);
    }
    let file = fileList.find((x) => x.uid == id);
    return file?.name;
  };

  const handleGetFields = async () => {
    const response = await getFieldsDropDowns();
    setFields(response?.data || []);
  };

  const handleGetDepartment = async () => {
    const response = await dropdownDepartments();
    setDepartment(response?.data || []);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
    if (form) {
      form.setFieldValue('gender', e.target.value);
    }
  };

  const formItemLayout = {
    labelCol: { span: isCreate ? 24 : 8 },
    wrapperCol: { span: isCreate ? 24 : 16 },
  };

  const formatter = (value) => formatCurrency(value);

  const onChangePhone = (value) => {
    form.setFieldValue('username', value.target.value);
  };

  const upFile = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    onRemove: (file) => {
      setFileList([]);
      form.setFieldValue('laborContractFileId', '');
    },
    onChange(info) {
      if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
        uploadFile(info.file)
          .then((res) => {
            if (res?.data?.id) {
              setFileList((pre) => {
                let files = pre.map((x) => {
                  if (x.uid == info.file.uid) x.uid = res?.data?.id;
                  return x;
                });

                return files;
              });
              form.setFieldValue('laborContractFileId', res?.data?.id);
            }
          })
          .catch((err) => () => {
            alert('Có lỗi xảy ra khi tải tệp');
          })
          .finally(() => {});
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Form id="staff-info" form={form} labelAlign="left" layout="vertical" onFinish={onFinish} {...formItemLayout}>
      <Space>
        <WrapperSection title="1. Thông tin nhân viên">
          <Row gutter={24}>
            <ColItem>
              <Form.Item
                style={styleItem}
                label="Mã nhân viên"
                name="code"
                rules={[{ required: true, message: 'Vui lòng nhập Mã nhân viên' }]}
              >
                {isUpdate ? <Input /> : <Text strong>{dataDetail.code}</Text>}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item
                style={styleItem}
                label="Họ và tên: "
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập Tên nhân viên' }]}
              >
                {isUpdate ? <Input /> : <Text strong>{dataDetail.name}</Text>}
              </Form.Item>
            </ColItem>

            <ColItem>
              <Form.Item
                style={styleItem}
                label="Điện thoại: "
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
              >
                {isUpdate ? <Input id="phone" onChange={onChangePhone} /> : <Text strong>{dataDetail.phone}</Text>}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Ngày sinh: " name="dateOfBirth">
                {isUpdate ? (
                  <DatePicker
                    placeholder="Chọn ngày"
                    format={'DD-MM-YYYY'}
                    defaultValue={null}
                    disabledDate={(current) => current && current > today()}
                  />
                ) : (
                  <Text strong>{dataDetail?.dateOfBirth ? formatDDMMYYYY(dataDetail?.dateOfBirth) : BLANK_VALUE}</Text>
                )}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Giới tính: " name="gender">
                {isUpdate ? (
                  <Radio.Group onChange={onChangeGender} value={gender}>
                    <Radio value={'Nam'}>Nam</Radio>
                    <Radio value={'Nữ'}>Nữ</Radio>
                  </Radio.Group>
                ) : (
                  <Text strong>{dataDetail?.gender || BLANK_VALUE}</Text>
                )}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Địa chỉ: " name="address">
                {isUpdate ? <Input /> : <Text strong>{dataDetail?.address || BLANK_VALUE}</Text>}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Email: " name="email">
                {isUpdate ? <Input /> : <Text strong>{dataDetail?.email || BLANK_VALUE}</Text>}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Chức vụ: " name="position">
                {isUpdate ? <Input /> : <Text strong>{dataDetail?.position || BLANK_VALUE}</Text>}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item
                style={styleItem}
                label="Khoa/Phòng/Ban: "
                name="departmentId"
                rules={[{ required: true, message: 'Xin Nhập Khoa/Phòng/Ban!' }]}
              >
                {isUpdate ? (
                  <Select>
                    {department &&
                      department.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                ) : (
                  <Text strong>{dataDetail?.department?.name || BLANK_VALUE}</Text>
                )}
              </Form.Item>
            </ColItem>

            <ColItem>
              <Form.Item style={{ ...styleItem }} label="Thứ tự sắp xếp: " name="sequence">
                {isUpdate ? (
                  <InputNumber min={0} />
                ) : (
                  <Text strong>{!isNaN(dataDetail?.sequence) ? dataDetail?.sequence : BLANK_VALUE}</Text>
                )}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Tài khoản ngân hàng: " name="accountBank">
                {isUpdate ? <Input /> : <Text strong>{dataDetail.accountBank}</Text>}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Tài khoản đăng nhập: " name="username">
                {isUpdate ? (
                  <Input value={dataDetail?.user?.userName} readOnly />
                ) : (
                  <Text strong>{dataDetail?.user?.userName}</Text>
                )}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Lĩnh vực: " name="fieldId">
                {isUpdate ? (
                  <Select>
                    {fields &&
                      fields.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                ) : (
                  <Text strong>
                    {(fields.length > 0 && fields.find((x) => x.id == dataDetail.fieldId)?.name) || BLANK_VALUE}
                  </Text>
                )}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={{ ...styleItem }} label="Hợp đồng" name="laborContractFileId">
                {isUpdate ? (
                  <Upload {...upFile}>
                    {fileList.length > 0 ? '' : <Button icon={<UploadOutlined />}>File đính kèm</Button>}
                  </Upload>
                ) : (
                  <Text strong>{getNameFile(dataDetail?.laborContractFileId)}</Text>
                )}
              </Form.Item>
            </ColItem>
          </Row>
        </WrapperSection>
      </Space>
      <Space>
        <WrapperSection title="2. Thông tin Lương & Phụ cấp">
          <Row gutter={24}>
            <ColItem>
              <Form.Item
                style={styleItem}
                label="Lương cơ bản"
                name="basicSalary"
                rules={[{ required: true, message: 'Vui lòng nhập Lương cơ bản' }]}
              >
                {isUpdate ? (
                  <InputMoney form={form} name="basicSalary" />
                ) : (
                  <Text className="aaaaaaaaaaa" strong>
                    {formatCurrency(dataDetail.basicSalary)}
                  </Text>
                )}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Phụ cấp điện thoại: " name="phoneAllowance">
                {isUpdate ? (
                  <InputMoney form={form} name="phoneAllowance" />
                ) : (
                  <Text strong>{formatCurrency(dataDetail.phoneAllowance)}</Text>
                )}
              </Form.Item>
            </ColItem>
            <ColItem>
              <Form.Item style={styleItem} label="Phụ cấp ăn uống: " name="foodAllowance">
                {isUpdate ? (
                  <InputMoney form={form} name="foodAllowance" />
                ) : (
                  <Text strong>{formatCurrency(dataDetail.foodAllowance)}</Text>
                )}
              </Form.Item>
            </ColItem>

            <ColItem>
              <Form.Item style={styleItem} label="Phụ cấp trách nhiệm: " name="responsibilityAllowance">
                {isUpdate ? (
                  <InputMoney form={form} name="responsibilityAllowance" />
                ) : (
                  <Text strong>{formatCurrency(dataDetail.foodAllowance)}</Text>
                )}
              </Form.Item>
            </ColItem>

            <ColItem>
              <Form.Item style={styleItem} label="Phụ cấp đi lại: " name="travelAllowance">
                {isUpdate ? (
                  <InputMoney form={form} name="travelAllowance" />
                ) : (
                  <Text strong>{formatCurrency(dataDetail.travelAllowance)}</Text>
                )}
              </Form.Item>
            </ColItem>

            <ColItem>
              <Form.Item style={styleItem} label="Phụ cấp khác: " name="otherAllowance">
                {isUpdate ? (
                  <InputMoney form={form} name="otherAllowance" />
                ) : (
                  <Text strong>{formatCurrency(dataDetail.otherAllowance)}</Text>
                )}
              </Form.Item>
            </ColItem>
          </Row>
        </WrapperSection>
      </Space>
    </Form>
  );
};

StaffInfo.propTypes = {};

export default StaffInfo;

export const WrapperSection = ({ title, actions, children }) => (
  <div className="wraper-section-detail">
    <Row justify="space-between" align="center" style={{ alignItems: 'center' }}>
      <Title className="wraper-section-detail__title" level={5}>
        {title}
      </Title>
      {actions && actions}
    </Row>
    <div className="wraper-section-detail__content">{children}</div>
  </div>
);
