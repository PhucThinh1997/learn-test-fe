/*
 *
 * Locale Toggle
 *
 */

import React, { useContext } from 'react';
import { TimezoneContext } from 'context/Timezone';
import { Select } from 'antd';
/**
 * An select component contains localization supporting values
 * @param {object} props
 */
export function Timezone(props) {
  const { ...rest } = props;
  const context = useContext(TimezoneContext);
  const { timezone, changeTimezone } = context;
  return <Select onChange={(value) => changeTimezone(value)} value={timezone} {...rest}></Select>;
}

export default Timezone;
