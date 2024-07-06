import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGridView = (state) => (state && state.tableView) || initialState;

const selectGridIdSelections = () => createSelector(selectGridView, (globalState) => globalState.idSelections);

const selectGridDetailSelections = () => createSelector(selectGridView, (globalState) => globalState.detailSelections);

export { selectGridView, selectGridIdSelections, selectGridDetailSelections };
