import { Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext } from 'react';
import { TechnicalBusinessManageContext } from '../context/technicalBusinessManage';
import { TechnicalBusinessRequestComponon } from '../technicalBusinessRequest/technicalBusinessRequestPopup';

const TechnicalBusinessManagePopup = () => {
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
  } = useContext(TechnicalBusinessManageContext);

  return (
    <>
      <Modal
        title={'Yêu cầu Khách hàng'}
        open={isOpen}
        form={form}
        width={1200}
        onCancel={() => handleClosePopup()}
        footer={''}
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

export default TechnicalBusinessManagePopup;
