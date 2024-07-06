import React, { useContext, useReducer, useCallback } from 'react';

const ActionKind = {
  SET_STATE: 'SET_STATE',
  SET_DATA: 'SET_DATA',
  SET_PAGE: 'SET_PAGE',
  SET_TOTAL_PAGE: 'SET_TOTAL_PAGE',
  SET_TOTAL_ELEMENT: 'SET_TOTAL_ELEMENT',
  SET_LOADING: 'SET_LOADING',
  SET_PAGESIZE: 'SET_PAGESIZE',
  SET_SORT: 'SET_SORT',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
};

export const initialState = {
  data: [],
  currentPage: 1,
  totalPage: 1,
  totalElement: 0,
  pageSize: 10,
  loading: false,
  searchText: '',
  sort: [
    {
      field: '',
      order: '',
    },
  ],
};

const store = React.createContext({
  state: initialState,
  setState: () => null,
  setPage: () => null,
  setTotalPage: () => null,
  setData: () => null,
  setTotalElement: () => null,
  setLoading: () => null,
  setPageSize: () => null,
});

const { Provider } = store;

const TableProvider = ({ children, initState }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case ActionKind.SET_STATE:
          return {
            ...state,
            ...action.payload,
          };
        case ActionKind.SET_DATA:
          return {
            ...state,
            data: action.payload.data,
          };
        case ActionKind.SET_PAGE:
          return {
            ...state,
            currentPage: action.payload.currentPage,
          };
        case ActionKind.SET_TOTAL_PAGE:
          return {
            ...state,
            totalPage: action.payload.totalPage,
          };
        case ActionKind.SET_TOTAL_ELEMENT:
          return {
            ...state,
            totalElement: action.payload.totalElement,
          };
        case ActionKind.SET_LOADING:
          return {
            ...state,
            loading: action.payload.loading,
          };
        case ActionKind.SET_PAGESIZE:
          return {
            ...state,
            pageSize: action.payload.pageSize,
          };
        case ActionKind.SET_SEARCH_TEXT:
          return {
            ...state,
            searchText: action.payload.searchText,
          };
        case ActionKind.SET_SORT:
          return {
            ...state,
            sort: action.payload.sort,
          };
        default:
          return { ...state };
      }
    },
    { ...initialState, ...initState },
  );

  const setState = useCallback((state) => {
    dispatch({
      type: ActionKind.SET_STATE,
      payload: state,
    });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({
      type: ActionKind.SET_PAGE,
      payload: {
        currentPage: page,
      },
    });
  }, []);

  const setData = useCallback((data) => {
    dispatch({
      type: ActionKind.SET_DATA,
      payload: {
        data: data,
      },
    });
  }, []);

  const setTotalPage = useCallback((total) => {
    dispatch({
      type: ActionKind.SET_TOTAL_PAGE,
      payload: {
        totalPage: total,
      },
    });
  }, []);

  const setLoading = useCallback((val) => {
    dispatch({
      type: ActionKind.SET_LOADING,
      payload: {
        loading: val,
      },
    });
  }, []);

  const setTotalElement = useCallback((total) => {
    dispatch({
      type: ActionKind.SET_TOTAL_ELEMENT,
      payload: {
        totalElement: total,
      },
    });
  }, []);

  const setPageSize = useCallback((size) => {
    dispatch({
      type: ActionKind.SET_PAGESIZE,
      payload: {
        pageSize: size,
      },
    });
  }, []);
  const setSearchText = useCallback((searchText) => {
    dispatch({
      type: ActionKind.SET_SEARCH_TEXT,
      payload: {
        searchText: searchText,
      },
    });
  }, []);
  const setSort = useCallback((sort) => {
    dispatch({
      type: ActionKind.SET_SORT,
      payload: {
        sort: sort,
      },
    });
  }, []);

  return (
    <Provider
      value={{
        state,
        setState,
        setPage,
        setTotalPage,
        setData,
        setLoading,
        setTotalElement,
        setPageSize,
        setSearchText,
        setSort,
      }}
    >
      {children}
    </Provider>
  );
};

export default TableProvider;

// HOC to wrap component with TableProvider
export function withTable(WrappedComponent, initState = initialState) {
  const ComponentWithTableProvider = (props) => (
    <TableProvider initState={initState}>
      <WrappedComponent {...props} />
    </TableProvider>
  );
  return ComponentWithTableProvider;
}

export const useTable = () => useContext(store);
