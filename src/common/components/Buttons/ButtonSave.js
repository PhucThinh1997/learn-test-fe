import React from 'react';
import PrimaryButton from './PrimaryButton';
import { SaveOutlined } from '@ant-design/icons';

function ButtonSave({ title = 'Thêm mới', ...rest }) {
  return (
    <PrimaryButton icon={<SaveOutlined />} {...rest}>
      {title}
    </PrimaryButton>
  );
}

ButtonSave.propTypes = {};

export default ButtonSave;
