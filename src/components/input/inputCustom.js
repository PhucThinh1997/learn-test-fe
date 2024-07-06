import * as React from 'react';
import { Controller } from 'react-hook-form';
import './input.less';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import { DatePicker, Form, Input, Typography } from 'antd';
import moment from 'moment';
import { formatDDMMYYYY, today } from 'utils/formatDate';
import { formatCurrency } from 'utils/format';

const { TextArea } = Input;

const InputCustom = (props) => {
  let classErrors = props.className;
  const renderErrorMessage = () => {
    if (props.errors) {
      let exists = Object.keys(props.errors).includes(props.name);

      let mesError = props.errors[props.name]?.message;
      classErrors = _.isEmpty(mesError) ? props.className : `${props.className} is-invalid`;

      if (exists) {
        return <span className="error-message invalid-feedback">{props.errors[props.name]?.message} {props?.label?.toLowerCase()}</span>;
      }
    }
    return <></>;
  };

  const renderLabel = () => {
    return (
      <>
        {props?.label !== '' && (
          <Typography.Text>
            {props.isRequired && !props.isShowText && <span className="is-required" >* </span>}
            {`${props.label} :`}
          </Typography.Text>
        )}
      </>
    );
  };

  const renderContentDetailMode = (value) => {
    if (!value) return ""
    if (props.formatInput) {
      return formatCurrency(value)
    }
    if (props.type === "date") {
      return formatDDMMYYYY(value)
    }
    return value
  }

  const renderInputChild = (field) => {
    if (props.isShowText) {
      return <p className='text-mode-detail'>{renderContentDetailMode(field?.value)}</p>
    }
    if (props.formatInput) {
      return (
        <NumberFormat
          customInput={Input}
          className={`${classErrors}`}
          {...props}
          prefix={props.prefix}
          defaultValue={field.value}
          thousandSeparator={'.'}
          decimalSeparator={','}
          value={field.value}
          onValueChange={(values) => {
            field.onChange(values.value);
          }}
        />
      );
    }
    if (props.type === 'textarea') {
      return (
        <TextArea
          disabled={props.disabled}
          label={props.label}
          type={props.type}
          className={classErrors}
          {...props}
          {...field}
          defaultValue={field.value}
          value={field.value}
          onChange={(e) => {
            field.onChange(e.target.value);
            if (props?.onChange !== undefined) {
              props.onChange(e);
            }
          }}
        />
      );
    }
    if (props.type === 'date') {
      return (
        // <DatePicker placeholder="Chọn ngày" format={formatDDMMYYYY} defaultValue={today()} />
        <DatePicker
          format={formatDDMMYYYY}
          disabled={props.disabled}
          className={`input-custom ${classErrors}`}
          placeholder=''
          {...props}
          {...field}
          defaultValue={today()}
          value={field.value !== "" ? moment(field.value) : today()}
          onChange={(date, dateString) => {
            field.onChange(date);
            if (props?.onChange !== undefined) {
              props.onChange(date);
            }
          }
          }
        />
      );
    }

    return (
      <Input
        disabled={props.disabled}
        label={props.label}
        type={props.type}
        className={`input-custom ${classErrors}`}
        {...props}
        {...field}
        defaultValue={field.value}
        value={field.value}
        onChange={(e) => {
          field.onChange(e.target.value);
          if (props?.onChange !== undefined) {
            props.onChange(e);
          }
        }}
      />
    );
  };

  const renderInput = () => {
    return (
      <>
        <Form.Item style={{ width: props.isTitleInline ? 'calc(100% - 150px)' : '100%' }}>
          <Controller
            id={props.id}
            name={props.name}
            defaultValue={props.defaultValue}
            control={props.control}
            render={({ field }) => renderInputChild(field)}
          />
          <div className='ant-form-item-explain-error'>{renderErrorMessage()}</div>
          {/* <div className="ant-form-item-explain-error" style="">{renderErrorMessage()}</div> */}
        </Form.Item>
      </>
    );
  };

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
        {/* {renderErrorMessage()} */}
      </>
    );
  };

  return <>{renderLayoutTitleInline()}</>;
};

export default InputCustom;
