import React, { useEffect, useState } from 'react';
import { Table, Form, Input, InputNumber, Typography, Button, Row, Space } from 'antd';
import './TableProduct.less';
import { formatCurrency } from '../../../utils/format';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

const TableProduct = ({ originData = [], rowKey = 'id', handleChangeData, ...rest }) => {
  const [formInstance] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [isAdding, setAdding] = useState(false);

  useEffect(() => {
    setData(originData);
  }, [originData]);

  const isEditing = (index) => index === editingKey;

  const onEditRecord = (record, index) => {
    formInstance.setFieldsValue({
      ...record,
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
      let newData = [...data];
      if (index > -1) {
        const item = newData[index];
        item.id = _.uniqueId('id_');
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
      id: _.uniqueId('id_'),
      name: '',
      deviceTechnicalFeature: '',
      quantity: '',
      unitPrice: '',
      position: '',
      email: '',
    };
    setData([...data, newData]);
    setAdding(true);
    formInstance.setFieldsValue({ ...newData });
  };

  const onDeleteRecord = (record, index) => {
    const newData = [...data];
    // newData.splice(index, 1);

    newData.forEach((x) => {
      if (x.id === record.id) {
        x.isDeleted = true;
      }
    });
    setData(newData);
    handleChangeData && handleChangeData(newData);
  };

  const columns = [
    // {
    //   title: 'Tên thiết bị và tính năng kỷ thuật',
    //   dataIndex: 'deviceTechnicalFeature',
    //   editable: true,
    // },
    {
      title: 'Tên thiết bị và tính năng kỷ thuật',
      dataIndex: 'deviceTechnicalFeature',
      width: '40%',
      render: (_, values, index) => {
        const editable = isEditing(index) || (isAdding && index === data.length - 1);
        return (
          <>
            {editable && (
              <Input.TextArea
                defaultValue={values?.deviceTechnicalFeature}
                onChange={(e) => {
                  values.deviceTechnicalFeature = e.target.value;
                }}
              />
            )}

            {!editable && (
              <label>
                <span style={{ whiteSpace: 'pre-line' }}>{values?.deviceTechnicalFeature}</span>
              </label>
            )}
          </>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      editable: true,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      editable: true,
      render: (_, values) => formatCurrency(values.unitPrice),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'chucVu',
      render: (_, record, index) => (
        <Typography.Text> {formatCurrency(record.quantity * record.unitPrice)} </Typography.Text>
      ),
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
        inputType: 'text',
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
        dataSource={data.filter((x) => !x.isDeleted)}
        columns={columnsWithEdit}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ y: 200 }}
        title={() => (
          <Row className="grid-paticipant__title" align="space-between" style={{ marginBottom: '8px' }}>
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

TableProduct.propTypes = {};
export default TableProduct;

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
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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
