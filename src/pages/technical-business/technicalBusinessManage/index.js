import React from 'react';
import { TechnicalBusinessManageProvider } from '../context/technicalBusinessManage';
import TechnicalBusinessManage from './technicalBusinessManage';

const TechnicalBusinessManageIndex = () => {
  return (
    <div>
      <TechnicalBusinessManageProvider>
        <TechnicalBusinessManage />
      </TechnicalBusinessManageProvider>
    </div>
  );
};

export default TechnicalBusinessManageIndex;
