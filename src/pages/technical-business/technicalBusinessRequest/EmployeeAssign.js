import React, { useEffect, useState } from 'react';
import { Table, Form, Input, InputNumber, Typography, Button, Row, Space } from 'antd';
import './EmployeeAssign.less';
import _ from 'lodash';
import ButtonTooltip from 'common/components/Buttons/ButtonToolTip';
import { PrimaryButton } from 'common/components/Buttons';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { listResultTask } from 'pages/dealers/enum';
import Status from 'common/components/status/Status';

const EmployeeAssign = ({ hideButton, originData = [], rowKey = 'id', handleChangeData, ...rest }) => {
  const [formInstance] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [isAdding, setAdding] = useState(false);

  useEffect(() => {
    setData(originData);
  }, [originData]);

  const isEditing = (index) => index === editingKey;

  const onDeleteRecord = (record, index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    handleChangeData && handleChangeData(newData);
  };

  const columns = [
    {
      title: 'Chịu trách nhiệm chính',
      dataIndex: 'nameEmpMain',
    },
    {
      title: 'Hổ trợ',
      dataIndex: 'empSupport',
      editable: false,
      render: (_, record, index) => {
        let empSupports = ''
        if (record.empSupport) {
          if (Array.isArray(record.empSupport)) {
            empSupports = record.empSupport.map(x => x.label).toString()
          }
        }
        return <p>{empSupports}</p>
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'contentAssign',
      editable: false
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      width: '130px',
      render: (_, record) => <Status text={listResultTask[record.state].label} keys={listResultTask[record.state].color} />,
    },
    {
      title: '',
      dataIndex: '',
      width: '60px',
      render: (_, record, index) => {
        return (
          <>
            {record.isDelete && (
              <Button
                type="danger"
                onClick={() => onDeleteRecord(record, index)}
                size="small"
              >
                <DeleteOutlined />
              </Button>
            )}

            {record.reject && (
              <div>
                <ButtonTooltip tip={record.reject}>
                  <PrimaryButton icon={<InfoCircleOutlined />}></PrimaryButton>
                </ButtonTooltip>
              </div>
            )}
          </>
        )
      },
    },
  ];
  let col = hideButton ? columns.slice(0, columns.length - 1) : columns
  const columnsWithEdit = col.map((col) => {
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
        dataSource={data.filter(x => !x.isDeleted)}
        columns={columnsWithEdit}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ y: 200 }}
        title={() => (
          <Row className="grid-paticipant__title" align="space-between" style={{ marginBottom: '8px' }}>
            Danh sách người nhận yêu cầu
          </Row>
        )}
        rowKey="id"
      />
    </Form>
  );
};

EmployeeAssign.propTypes = {};
export default EmployeeAssign;

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
