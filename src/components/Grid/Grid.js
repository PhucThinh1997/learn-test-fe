import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'classnames';
import { isArray } from 'lodash';

import * as api from 'config/axios';
import * as actions from 'redux/global/actions';
import reducer from './controllers/reducer';
// import saga from './controllers/saga';
import * as gridViewActions from './controllers/actions';
import { useInjectReducer } from 'utils/common/injectedReducers';
// import { useInjectSaga } from 'utils/common/injectSaga';
import { useTable, withTable } from 'hooks/useTable';

import './Grid.less';
import { formatCurrency } from 'utils/format';

const key = 'tableView';

const Grid = ({
  className = '',
  columns,
  data,
  expandedRowRender,
  handleGetDetailSelections,
  handleGetSelections,
  hasRowSelected = true,
  isHidePagination,
  rowKey = 'id',
  shouldSaveToStore = true,
  shouldShowTotal = true,
  urlEndpoint,
  pageSize,
  ...rest
}) => {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.global.searchText);
  const readGrid = useSelector((state) => state.global.refreshGrid);
  const filters = useSelector((state) => state.global.filters);

  const [idsSelection, setIdsSelection] = useState([]);
  const { state, setState, setLoading, setData } = useTable();
  const [totalAmount, setTotalAmount] = useState('');

  const resetState = () => {
    dispatch(actions.refreshGrid(false));
  };

  const getSortItem = (sort) => {
    let sorted = [];
    sort.map((item) => {
      if (item?.field) {
        sorted.push({
          fieldName: item.field,
          isAscending: item.order === 'ascend',
        });
      }
    });

    return sorted;
  };

  const fetchData = useCallback(() => {
    if (!urlEndpoint) return;
    setLoading(true);

    const params = {
      pageSize: state.pageSize,
      pageIndex: state.currentPage - 1,
      searchText: state.searchText,
      sort: getSortItem(state.sort),
      fieldId: filters?.fields,
      filter: [],
    };

    api
      .sendGet(urlEndpoint, params)
      .then((results) => {
        if (results && results?.isSuccess) {
          const data = results?.data || {};
          setState({
            data: data?.records,
            currentPage: params?.pageIndex || 1,
            totalElement: data?.total || 0,
            loading: false,
          });
          setTotalAmount(results?.data?.totalAmount);
        } else {
          setState({
            data: [],
            totalElement: 0,
          });
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('err: ', err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageSize, state.sort, state.searchText, urlEndpoint, filters?.fields]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

  useEffect(() => {
    console.log('filtersfilters', filters);
  }, [filters]);

  useEffect(() => {
    if (urlEndpoint) {
      setState({
        searchText: searchText,
        currentPage: 1,
      });
    }
  }, [searchText, setState, urlEndpoint]);

  useEffect(() => {
    if (readGrid) {
      fetchData();
      resetState();
    }

    return () => {
      setIdsSelection([]);
      dispatch(gridViewActions.setItemIdSelections([]));
      dispatch(gridViewActions.setItemDetailSelections([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readGrid]);

  useEffect(() => {
    if (data && isArray(data)) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  const onChange = (pagination, filters, sorter) => {
    setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      sort: sorter ? [sorter] : [],
    });
  };

  const rowSelection = {
    selectedRowKeys: idsSelection,
    onChange: (selectedRowKeys, selectedRows) => {
      setIdsSelection(selectedRowKeys);
      // handleCallback
      handleGetSelections && handleGetSelections(selectedRowKeys);
      handleGetDetailSelections && handleGetDetailSelections(selectedRows);

      // save to redux gridView
      if (shouldSaveToStore) {
        dispatch(gridViewActions.setItemIdSelections(selectedRowKeys));
        dispatch(gridViewActions.setItemDetailSelections(selectedRows));
      }
    },
  };

  const summary = () => (
    <Table.Summary.Row>
      {columns.map((x, index) => (
        <>
          <Table.Summary.Cell>{index === rest?.summaryNumberCol ? formatCurrency(totalAmount) : ''}</Table.Summary.Cell>
        </>
      ))}
      <Table.Summary.Cell></Table.Summary.Cell>
    </Table.Summary.Row>
  );

  return (
    <div className={clsx('grid', className && className)}>
      <Table
        columns={columns}
        dataSource={state.data}
        onChange={onChange}
        bordered
        pagination={
          isHidePagination
            ? false
            : {
              defaultPageSize: pageSize ? pageSize : state.pageSize,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50'],
              total: state.totalElement,
              showTotal: shouldShowTotal ? () => `Có ${state.totalElement} dữ liệu` : null,
            }
        }
        loading={state.loading}
        expandable={{
          expandedRowRender,
        }}
        rowKey={rowKey}
        rowSelection={hasRowSelected ? rowSelection : null}
        scroll={{ x: '100%' }}
        {...rest}
        summary={(state.data.length > 0 && !!rest.summaryNumberCol) ? summary : () => { }}
      />
    </div>
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  expandedRowRender: PropTypes.any,
  handleGetDetailSelections: PropTypes.func,
  handleGetSelections: PropTypes.func,
  hasRowSelected: PropTypes.bool,
  isHidePagination: PropTypes.bool,
  rowKey: PropTypes.string,
  shouldSaveToStore: PropTypes.bool,
  shouldShowTotal: PropTypes.bool,
  urlEndpoint: PropTypes.oneOfType([PropTypes.string]),
};

export default withTable(Grid);
