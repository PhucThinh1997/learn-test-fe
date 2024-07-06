import React from 'react';
import { Modal } from 'antd';
import './style.less';

const ModalFullScreen = (props) => {
  const { title, open, onCancel, children, footer } = props;
  return (
    <Modal className={'modal-fullscreen'} title={title} footer={footer} open={open} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

ModalFullScreen.propTypes = {};

export default ModalFullScreen;
