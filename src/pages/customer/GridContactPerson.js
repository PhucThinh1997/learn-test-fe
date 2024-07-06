import React, { useEffect, useState } from 'react';
import { Table, Form, Input, InputNumber, Typography, Button, Row, Space, DatePicker, Select } from 'antd';
import { formatDDMMYYYY, today } from 'utils/formatDate';
import './GridContactPerson.less';
import { getDateFormat } from 'utils/formatDate';
import dayjs from 'dayjs';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

const GridContactPerson = ({ originData, rowKey = 'id', handleChangeData, ...rest }) => {
  const [formInstance] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [isAdding, setAdding] = useState(false);

  useEffect(() => {
    if (originData) {
      // let dataSource = originData.filter((x) => x.isDeleted == 'False')
      setData(originData);
    }
  }, [originData]);

  const isEditing = (index) => index === editingKey;

  const onEditRecord = (record, index) => {
    formInstance.setFieldsValue({
      ...record,
      dateOfBirth: getDateFormat(record?.dateOfBirth),
    });
    setEditingKey(index);
  };

  const onCancel = () => {
    if (isAdding) {
      setData((prev) => prev.slice(0, -1));
      setAdding(false);
    } else {
      setEditingKey('');
    }
  };

  const onSave = async (index, record) => {
    try {
      const row = await formInstance.validateFields();
      const newData = [...data];

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        setAdding(false);
        handleChangeData && handleChangeData(newData);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
        setAdding(false);
      }
      // eslint-disable-next-line no-empty
    } catch (a) {}
  };

  const handleAddRow = () => {
    const newData = {
      name: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      position: '',
      email: '',
      isDeleted: false,
      isNew: true,
    };
    setData([...data, newData]);
    setAdding(true);
    formInstance.setFieldsValue({ ...newData });
  };

  const onDeleteRecord = (record, index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);

    if (record.isNew) {
      handleChangeData && handleChangeData(newData);
    } else {
      let dataSource = _.clone(data);
      dataSource.forEach((x) => {
        if (x.id == record.id) {
          x.isDeleted = true;
        }
      });
      handleChangeData && handleChangeData(dataSource);
    }
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      inputType: 'datetime',
      editable: true,
      render: (_, record) => (
        <DatePicker
          disabled={true}
          defaultValue={dayjs('22/12/2023', formatDDMMYYYY)}
          format={formatDDMMYYYY}
          value={record.dateOfBirth}
          disabledDate={(current) => current && current > today()}
        />
      ),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      editable: true,
      inputType: 'option',
      render: (value) => <label> {options?.find((x) => x.value == value)?.label}</label>,
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      editable: true,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
      width: '250px',
    },
    {
      title: '',
      dataIndex: '',
      width: '100px',
      render: (_, record, index) => {
        const editable = isEditing(index) || (isAdding && index === data.length - 1);
        return editable ? (
          <Space>
            <Button
              type="primary"
              onClick={() => onSave(index, record)}
              size="small"
              icon={<CheckCircleOutlined />}
            ></Button>
            <Button type="danger" onClick={onCancel} size="small" icon={<StopOutlined />}></Button>
          </Space>
        ) : (
          <Space>
            <Button
              type="default"
              disabled={editingKey !== '' || isAdding}
              onClick={() => onEditRecord(record, index)}
              size="small"
              icon={<EditOutlined />}
            ></Button>
            <Button
              type="danger"
              onClick={() => onDeleteRecord(record, index)}
              disabled={editingKey !== '' || isAdding}
              size="small"
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const columnsWithEdit = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record, index) => ({
        index,
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(index),
        isAdding: isAdding,
        rowLength: data.length,
      }),
    };
  });

  return (
    <Form className="grid-paticipant" form={formInstance}>
      <Table
        size="small"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={columnsWithEdit}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ y: 200 }}
        title={() => (
          <Row className="grid-paticipant__title" align="space-between" style={{ marginBottom: '8px' }}>
            <Typography.Text>Người liên hệ</Typography.Text>
            <Button onClick={handleAddRow} type="primary" size="small">
              Thêm mới
            </Button>
          </Row>
        )}
        rowKey="id"
      />
    </Form>
  );
};

GridContactPerson.propTypes = {};
export default GridContactPerson;

const options = [
  { value: '1', label: 'Nam' },
  { value: '2', label: 'Nữ' },
];

const renderInput = (inputType, config) => {
  switch (inputType) {
    case 'number':
      return <InputNumber />;
    case 'datetime':
      return (
        <DatePicker
          defaultValue={dayjs('22/12/2023', formatDDMMYYYY)}
          format={formatDDMMYYYY}
          disabledDate={(current) => current && current > today()}
        />
      );
    case 'option':
      return (
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          // onChange={handleChange}
          options={config?.options || options}
        />
      );
    default:
      return <Input />;
  }
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  isAdding,
  rowLength,
  config,
  ...restProps
}) => {
  const inputNode = renderInput(inputType, config);

  return (
    <td {...restProps}>
      {editing || (isAdding && index === rowLength - 1) ? (
        <>
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Nhập ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        </>
      ) : (
        children
      )}
    </td>
  );
};
