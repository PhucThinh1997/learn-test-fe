/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Form, Input, message } from 'antd';
import _ from 'lodash';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './change-pass.less'
import { changePassword } from 'services/user/user.service';
import { SAVE_SUCCESS } from 'utils/common/messageContants';

const ChangePasswordPopup = (props) => {
  const { isOpen, onClose, changePassSuccess } = props;
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [errMessage, setErrMessage] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    // You can perform further actions with the form values here
    const req = {
      username: userInfo.userName,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    }

    changePassword(req).then(res => {
      if (res.errors && res.errors.length > 0) {
        setErrMessage("Mật khẩu cũ không đúng!")
        return
      }
      if (res.data.errors && res.data.errors.length > 0) {
        const code = res.data.errors[0].code
        switch (code) {
          case "PasswordTooShort":
            setErrMessage("Mật khẩu phải có ít nhất 6 ký tự!")
            break;

          default:
            setErrMessage("Có lỗi khi đổi mật khẩu")
            break;
        }
      }

      if (res.data.succeeded === true) {
        changePassSuccess();
      }
    })
  };

  const handleCancel = () => {
    onClose();
  };

  const getTitle = () => {
    return "Thay đổi mật khẩu";
  };

  const hideMessageError = () => {
    if (errMessage !== '') {
      setErrMessage('')
    }
  }


  return (
    <Modal
      title={getTitle()}
      open={isOpen}
      form={form}
      width={500}
      onCancel={handleCancel}
      className="change-pass"
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu cũ',
            },
          ]}
        >
          <Input.Password onChange={() => hideMessageError()} />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu mới',
            },
          ]}
        >
          <Input.Password
            onChange={() => hideMessageError()}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            visibilityToggle
          />
        </Form.Item>
        <Form.Item
          name="reNewPassword"
          label="Xác thực mật khẩu mới"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập xác thực mật khẩu mới',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Mật khẩu không khớp')
                );
              },
            }),
          ]}
        >
          <Input.Password onChange={() => hideMessageError()} />
        </Form.Item>
        <span className='errMessage'>{errMessage}</span>
        <div className="my-modal-footer">
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>
          <Button key="submit" type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

ChangePasswordPopup.propTypes = {};
export default ChangePasswordPopup;
