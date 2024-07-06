import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/global/actions';
import ImplementResult from 'common/components/result/Implement';
import { SEARCH_CRITERIA } from 'static/Constants';

const option = {};
const searchCriteria = SEARCH_CRITERIA.ALL;

const Marketing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.changeRibbonActions(option));
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.updateSearchCriteria(searchCriteria));
  }, [dispatch]);

  return (
    <div>
      <ImplementResult module="Quản lý marketing" />
    </div>
  );
};

Marketing.propTypes = {};

export default Marketing;
