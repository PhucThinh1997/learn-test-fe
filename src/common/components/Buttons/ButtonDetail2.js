import React from 'react';
import { BarsOutlined } from '@ant-design/icons';
import PrimaryButton from './PrimaryButton';
import ButtonTooltip from './ButtonToolTip';

function ButtonDetail2({ title = 'Chi tiết', ...rest }) {
  return (
    <ButtonTooltip tip={title}>
      <PrimaryButton icon={<BarsOutlined />} {...rest} />
    </ButtonTooltip>
  );
}

ButtonDetail2.propTypes = {};

export default ButtonDetail2;
