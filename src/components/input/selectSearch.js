import React, { useState } from 'react';

import Select from 'react-select';
import { Controller } from 'react-hook-form';
import './input.less';
import _ from 'lodash';
import { Input, Typography } from 'antd';

const SelectSearch = (props) => {
  let classErrors = props.className;
  const [values, setValues] = useState([])

  const renderErrorMessage = () => {
    if (props.errors) {
      let exists = Object.keys(props.errors).includes(props.name);
      let mesError = props.errors[props.name]?.message;
      classErrors = _.isEmpty(mesError) ? `${props.className} basic-single` : `${props.className} is-invalid`;

      if (exists) {
        return (
          <span className="error-message invalid-feedback">
            {props.errors[props.name]?.message} {props?.label?.toLowerCase()}
          </span>
        );
      }
    }
    return <></>;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: '#d9d9d9',
      minHeight: (props.isMulti && values?.length > 2) ? 'none' : '32px',
      height: (props.isMulti && values?.length > 2) ? 'none' : '32px',
      minWidth: '204px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: (props.isMulti && values?.length > 2) ? 'none' : '30.297px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: (props.isMulti && values?.length > 2) ? 'none' : '30px',
    }),
  };

  const renderLabel = () => (
    <>
      {props?.label !== '' && (
        <Typography.Text>
          {props.isRequired && !props.isShowText && <span className="is-required">* </span>}
          {`${props.label} :`}
        </Typography.Text>
      )}
    </>
  );

  const getValueByOption = (value) => {
    let result = ''
    if (!props.isMulti) {

      if (_.isEmpty(props?.options)) {
        result = ''
      } else {
        let option = props?.options.find((c) => c.value === value)
        result = option ? option : ''
      }
    }


    if (props.isMulti && value?.length > 0) {
      if (_.isEmpty(props?.options)) {
        result = []
      } else {
        let option = props.options.filter((c) => value.map(x => x.value).includes(c.value))
        result = option ? option : []
      }
    }

    return result

  }

  const renderInputOfText = (onChange, value, ref, name) => {
    setValues(value)
    if (props.isShowText) {
      return (
        <span className="ant-typography">
          <strong>
            {
              // have truong hop value la 0
              props.options && value ? props.options.find((x) => x.value == value)?.label : ''
            }
          </strong>
        </span>
      );
    }
    return (
      <Select
        isMulti={props.isMulti}
        name="colors"
        options={props?.options}
        className={`select-custom ${classErrors}`}
        styles={customStyles}
        defaultValue={props.defaultValue}
        placeholder=""
        isDisabled={props.isDisabled}
        value={getValueByOption(value)}
        onChange={(val) => {
          if (props.isMulti) {
            onChange(val);
            if (props.onChange) {
              props.onChange(val);
            }
          } else {
            onChange(val.value);
            if (props.onChange) {
              props.onChange(val.value);
            }
          }

        }}
      />
    );
  };

  const renderInput = () => (
    <>
      <div style={{ width: props.isTitleInline ? 'calc(100% - 150px)' : '100%' }}>
        <Controller
          control={props.control}
          id={props.id}
          name={props.name}
          defaultValue={props.defaultValue}
          render={({ field: { onChange, value, ref, name } }) => renderInputOfText(onChange, value, ref, name)}
        />

        <div className="ant-form-item-explain-error">{renderErrorMessage()}</div>
      </div>
    </>
  );
  const renderLayoutTitleInline = () => {
    if (props.isTitleInline) {
      return (
        <>
          <Input.Group compact>
            <div style={{ width: '150px' }}>{renderLabel()}</div>
            {renderInput()}
          </Input.Group>
        </>
      );
    }
    return (
      <>
        {renderLabel()}
        {renderInput()}
      </>
    );
  };

  return <div style={{ paddingBottom: '20px' }}>{renderLayoutTitleInline()}</div>;
};

export default SelectSearch;
