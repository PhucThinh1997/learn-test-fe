import React, { useState } from 'react';
import { formatCurrency, formatCurrencyInput } from 'utils/format';
import { Input, Form } from 'antd';
import _ from 'lodash';
import FormItem from 'antd/es/form/FormItem';

const InputMoney = (props) => {
  const [value, setValue] = useState(props.value);
  const { form , name} = props
  const formatValue = (value) => {
    if (value) {
      return formatCurrency(value).replace('₫', '').trim();
    }
    return 0;
  };

  const onChangeValue = (value) => {
    const convertValue = formatCurrencyInput(value.target.value);
    if (!_.isNaN(convertValue)) {
      setValue(convertValue);
      form.setFieldValue(name, convertValue);
    }
  };

  return (
    <>
      <Input type="text" value={formatValue(value)} style={{ width: '100%' }} onChange={onChangeValue}></Input>
    </>
  );
};

export default InputMoney;
