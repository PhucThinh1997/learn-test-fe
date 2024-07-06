export const CHI_TIEU_STATUS = {
  ThucHien: 'ThucHien',
  TuChoiThucHien: 'TuChoiThucHien',
  TiepNhan: 'TiepNhan',
  TuChoiTiepNhan: 'TuChoiTiepNhan',
  DangThucHien: 'DangThucHien',
  CoKetQua: 'CoKetQua',
  TuChoiKetQua: 'TuChoiKetQua',
  DaDuyet: 'DaDuyet',
};

export const CHI_TIEU_STATUS_OBJ = {
  [CHI_TIEU_STATUS.ThucHien]: {
    id: CHI_TIEU_STATUS.ThucHien,
    label: 'Thực hiện',
    textColor: 'red',
    bgColor: '#cecece',
  },
  [CHI_TIEU_STATUS.TuChoiThucHien]: {
    id: CHI_TIEU_STATUS.TuChoiThucHien,
    label: 'Từ chối thực hiện',
    textColor: 'red',
    bgColor: '#cecece',
  },
  [CHI_TIEU_STATUS.TiepNhan]: {
    id: CHI_TIEU_STATUS.TiepNhan,
    label: 'Tiếp nhận',
    textColor: '#FFFFFF',
    bgColor: '#5a4848',
  },
  [CHI_TIEU_STATUS.TuChoiTiepNhan]: {
    id: CHI_TIEU_STATUS.TuChoiTiepNhan,
    label: 'Từ chối tiếp nhận',
    textColor: 'red',
    bgColor: '#cecece',
  },
  [CHI_TIEU_STATUS.DangThucHien]: {
    id: CHI_TIEU_STATUS.DangThucHien,
    label: 'Đang thực hiện',
    textColor: 'red',
    bgColor: '#cecece',
  },
  [CHI_TIEU_STATUS.ThucHien]: {
    id: CHI_TIEU_STATUS.ThucHien,
    label: 'Thực hiện',
    textColor: 'red',
    bgColor: '#cecece',
  },
  [CHI_TIEU_STATUS.CoKetQua]: {
    id: CHI_TIEU_STATUS.CoKetQua,
    label: 'Có kết quả',
    textColor: 'red',
    bgColor: '#cecece',
  },
  [CHI_TIEU_STATUS.TuChoiKetQua]: {
    id: CHI_TIEU_STATUS.TuChoiKetQua,
    label: 'Từ chối kết quả',
    textColor: 'red',
    bgColor: '#cecece',
  },
  [CHI_TIEU_STATUS.DaDuyet]: {
    id: CHI_TIEU_STATUS.DaDuyet,
    label: 'Đã duyệt',
    textColor: 'red',
    bgColor: '#cecece',
  },
};
