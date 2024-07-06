import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/global/actions';
import HeaderPage from 'pages/home/header-page';
import PageWrapper from 'components/Layout/PageWrapper';
import { SEARCH_CRITERIA } from 'static/Constants';
import './revenueStatistic.less';
import RevenueYear from './revenueYear';
import RevenueEmployee from './revenueEmployee';
import RevenueQuarter from './revenueQuarter';
import Revenue5Years from './revenue5Years';
import { isAccessed } from 'utils/utils';
import { PER } from 'common/enum';

const option = {};
const searchCriteria = SEARCH_CRITERIA.ALL;

const RevenueStatistic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.changeRibbonActions(option));
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.updateSearchCriteria(searchCriteria));
  }, [dispatch]);

  return (
    <div id="invoice-page">

      {isAccessed(PER.BAO_CAO_THONG_KE) && (
        <div>
          <HeaderPage title="THỐNG KÊ VÀ DOANH THU" actions="" />
          <div className="main__application">
            <PageWrapper className={`page-chart`}>
              <div className="revenue-statistic-chart">
                <div className="chart-item">
                  <RevenueYear />
                </div>
                <div className="chart-item">
                  <RevenueEmployee />
                </div>
                <div className="chart-item">
                  <RevenueQuarter />
                </div>
                <div className="chart-item">
                  <Revenue5Years />
                </div>
              </div>
            </PageWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

RevenueStatistic.propTypes = {};

export default RevenueStatistic;
