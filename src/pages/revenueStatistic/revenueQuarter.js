import React, { useEffect, useState } from 'react';
import { Pie, G2 } from '@ant-design/plots';
import { DatePicker } from 'antd';
import { today } from 'utils/formatDate';

const RevenueQuarter = () => {
  const G = G2.getEngine('canvas');
  const data = [
    {
      type: 'Quý 1',
      value: 100,
    },
    {
      type: 'Quý 2',
      value: 200,
    },
    {
      type: 'Quý 3',
      value: 300,
    },
    {
      type: 'Quý 4',
      value: 100,
    },
  ];
  const cfg = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}tr ${(data.percent * 100).toFixed(2)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    height: 200,
  };
  const config = cfg;

  return (
    <>
      <div>
        <div className="title-chart">
          <h3>Thống kê doanh số theo quý</h3>
          <span>
            Năm:{' '}
            <DatePicker style={{ width: '80px' }} placeholder="" format={'YYYY'} defaultValue={today()} picker="year" />
          </span>
          &nbsp;&nbsp;<span>ĐVT: (triệu đồng)</span>
        </div>
        <Pie {...config} />
      </div>
    </>
  );
};

export default RevenueQuarter;
