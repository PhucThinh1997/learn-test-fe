import { PER } from "common/enum";

export const PERMISSIONS = {
  quanLyNhanSu: {
    KHOA_PHONG_BAN: PER.KHOA_PHONG_BAN_XEM,
    NHAN_VIEN: PER.NHAN_VIEN_XEM
  },
  quanLyKhachHang: {
    NHOM_KHACH_HANG: PER.NHOM_KHACH_HANG_XEM,
    KHACH_HANG: PER.KHACH_HANG_XEM
  },
  quanLyDealers: {
    DS_DANG_KY_DU_AN: PER.DS_DANG_KY_DU_AN_XEM,
    KET_QUA_DU_AN: PER.KET_QUA_DU_AN_XEM,
  },
  quanLyKinhDoanh: {
    YEU_CAU_KHACH_HANG: PER.YEU_CAU_KHACH_HANG_XEM,
    BAO_GIA: PER.BAO_GIA_XEM,
    HOP_DONG: PER.HOP_DONG_XEM,
    HOA_DON: PER.HOA_DON_XEM
  },
  NghiepVuKyThuat: {
    YEU_CAU_KI_THUAT: PER.YEU_CAU_KI_THUAT_XEM,
    QUAN_LY_CONG_VIEC: PER.QUAN_LY_CONG_VIEC_XEM,
    TONG_HOP_KET_QUA: PER.TONG_HOP_KET_QUA,
  },
  quanLyMaketing: {
    HOI_THAO: PER.HOI_THAO_XEM,
    HOI_NGHI: PER.HOI_NGHI_XEM,
    SAN_PHAM_MOI: PER.SAN_PHAM_MOI_XEM
  },
  baoCaoVaThongKe: {
    BAO_CAO_NHAN_SU: PER.BAO_CAO_THONG_KE
  },
  heThong: { PHAN_QUYEN: PER.PHAN_QUYEN },
  admin: { ADMIN: 'ADMIN', SUPPER_ADMIN: 'Super Admin' },
}

export const GROUP_PERMISSION_NAVIGATIONS = {
  quanLyNhanSu: Object.values(PERMISSIONS.quanLyNhanSu),
  quanLyKhachHang: Object.values(PERMISSIONS.quanLyKhachHang),
  quanLyDealers: Object.values(PERMISSIONS.quanLyDealers),
  quanLyKinhDoanh: Object.values(PERMISSIONS.quanLyKinhDoanh),
  NghiepVuKyThuat: Object.values(PERMISSIONS.NghiepVuKyThuat),
  quanLyMaketing: Object.values(PERMISSIONS.quanLyMaketing),
  baoCaoVaThongKe: Object.values(PERMISSIONS.baoCaoVaThongKe),
  heThong: Object.values(PERMISSIONS.heThong)
};

