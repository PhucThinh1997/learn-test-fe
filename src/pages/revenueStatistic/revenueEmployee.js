import React, { useEffect, useState } from 'react';
import { DualAxes } from '@ant-design/plots';
import { DatePicker } from 'antd';
import { today } from 'utils/formatDate';
import { Line } from '@ant-design/charts';

const RevenueEmployee = () => {
  const data = [
    {
      name: 'Hóa đơn',
      month: 'Tháng 1',
      amount: 100,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 2',
      amount: 80,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 3',
      amount: 120,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 4',
      amount: 40,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 5',
      amount: 60,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 6',
      amount: 70,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 7',
      amount: 180,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 8',
      amount: 90,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 9',
      amount: 150,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 10',
      amount: 150,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 11',
      amount: 150,
    },
    {
      name: 'Hóa đơn',
      month: 'Tháng 12',
      amount: 150,
    },
  ];

  const config = {
    data,
    // width: 800,
    height: 200,
    autoFit: false,
    xField: 'month',
    yField: 'amount',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  return (
    <>
      <div>
        <div className="title-chart">
          <h3>Thống kê doanh số theo nhân viên</h3>
          <span>
            Nhân viên:{' '}
            <DatePicker style={{ width: '80px' }} placeholder="" format={'YYYY'} defaultValue={today()} picker="year" />
          </span>
          &nbsp;&nbsp;<span>ĐVT: (triệu đồng)</span>
        </div>
        <Line {...config} />
      </div>
    </>
  );
};

export default RevenueEmployee;
