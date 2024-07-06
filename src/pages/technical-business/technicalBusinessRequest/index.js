import React from 'react';
import { TechnicalBusinessRequestProvider } from '../context/technicalBusinessRequest';
import TechnicalBusinessRequest from './technicalBusinessRequest';

const TechnicalBusinessRequestIndex = () => {
  return (
    <div>
      <TechnicalBusinessRequestProvider>
        <TechnicalBusinessRequest />
      </TechnicalBusinessRequestProvider>
    </div>
  );
};

export default TechnicalBusinessRequestIndex;
