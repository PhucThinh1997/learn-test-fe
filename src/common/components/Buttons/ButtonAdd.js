import React from 'react';
import PrimaryButton from './PrimaryButton';
import { PlusCircleOutlined } from '@ant-design/icons';

function ButtonAdd({ title = 'Thêm mới', ...rest }) {
  return (
    <PrimaryButton icon={<PlusCircleOutlined />} {...rest}>
      {title}
    </PrimaryButton>
  );
}

ButtonAdd.propTypes = {};

export default ButtonAdd;
