import React from 'react';
import DefaultButton from './PrimaryButton';
import { StopOutlined } from '@ant-design/icons';

function ButtonCancel({ title = 'Thêm mới', ...rest }) {
  return (
    <DefaultButton icon={<StopOutlined />} {...rest}>
      {title}
    </DefaultButton>
  );
}

ButtonCancel.propTypes = {};

export default ButtonCancel;
