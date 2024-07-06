import * as types from './constants';

export const getDanhSachMau = (payload) => ({
  type: types.GET_DANH_SACH_MAU,
  payload,
});
export const getDanhSachMauSuccess = (data) => ({
  type: types.GET_DANH_SACH_MAU_SUCCESS,
  payload: data,
});
export const getDanhSachMauFail = (err) => ({
  type: types.GET_DANH_SACH_MAU_FAIL,
  payload: err,
});

export const getPhieuTiepNhan = (payload) => ({
  type: types.GET_PHIEU_TIEP_NHAN,
  payload,
});
export const getPhieuTiepNhanSuccess = (data) => ({
  type: types.GET_PHIEU_TIEP_NHAN_SUCCESS,
  payload: data,
});
export const getPhieuTiepNhanFail = (err) => ({
  type: types.GET_PHIEU_TIEP_NHAN_FAIL,
  payload: err,
});

export const getDetailMau = (payload) => ({
  type: types.GET_DETAIL_MAU,
  payload,
});
export const getDetailMauSuccess = (data) => ({
  type: types.GET_DETAIL_MAU_SUCCESS,
  payload: data,
});
export const getDetailMauFail = (err) => ({
  type: types.GET_DETAIL_MAU_FAIL,
  payload: err,
});

export const getListPhieu = (payload) => ({
  type: types.GET_LIST_PHIEU,
  payload,
});
export const getListPhieuSuccess = (data) => ({
  type: types.GET_LIST_PHIEU_SUCCESS,
  payload: data,
});
export const getListPhieuFail = (err) => ({
  type: types.GET_LIST_PHIEU_FAIL,
  payload: err,
});

export const getListMauByPhieuTiepNhanId = (payload) => ({
  type: types.GET_LIST_MAU_BY_PHIEU_TIEP_NHAN_ID,
  payload,
});
export const getListMauByPhieuTiepNhanIdSuccess = (data) => ({
  type: types.GET_LIST_MAU_BY_PHIEU_TIEP_NHAN_ID_SUCCESS,
  payload: data,
});
export const getListMauByPhieuTiepNhanIdFail = (err) => ({
  type: types.GET_LIST_MAU_BY_PHIEU_TIEP_NHAN_ID_FAIL,
  payload: err,
});

export const toggleCreateMau = (toggle) => ({
  type: types.TOGGLE_CREATE_MAU,
  payload: toggle,
});

export const getListLinhVuc = (payload) => ({
  type: types.GET_LIST_LINH_VUC,
  payload,
});
export const getListLinhVucSuccess = (data) => ({
  type: types.GET_LIST_LINH_VUC_SUCCESS,
  payload: data,
});
export const getListLinhVucFail = (err) => ({
  type: types.GET_LIST_LINH_VUC_FAIL,
  payload: err,
});

export const getListChiTieusGroupByLinhVuc = (payload) => ({
  type: types.GET_CHI_TIEUS_GROUP_BY_LINHVUC,
  payload,
});
export const getListChiTieusGroupByLinhVucSuccess = (data) => ({
  type: types.GET_CHI_TIEUS_GROUP_BY_LINHVUC_SUCCESS,
  payload: data,
});
export const getListChiTieusGroupByLinhVucFail = (err) => ({
  type: types.GET_CHI_TIEUS_GROUP_BY_LINHVUC_FAIL,
  payload: err,
});

export const togglePhanChiaPhongBan = (toggle) => ({
  type: types.TOGGLE_PHAN_CHIA_PHONG_BAN,
  payload: toggle,
});

export const getListDangBaoChe = (payload) => ({
  type: types.GET_LIST_DANG_BAO_CHE,
  payload,
});
export const getListDangBaoCheSuccess = (data) => ({
  type: types.GET_LIST_DANG_BAO_CHE_SUCCESS,
  payload: data,
});
export const getListDangBaoCheFail = (err) => ({
  type: types.GET_LIST_DANG_BAO_CHE_FAIL,
  payload: err,
});
