export const TechnicalRequirementType = {
  INSTALLNEW: 0,
  MAINTENANCE: 1,
  REPAIR: 2,
};

export const TechnicalRequirementState = {
  Request: 0,
  RefusedRequest: 1,
  Receive: 2,
  RefuseReceive: 3,
  Processing: 4,
  Completed: 5,
};

export const TechnicalRequirementAssignmentState = {
  Pending: 0,
  Active: 1,
  Refused: 2,
  Completed: 3,
};

export const TechnicalRequirementAssignmentRole = {
  Mainer: 0,
  Supporter: 1,
};

export const TechnicalRequirementTypeOptions = [
  { value: 0, label: 'Lắp máy mới' },
  { value: 1, label: 'Bảo trì' },
  { value: 2, label: 'Sửa chửa' },
];

export const TechnicalRequirementTypeOptions1 = [
  { value: 0, label: 'Lắp máy mới' },
  { value: 1, label: 'Bảo trì' },
  { value: 2, label: 'Sửa chửa' },
];

export const listResultType = [
  { value: 0, label: 'Lắp máy mới' },
  { value: 1, label: 'Bảo trì' },
  { value: 2, label: 'Sửa chửa' },
]

export const TechnicalRequirementStateOptions = [
  { value: 0, label: 'Yêu cầu' },
  { value: 1, label: 'Từ chối yêu cầu' },
  { value: 2, label: 'Tiếp nhận' },
  { value: 3, label: 'Từ chối tiếp nhận' },
  { value: 4, label: 'Đang thực hiện' },
  { value: 5, label: 'Hoàn thành' },
];

export const TechnicalRequirementAssignmentStateOptions = [
  { value: 0, label: 'Chờ chấp thuận' },
  { value: 1, label: 'Đang thực hiện' },
  { value: 2, label: 'Từ chối' },
  { value: 3, label: 'Hoàn thành' },
];

export const TechnicalRequirementAssignmentRoleOptions = [
  { value: 0, label: 'Người chịu trách nhiệm chính' },
  { value: 1, label: 'Người hổ trợ' },
];

