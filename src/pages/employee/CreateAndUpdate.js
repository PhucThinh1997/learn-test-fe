/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal, message } from 'antd';
import { createEmployee, updateEmployee } from 'services/employee/index';
import { SAVE_SUCCESS } from 'utils/common/messageContants';
import StaffInfo from './components/StaffInfo';

const CreateAndUpdate = (props) => {
  const { isOpen, ID, onClose, title, form, reloadTable } = props;

  // const [phongBan, setPhongBan] = useState([]);
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  // useEffect(() => {
  //   handlePhongBan();
  // }, []);

  // const handlePhongBan = async () => {
  //   const result = await getAllPhongBan();
  //   if (result.isSuccess) {
  //     setPhongBan(result.data.phongBanNames);
  //   }
  // };

  const handleReload = () => {
    handleCancel();
    reloadTable();
  };

  const onFinish = (values) => {
    if (ID) {
      handleUpdateNhanVien(values);
    } else {
      handleCreateNhanVien(values);
    }
  };

  const handleCreateNhanVien = async (values) => {
    const result = await createEmployee(values);
    if (result.isSuccess) {
      handleReload();
      message.success(SAVE_SUCCESS);
      form.resetFields();
    } else {
      message.error(result.errors);
    }
  };

  const handleUpdateNhanVien = async (values) => {
    const result = await updateEmployee(values);
    if (result.isSuccess) {
      handleReload();
      message.success(SAVE_SUCCESS);
    } else {
      handleReload();
      form.resetFields();
      message.error(result.errors);
    }
  };

  return (
    <>
      <Modal
        title={title}
        open={isOpen}
        form={form}
        width={1200}
        onCancel={handleCancel}
        footer={[
          <Button form="staff-info" key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button form="staff-info" key="submit" type="primary" htmlType="submit">
            Lưu
          </Button>,
        ]}
      >
        <StaffInfo dataDetail={{}} onFinish={onFinish} type="isCreate" isUpdate={true} form={form} />
      </Modal>
    </>
  );
};

CreateAndUpdate.propTypes = {};
export default CreateAndUpdate;
