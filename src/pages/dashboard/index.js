import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/global/actions';
import { SEARCH_CRITERIA } from 'static/Constants';
import backgroundImage from '../../assets/CRM-system.jpg';

const option = {};
const searchCriteria = SEARCH_CRITERIA.ALL;

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.changeRibbonActions(option));
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.updateSearchCriteria(searchCriteria));
  }, [dispatch]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: `no-repeat`,
        backgroundAttachment: `fixed`,
        backgroundSize: `cover`,
        height: `calc(100vh - 115px)`,
      }}
    ></div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
