import { Button, Form, message, Row, Spin, Typography, Menu, Dropdown } from 'antd';
import HeaderPage from 'pages/home/header-page';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SaveOutlined } from '@ant-design/icons';

import ButtonBack from 'common/components/Buttons/ButtonBack';
import PageWrapper from 'components/Layout/PageWrapper';
import Space from 'components/Space';
import StaffInfo from './components/StaffInfo';
import { DefaultButton, PrimaryButton } from 'common/components/Buttons';
import DegreeGrid from './components/Degree';
import CertificateGrid from './components/Certificate';
import { getDateFormat } from 'utils/formatDate';
import { SAVE_SUCCESS } from 'utils/common/messageContants';
import { getEmployeeById, createEmployee } from 'services/employee';
import './styles.less';
import _ from 'lodash'
import { PER } from 'common/enum';
import { isAccessed } from 'utils/utils';

const { Title } = Typography;

const DetailStaff = () => {
  let { id } = useParams();
  const [dataDetail, setDataDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = Form.useForm();
  const [degrees, setDegrees] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const getDataDetail = useCallback(async () => {
    setLoading(true);
    let result = await getEmployeeById(id);
    if (result.isSuccess) {
      setDataDetail(result.data);
      setDegrees(result.data?.degrees);
      setCertificates(result.data.certificates);
      form.setFieldsValue({ ...result.data, dateOfBirth: getDateFormat(result?.data?.dateOfBirth) });
    }

    setLoading(false);
  }, [form, id]);

  useEffect(() => {
    if (id) {
      getDataDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onUpdate = async (payload) => {
    const result = await createEmployee({ ...payload, id: dataDetail?.id });
    if (result.isSuccess) {
      message.success(SAVE_SUCCESS);
      getDataDetail();
      setIsUpdate(false);
    } else {
      // form.resetFields();
      message.error(result.errors);
    }
  }

  const handleUpdateEmployee = async () => {
    const row = await form.validateFields()

    if (_.isEmpty(row.dateOfBirth))
      row.dateOfBirth = null

    const payload = { ...row, 'degrees': degrees, 'certificates': certificates }
    const result = await onUpdate(payload)
  };

  const onFinish = (e) => {
    e.preventDefault()
    if (id) {
      handleUpdateEmployee();
    }
  };

  const actions = () => (
    <Space>
      <ButtonBack url="/quan-ly-nhan-vien" />
    </Space>
  );

  const ActionsDetail = () => (
    <Space>
      {isUpdate ? (
        <>
          <DefaultButton size="medium" onClick={() => setIsUpdate(!isUpdate)}>
            Hủy
          </DefaultButton>
          <Button
            size="medium"
            type="primary"
            key="submit"
            htmlType="submit"
            form="staff-info"
            icon={<SaveOutlined />}
            onClick={(values) => handleUpdateEmployee(values)}
          >
            Lưu
          </Button>
        </>
      ) : (
        <PrimaryButton disabled={!isAccessed(PER.NHAN_VIEN_SUA)} size="medium" onClick={() => setIsUpdate(!isUpdate)}>
          Chỉnh sửa
        </PrimaryButton>
      )}
    </Space>
  );

  return (
    <>
      <HeaderPage title="CHI TIẾT NHÂN VIÊN " actions={actions} />
      <div className="main__application">
        <Space direction="vertical" size="large" fullWidth>
          <PageWrapper>
            <Spin spinning={loading}>
              <WrapperSection actions={<ActionsDetail />}>
                <StaffInfo
                  onFinish={onFinish}
                  dataDetail={dataDetail}
                  type="isUpdate"
                  isUpdate={isUpdate}
                  form={form}
                />
              </WrapperSection>
              <Space direction="vertical" size={36} fullWidth>
                <DegreeGrid
                  data={degrees || []}
                  employeeId={dataDetail?.id}
                  getDataDetail={getDataDetail}
                  isUpdate={isUpdate}
                  setDegrees={setDegrees}
                />
                <CertificateGrid
                  data={certificates || []}
                  employeeId={dataDetail?.id}
                  getDataDetail={getDataDetail}
                  isUpdate={isUpdate}
                  setCertificates={setCertificates}
                />
              </Space>
            </Spin>
          </PageWrapper>
        </Space>
      </div>
    </>
  );
};

DetailStaff.propTypes = {};

export default DetailStaff;

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
