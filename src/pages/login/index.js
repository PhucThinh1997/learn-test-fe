import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { useInjectReducer } from 'utils/common/injectedReducers';
import { useInjectSaga } from 'utils/common/injectSaga';
import saga from './controllers/saga';
import * as actions from './controllers/actions';
import globalReducer from 'redux/global/reducer';
import './style.less';
import Loading from 'components/Loading/Loading';
import { Indicator } from 'common/components';

const { Item } = Form;
const { Password } = Input;
const { Title, Paragraph } = Typography;
const key = 'user';

const LogIn = (props) => {
  const { setRegisterShow } = props;
  // const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.global.user);
  const error = useSelector((state) => state.global.error);
  const loading = useSelector((state) => state.global.loading);
  const modeVerify = useSelector((state) => state.global.modeVerify);
  const [infoLoginSavedSuccess, setInfoLoginSavedSuccess] = useState(null);

  useInjectReducer({ key, reducer: globalReducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // setLoading(false);
    }
  }, [user]);

  const onFinish = async (values) => {
    if (values.code) {
      if (infoLoginSavedSuccess) {
        infoLoginSavedSuccess.twoFactorCode = values.code
      }

      // xac thuc
      dispatch(actions.verifyOtp(infoLoginSavedSuccess));
    } else {
      //login
      const user = {
        username: values.username,
        password: values.password,
      };
      setInfoLoginSavedSuccess(user)
      dispatch(actions.login(user));
    }
  };

  const renderFormByMode = () => {
    if (!modeVerify) {
      return (
        <div>
          <h3 >Đăng nhập hệ thống</h3>
          <Item
            name="username"
            rules={[
              {
                type: 'username',
                message: 'Username',
              },
              {
                required: true,
                message: 'Vui lòng nhập tài khoản',
              },
            ]}
          >
            <Input placeholder="Nhập tài khoản" />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          >
            <Password placeholder="Nhập mật khẩu" />
          </Item>
        </div>
      )
    }

    return (
      <div>
        <h2 >Xác Thực OTP</h2>
        <h4 >Mã xác thực được gửi đến email của bạn. Nhập mã để tiếp tục</h4>
        <Item
          name="code"
          rules={[
            {
              type: 'code',
              message: 'code',
            },
            {
              required: true,
              message: 'Vui lòng nhập mã code',
            },
          ]}
        >
          <Input placeholder="Nhập mã code" />
        </Item>
      </div>
    )
  }

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <div className="logo-text"> CRM SYSTEM </div>
          <div className="logo-text-footer"> Hệ thống quản lý quan hệ khách hàng </div>
        </Col>
      </Row>
      <Row>
        <Col span={14} offset={1} >
          <div className="login-page"> </div>
        </Col>
        <Col span={7} offset={1}>
          <Form name="register-form" onFinish={onFinish}>
            <div className="swapper-login">
              <Row >

                <Col span={24} >
                  {renderFormByMode()}
                  <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                    {modeVerify ? 'Xác thực' : 'Đăng nhập'}
                  </Button>
                  {error && <Paragraph className="error-message">{error}</Paragraph>}
                  {/* {isLoading && <Loading />} */}
                </Col>
              </Row>
              <Row >
              </Row>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
};

export default LogIn;
