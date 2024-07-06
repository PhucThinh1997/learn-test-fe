export default {
  '/api/NhomKhachHangFake/GetAll': {
    data: {
      total: 5,
      pageIndex: 1,
      pageSize: 5,
      data: [
        {
          id: '8e703cff-4b3e-48c7-d084-08daa8df10f3',
          tenNhomKhachHang: 'Nhà thuốc/Quầy thuốc cá nhân',
          soLuongKhachHang: 2,
        },
        {
          id: '60b554ff-9556-43d8-822d-08daa8e125b1',
          tenNhomKhachHang: 'Công ty Sản xuất Thực phẩm',
          soLuongKhachHang: 0,
        },
        {
          id: '5be73e86-c342-47c8-bcff-08daade15e04',
          tenNhomKhachHang: 'Nhóm test',
          soLuongKhachHang: 0,
        },
      ],
    },
    isSuccess: true,
    message: null,
  },
  '/api/KhachHangFake/GetAll': {
    data: {
      total: 5,
      pageIndex: 1,
      pageSize: 5,
      data: [
        {
          id: 'c516b9e7-4731-4f06-c272-08daa8e193cf',
          maKhachHang: 'LongChau',
          tenKhachHang: 'Nhà thuốc Long Châu',
          diaChi: '105 Nguyễn Thị Minh Khai, tp Hội An, Quảng Nam',
          dienThoai: '0905109903',
          ghiChu: null,
          tenNhomKhachHang: 'Nhà thuốc/Quầy thuốc cá nhân',
          maNhomKhachHang: '8e703cff-4b3e-48c7-d084-08daa8df10f3',
        },
        {
          id: '96587be8-85b0-484e-c273-08daa8e193cf',
          maKhachHang: 'AnHuy',
          tenKhachHang: 'Nhà thuốc An Huy',
          diaChi: '234 Lý Thường Kiệt, tp Hội An, Quảng Nam',
          dienThoai: '0773528489',
          ghiChu: 'ABC',
          tenNhomKhachHang: 'Nhà thuốc/Quầy thuốc cá nhân',
          maNhomKhachHang: '8e703cff-4b3e-48c7-d084-08daa8df10f3',
        },
      ],
    },
    isSuccess: true,
    message: null,
  },
  '/api/KhachHangFake/Create': {
    data: {
      isSuccess: true,
      message: '',
    },
  },
  '/api/KhachHangFake/Update': {
    data: {
      isSuccess: true,
      message: '',
    },
  },
  '/api/KhachHangFake/Delete': {
    data: {
      isSuccess: true,
      message: '',
    },
  },
  /** fake apartment */

  '/api/ApartmentFake/GetAll': {
    data: {
      total: 5,
      pageIndex: 1,
      pageSize: 5,
      data: [
        {
          id: 'c516b9e7-4731-4f06-c272-08daa8e193cf',
          maPhongBan: 'LongChau',
          viTri: 'Đà Nẵng',
          tenPhongBan: 'Hành chính',
        },
        {
          id: 'c516b9e7-4731-4f06-c272-08daa8e193cf',
          maPhongBan: 'LongChau',
          viTri: 'Hà Nội',
          tenPhongBan: 'Nhân sự',
        },
      ],
    },
    isSuccess: true,
    message: null,
  },
  '/api/ApartmentFake/Create': {
    data: {
      isSuccess: true,
      message: '',
    },
  },
  '/api/ApartmentFake/Update': {
    data: {
      isSuccess: true,
      message: '',
    },
  },
  '/api/ApartmentFake/Delete': {
    data: {
      isSuccess: true,
      message: '',
    },
  },
  '/api/QuanLyQuyTrinhTiepMauThu/PhieuTiepNhanMau/GetPhieuTiepNhanMau/fabcd3cf-c9ac-45a9-1072-08daaed6d5b1dd': {
    data: {
      noiLayMau: '123',
      ngayLayMau: '2022-10-22T03:40:50.185',
      soGiayGioiThieu: '123',
      ngayCap: '2022-10-22T03:40:50.185',
      noiCap: '123',
      soBienBan: '123',
      khachHang: '123',
      yeuCauKiemNghiem: '123',
      nguoiDaiDien: '123',
      soDienThoai: '123',
      soPhieuKetQua: '123',
      ngayVaoSo: '2022-10-22T03:40:50.185',
      tienUngTruoc: '123',
      loaiMau: '123',
      soLuong: '123',
      soLuongLuu: '123',
      nguoiNhanMau: '123',
    },
  },
};
