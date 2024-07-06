import React from 'react';
import DangerButton from './DangerButton';
import { DeleteOutlined } from '@ant-design/icons';

function ButtonDelete({ title = '', ...rest }) {
  return (
    <DangerButton icon={<DeleteOutlined />} {...rest}>
      {title}
    </DangerButton>
  );
}

ButtonDelete.propTypes = {};

export default ButtonDelete;
