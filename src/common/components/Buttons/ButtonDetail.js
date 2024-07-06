import React from 'react';
import { NavLink } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import { BarsOutlined } from '@ant-design/icons';
import ButtonTooltip from './ButtonToolTip';

function ButtonDetail({ url, record }) {
  return (
    <div>
      <ButtonTooltip tip="Xem chi tiết">
        <NavLink to={`/${url}/${record.id}`}>
          <PrimaryButton icon={<BarsOutlined />} />
        </NavLink>
      </ButtonTooltip>
    </div >
  );
}

ButtonDetail.propTypes = {};

export default ButtonDetail;
