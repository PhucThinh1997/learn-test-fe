import { createSelector } from 'reselect';
import { initialState } from './reducer';

const phanChiaChiTieuSelectors = (state) => state.quyTrinh || initialState;

const selectDanhSachMau = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.danhSachMau);
const selectDanhSachMauErr = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.danhSachMauError);
const selectDanhSachMauLoading = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.danhSachMauLoading);

const selectPhieuTiepNhan = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.phieuInfo);
const selectPhieuTiepNhanLoading = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.phieuTiepNhanLoading);
const selectPhieuTiepNhanErr = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.phieuError);

const selectDetailMau = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.mauInfo);
const selectDetailMauLoading = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.loading);
const selectDetailMauErr = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.mauError);

const selectListPhieu = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listPhieu);
const selectListPhieuErr = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listPhieuError);
const selectListPhieuLoading = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.phieuLoading);

const selectToggleCreatemau = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.toggleCreateMau);

const selectListLinhVuc = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listLinhVuc);
const selectListLinhVucErr = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listLinhVucError);
const selectListLinhVucLoading = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listLinhVucLoading);

const selectGetChiTieusGroupByLinhVuc = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listChiTieusGroupByLinhVuc);
const selectGetChiTieusGroupByLinhVucErr = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listChiTieusGroupByLinhVucError);
const selectGetChiTieusGroupByLinhVuccLoading = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listChiTieusGroupByLinhVucLoading);

const selectTogglePhanChiaPhongBan = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.togglePhanChiaPhongBan);

const selectGetDangBaoChe = () => createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listDangBaoChe);
const selectGetDangBaoCheErr = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listDangBaoCheErr);
const selectGetDangBaoCheLoading = () =>
  createSelector(phanChiaChiTieuSelectors, (groupsState) => groupsState.listDangBaoCheLoading);

export {
  selectDanhSachMau,
  selectDanhSachMauErr,
  selectDanhSachMauLoading,
  selectPhieuTiepNhanLoading,
  selectPhieuTiepNhanErr,
  selectPhieuTiepNhan,
  selectDetailMau,
  selectDetailMauErr,
  selectDetailMauLoading,
  selectListPhieu,
  selectListPhieuErr,
  selectListPhieuLoading,
  selectToggleCreatemau,
  selectListLinhVuc,
  selectListLinhVucErr,
  selectListLinhVucLoading,
  selectGetChiTieusGroupByLinhVuc,
  selectGetChiTieusGroupByLinhVucErr,
  selectGetChiTieusGroupByLinhVuccLoading,
  selectTogglePhanChiaPhongBan,
  selectGetDangBaoChe,
  selectGetDangBaoCheLoading,
  selectGetDangBaoCheErr,
};
