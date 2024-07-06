import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { DatePicker } from 'antd';
import { today } from 'utils/formatDate';

const RevenueYear = () => {
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
    {
      name: 'Hợp đồng',
      month: 'Tháng 1',
      amount: 90,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 2',
      amount: 90,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 3',
      amount: 30,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 4',
      amount: 500,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 5',
      amount: 400,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 6',
      amount: 550,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 7',
      amount: 65,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 8',
      amount: 150,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 9',
      amount: 150,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 10',
      amount: 150,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 11',
      amount: 150,
    },
    {
      name: 'Hợp đồng',
      month: 'Tháng 12',
      amount: 150,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'amount',
    seriesField: 'name',
    height: 200,
    // width: 260,
  };
  return (
    <>
      <div>
        <div className="title-chart">
          <h3>Thống kê doanh số theo năm</h3>
          <span>
            Năm:{' '}
            <DatePicker style={{ width: '80px' }} placeholder="" format={'YYYY'} defaultValue={today()} picker="year" />
          </span>
          &nbsp;&nbsp;<span>ĐVT: (triệu đồng)</span>
        </div>
        <Column {...config} />
      </div>
    </>
  );
};

export default RevenueYear;