export const PER = {
  DS_DANG_KY_DU_AN_SUA: "DS_DANG_KY_DU_AN_SUA",
  NHAN_VIEN_THEM: "NHAN_VIEN_THEM",
  HOA_DON_XOA: "HOA_DON_XOA",
  BAO_GIA_XOA: "BAO_GIA_XOA",
  BAO_CAO_THONG_KE: "BAO_CAO_THONG_KE",
  HOP_DONG_THEM: "HOP_DONG_THEM",
  HOP_DONG: "HOP_DONG",
  YEU_CAU_KHACH_HANG: "YEU_CAU_KHACH_HANG",
  BAO_GIA: "BAO_GIA",
  NHAN_VIEN_XOA: "NHAN_VIEN_XOA",
  YEU_CAU_KI_THUAT_NHAN_YEU_CAU: "YEU_CAU_KI_THUAT_NHAN_YEU_CAU",
  HOI_THAO_SUA: "HOI_THAO_SUA",
  TONG_HOP_KET_QUA: "TONG_HOP_KET_QUA",
  SAN_PHAM_MOI_SUA: "SAN_PHAM_MOI_SUA",
  NHOM_KHACH_HANG_SUA: "NHOM_KHACH_HANG_SUA",
  HOI_NGHI_XEM: "HOI_NGHI_XEM",
  QUAN_LY_CONG_VIEC_XEM: "QUAN_LY_CONG_VIEC_XEM",
  YEU_CAU_KHACH_HANG_SUA: "YEU_CAU_KHACH_HANG_SUA",
  YEU_CAU_KI_THUAT_PHAN_CONG: "YEU_CAU_KI_THUAT_PHAN_CONG",
  NHOM_KHACH_HANG_XEM: "NHOM_KHACH_HANG_XEM",
  SAN_PHAM_MOI_XEM: "SAN_PHAM_MOI_XEM",
  QUAN_LI_KINH_DOANH: "QUAN_LI_KINH_DOANH",
  HOP_DONG_XEM: "HOP_DONG_XEM",
  KHOA_PHONG_BAN_XOA: "KHOA_PHONG_BAN_XOA",
  NHAN_VIEN_SUA: "NHAN_VIEN_SUA",
  YEU_CAU_KHACH_HANG_THEM: "YEU_CAU_KHACH_HANG_THEM",
  NGHIEP_VU_KY_THUAT: "NGHIEP_VU_KY_THUAT",
  NHOM_KHACH_HANG_XOA: "NHOM_KHACH_HANG_XOA",
  HOP_DONG_SUA: "HOP_DONG_SUA",
  KET_QUA_DU_AN: "KET_QUA_DU_AN",
  HOI_THAO_XOA: "HOI_THAO_XOA",
  KET_QUA_DU_AN_XEM: "KET_QUA_DU_AN_XEM",
  HOI_NGHI: "HOI_NGHI",
  YEU_CAU_KHACH_HANG_XEM: "YEU_CAU_KHACH_HANG_XEM",
  BAO_GIA_SUA: "BAO_GIA_SUA",
  KHOA_PHONG_BAN_THEM: "KHOA_PHONG_BAN_THEM",
  HOI_THAO_THEM: "HOI_THAO_THEM",
  BAO_GIA_GUI_MAIL: "BAO_GIA_GUI_MAIL",
  NHAN_VIEN: "NHAN_VIEN",
  SAN_PHAM_MOI: "SAN_PHAM_MOI",
  BAO_CAO_NHAN_SU: "BAO_CAO_NHAN_SU",
  KHOA_PHONG_BAN: "KHOA_PHONG_BAN",
  HOI_NGHI_XOA: "HOI_NGHI_XOA",
  PHAN_QUYEN: "PHAN_QUYEN",
  HOA_DON: "HOA_DON",
  HOI_THAO: "HOI_THAO",
  HOA_DON_SUA: "HOA_DON_SUA",
  YEU_CAU_KHACH_HANG_XOA: "YEU_CAU_KHACH_HANG_XOA",
  BAO_GIA_XEM: "BAO_GIA_XEM",
  HOI_NGHI_SUA: "HOI_NGHI_SUA",
  SAN_PHAM_MOI_XOA: "SAN_PHAM_MOI_XOA",
  KHOA_PHONG_BAN_XEM: "KHOA_PHONG_BAN_XEM",
  KHACH_HANG: "KHACH_HANG",
  DS_DANG_KY_DU_AN_THEM: "DS_DANG_KY_DU_AN_THEM",
  YEU_CAU_KI_THUAT_THEM: "YEU_CAU_KI_THUAT_THEM",
  BAO_CAO_DOANH_THU: "BAO_CAO_DOANH_THU",
  KHACH_HANG_XOA: "KHACH_HANG_XOA",
  QUAN_LY_CONG_VIEC_SUA: "QUAN_LY_CONG_VIEC_SUA",
  NHAN_VIEN_XEM: "NHAN_VIEN_XEM",
  DS_DANG_KY_DU_AN: "DS_DANG_KY_DU_AN",
  HOA_DON_THEM: "HOA_DON_THEM",
  HOI_THAO_XEM: "HOI_THAO_XEM",
  QUAN_LY_KHACH_HANG: "QUAN_LY_KHACH_HANG",
  HE_THONG: "HE_THONG",
  HOP_DONG_XOA: "HOP_DONG_XOA",
  KHACH_HANG_SUA: "KHACH_HANG_SUA",
  HOP_DONG_GUI_MAIL: "HOP_DONG_GUI_MAIL",
  QUAN_LY_CONG_VIEC: "QUAN_LY_CONG_VIEC",
  HOA_DON_XEM: "HOA_DON_XEM",
  YEU_CAU_KI_THUAT: "YEU_CAU_KI_THUAT",
  KHACH_HANG_THEM: "KHACH_HANG_THEM",
  QUAN_LI_DEALERS: "QUAN_LI_DEALERS",
  KHOA_PHONG_BAN_SUA: "KHOA_PHONG_BAN_SUA",
  HOI_NGHI_THEM: "HOI_NGHI_THEM",
  NHOM_KHACH_HANG: "NHOM_KHACH_HANG",
  BAO_GIA_THEM: "BAO_GIA_THEM",
  SAN_PHAM_MOI_THEM: "SAN_PHAM_MOI_THEM",
  YEU_CAU_KI_THUAT_XEM: "YEU_CAU_KI_THUAT_XEM",
  DS_DANG_KY_DU_AN_XEM: "DS_DANG_KY_DU_AN_XEM",
  KHACH_HANG_XEM: "KHACH_HANG_XEM",
  NHOM_KHACH_HANG_THEM: "NHOM_KHACH_HANG_THEM",
  QUAN_LY_NHAN_SU: "QUAN_LY_NHAN_SU"
}
