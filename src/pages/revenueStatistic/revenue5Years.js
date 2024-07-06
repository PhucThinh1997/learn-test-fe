import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { DatePicker } from 'antd';
import { today } from 'utils/formatDate';

const Revenue5Years = () => {
  const data = [
    {
      city: '2019',
      type: 'Quí 1',
      value: 14500,
    },
    {
      city: '2019',
      type: 'Quí 2',
      value: 8500,
    },
    {
      city: '2019',
      type: 'Quí 3',
      value: 10000,
    },
    {
      city: '2019',
      type: 'Quí 4',
      value: 7000,
    },
    {
      city: '2020',
      type: 'Quí 1',
      value: 9000,
    },
    {
      city: '2020',
      type: 'Quí 2',
      value: 8500,
    },
    {
      city: '2020',
      type: 'Quí 3',
      value: 11000,
    },
    {
      city: '2020',
      type: 'Quí 4',
      value: 6000,
    },
    {
      city: '2021',
      type: 'Quí 1',
      value: 16000,
    },
    {
      city: '2021',
      type: 'Quí 2',
      value: 5000,
    },
    {
      city: '2021',
      type: 'Quí 3',
      value: 6000,
    },
    {
      city: '2021',
      type: 'Quí 4',
      value: 10000,
    },
    {
      city: '2022',
      type: 'Quí 1',
      value: 16000,
    },
    {
      city: '2022',
      type: 'Quí 2',
      value: 5000,
    },
    {
      city: '2022',
      type: 'Quí 3',
      value: 6000,
    },
    {
      city: '2022',
      type: 'Quí 4',
      value: 10000,
    },
  ];
  const config = {
    data,
    xField: 'city',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    height: 200,
  };

  return (
    <>
      <div>
        <div className="title-chart">
          <h3>Thống kê doanh 5 năm gần nhất</h3>
          &nbsp;&nbsp;<span>ĐVT: (triệu đồng)</span>
        </div>
        <Column {...config} />
      </div>
    </>
  );
};

export default Revenue5Years;
