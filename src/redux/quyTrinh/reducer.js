import produce from 'immer';
import * as types from './constants';

export const initialState = {
  danhSachMauLoading: false,
  danhSachMauError: null,
  danhSachMau: [],

  phieuTiepNhanLoading: false,
  phieuInfo: null,
  phieuError: null,

  loading: false,
  mauInfo: null,
  mauError: null,

  phieuLoading: false,
  listPhieu: [],
  listPhieuError: null,

  toggleCreateMau: false,

  listLinhVuc: [],
  listLinhVucErr: null,
  listLinhVucLoading: false,

  listChiTieusGroupByLinhVuc: [],
  listChiTieusGroupByLinhVucErr: null,
  listChiTieusGroupByLinhVucLoading: false,

  togglePhanChiaPhongBan: false,

  listDangBaoChe: [],
  listDangBaoCheErr: null,
  listDangBaoCheLoading: false,
};

const quyTrinhReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_DANH_SACH_MAU:
        draft.danhSachMauLoading = true;
        draft.danhSachMauError = null;
        break;
      case types.GET_DANH_SACH_MAU_SUCCESS:
        draft.danhSachMauLoading = false;
        draft.danhSachMauError = null;
        draft.danhSachMau = action.payload;
        break;
      case types.GET_DANH_SACH_MAU_FAIL:
        draft.danhSachMauLoading = false;
        draft.danhSachMauError = action.payload;
        draft.danhSachMau = [];
        break;

      case types.GET_PHIEU_TIEP_NHAN:
        draft.phieuTiepNhanLoading = true;
        draft.phieuError = null;
        break;
      case types.GET_PHIEU_TIEP_NHAN_SUCCESS:
        draft.phieuTiepNhanLoading = false;
        draft.phieuError = null;
        draft.phieuInfo = action.payload;
        break;
      case types.GET_PHIEU_TIEP_NHAN_FAIL:
        draft.phieuTiepNhanLoading = false;
        draft.phieuError = action.payload;
        draft.phieuInfo = null;
        break;

      case types.GET_DETAIL_MAU:
        draft.loading = true;
        draft.mauError = null;
        break;
      case types.GET_DETAIL_MAU_SUCCESS:
        draft.loading = false;
        draft.mauError = null;
        draft.mauInfo = action.payload;
        break;
      case types.GET_DETAIL_MAU_FAIL:
        draft.loading = false;
        draft.mauError = action.payload;
        draft.mauInfo = null;
        break;

      case types.GET_LIST_PHIEU:
        draft.phieuLoading = true;
        draft.listPhieu = [];
        break;
      case types.GET_LIST_PHIEU_SUCCESS:
        draft.phieuLoading = false;
        draft.listPhieuError = null;
        draft.listPhieu = action.payload;
        break;
      case types.GET_LIST_PHIEU_FAIL:
        draft.phieuLoading = false;
        draft.listPhieuError = action.payload;
        draft.listPhieu = [];
        break;

      case types.GET_LIST_MAU_BY_PHIEU_TIEP_NHAN_ID:
        draft.danhSachMauLoading = true;
        draft.danhSachMauError = null;
        break;
      case types.GET_LIST_MAU_BY_PHIEU_TIEP_NHAN_ID_SUCCESS:
        draft.danhSachMauLoading = false;
        draft.danhSachMauError = null;
        draft.danhSachMau = action.payload; // the same params above
        break;
      case types.GET_LIST_MAU_BY_PHIEU_TIEP_NHAN_ID_FAIL:
        draft.danhSachMauLoading = false;
        draft.danhSachMauError = action.payload;
        draft.danhSachMau = [];
        break;

      case types.TOGGLE_CREATE_MAU:
        draft.toggleCreateMau = action.payload;
        break;

      case types.GET_LIST_LINH_VUC:
        draft.listLinhVucLoading = true;
        draft.listLinhVucErr = null;
        break;
      case types.GET_LIST_LINH_VUC_SUCCESS:
        draft.listLinhVucLoading = true;
        draft.listLinhVucErr = null;
        draft.listLinhVuc = action.payload;
        break;
      case types.GET_LIST_LINH_VUC_FAIL:
        draft.listLinhVucLoading = false;
        draft.listLinhVucErr = action.payload;
        break;
      case types.GET_CHI_TIEUS_GROUP_BY_LINHVUC:
        draft.listChiTieusGroupByLinhVucLoading = true;
        draft.listChiTieusGroupByLinhVucErr = null;
        break;
      case types.GET_CHI_TIEUS_GROUP_BY_LINHVUC_SUCCESS:
        draft.listChiTieusGroupByLinhVucLoading = true;
        draft.listChiTieusGroupByLinhVucErr = null;
        draft.listChiTieusGroupByLinhVuc = action.payload;
        break;
      case types.GET_CHI_TIEUS_GROUP_BY_LINHVUC_FAIL:
        draft.listChiTieusGroupByLinhVucLoading = false;
        draft.listChiTieusGroupByLinhVucErr = action.payload;
        break;

      case types.TOGGLE_PHAN_CHIA_PHONG_BAN:
        draft.togglePhanChiaPhongBan = action.payload;
        break;

      case types.GET_LIST_DANG_BAO_CHE:
        draft.listDangBaoChe = null;
        draft.listDangBaoCheLoading = true;
        draft.listDangBaoCheErr = null;
        break;
      case types.GET_LIST_DANG_BAO_CHE_SUCCESS:
        draft.listDangBaoChe = action.payload;
        draft.listDangBaoCheLoading = false;
        draft.listDangBaoCheErr = null;
        break;
      case types.GET_LIST_DANG_BAO_CHE_FAIL:
        draft.listDangBaoChe = null;
        draft.listDangBaoCheLoading = false;
        draft.listDangBaoCheErr = action.payload;
        break;
    }
  });

export default quyTrinhReducer;
