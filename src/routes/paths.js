import { lazy } from 'react';
import {
  DashboardOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
  SettingOutlined,
  ApartmentOutlined,
  SlackSquareOutlined,
  BarChartOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
// import { GROUP_PERMISSION_NAVIGATIONS, PERMISSIONS } from 'static/Permissions';
import { v4 as uuidv4 } from 'uuid';
import { GROUP_PERMISSION_NAVIGATIONS, PERMISSIONS } from 'static/Permissions';

const CustomerGroup = lazy(() => import('pages/customer-group'));
const Customer = lazy(() => import('pages/customer'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Department = lazy(() => import('pages/department'));
const Employee = lazy(() => import('pages/employee'));
const DetailStaff = lazy(() => import('pages/employee/Detail'));
const CustomerRequirement = lazy(() => import('pages/customer-requirement'));
const CreateQuote = lazy(() => import('pages/quotation/create-quote/index'));
const CreateContract = lazy(() => import('pages/contract/create-contract/contractV2'));
const DocumentViewer = lazy(() => import('pages/document-viewer/documentView'));
const Quotation = lazy(() => import('pages/quotation'));
const Contract = lazy(() => import('pages/contract'));
const Permission = lazy(() => import('pages/permissions'));
const TechnicalBusinessRequestIndex = lazy(() => import('pages/technical-business/technicalBusinessRequest/index'));
const TechnicalBusinessManageIndex = lazy(() => import('pages/technical-business/technicalBusinessManage/index'));
const TechnicalBusinessResult = lazy(() => import('pages/technical-business/technicalBusinessResult'));
const Marketing = lazy(() => import('pages/marketing'));
const Conference = lazy(() => import('pages/marketing/conference'));
const Seminar = lazy(() => import('pages/marketing/seminar'));
const NewProduct = lazy(() => import('pages/marketing/newProduct'));
const RevenueStatistic = lazy(() => import('pages/revenueStatistic'));
const Dealers = lazy(() => import('pages/dealers'));
const DealersResult = lazy(() => import('pages/dealersResult'));
const Invoice = lazy(() => import('pages/invoice'));

export const paths = {
  // SIDEBARS PATHS
  dashboard: {
    label: 'Trang chủ',
    ic: DashboardOutlined,
    path: 'dashboard',
    // true mean all PERMISSIONS can access
    key: uuidv4(),
  },
  employeeManage: {
    label: 'Quản lý nhân sự',
    ic: UsergroupAddOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.quanLyNhanSu,
    key: uuidv4(),
  },
  department: {
    label: 'Khoa / phòng / ban',
    ic: null,
    path: 'quan-ly-phong-ban',
    permissions: PERMISSIONS.quanLyNhanSu.KHOA_PHONG_BAN,
    key: uuidv4(),
  },
  employee: {
    label: 'Nhân viên',
    ic: null,
    path: 'quan-ly-nhan-vien',
    permissions: PERMISSIONS.quanLyNhanSu.NHAN_VIEN,
    key: uuidv4(),
  },
  detailStaff: {
    label: 'Chi tiết nhân viên',
    ic: null,
    path: `quan-ly-nhan-vien/:id`,
    permissions: PERMISSIONS.quanLyNhanSu.NHAN_VIEN,
    key: uuidv4(),
  },
  groupCustomer: {
    label: 'Quản lý khách hàng',
    ic: UserSwitchOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.quanLyKhachHang,
    key: uuidv4(),
  },
  customer: {
    label: 'Khách hàng',
    ic: null,
    path: 'khach-hang',
    permissions: PERMISSIONS.quanLyKhachHang.KHACH_HANG,
    key: uuidv4(),
  },
  customerGroup: {
    label: 'Nhóm khách hàng',
    ic: null,
    path: 'nhom-khach-hang',
    permissions: PERMISSIONS.quanLyKhachHang.NHOM_KHACH_HANG,

    key: uuidv4(),
  },
  groupDealers: {
    label: 'Quản lý Dealers',
    ic: ContactsOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.quanLyDealers,
    key: uuidv4(),
  },
  dealers: {
    label: 'Đăng ký dự án',
    ic: null,
    path: 'dang-ky-du-an',
    permissions: PERMISSIONS.quanLyDealers.DS_DANG_KY_DU_AN,
    key: uuidv4(),
  },
  dealersResult: {
    label: 'Kết quả dự án',
    ic: null,
    path: 'ket-qua-du-an',
    permissions: PERMISSIONS.quanLyDealers.KET_QUA_DU_AN,
    key: uuidv4(),
  },
  business: {
    label: 'Quản lý kinh doanh',
    ic: ProjectOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.quanLyKinhDoanh,
    key: uuidv4(),
  },
  customerRequirement: {
    label: 'Yêu cầu khách hàng',
    ic: null,
    path: 'yeu-cau-khach-hang',
    permissions: PERMISSIONS.quanLyKinhDoanh.YEU_CAU_KHACH_HANG,
    key: uuidv4(),
  },
  quotation: {
    label: 'Báo giá',
    ic: null,
    path: 'bao-gia',
    permissions: PERMISSIONS.quanLyKinhDoanh.BAO_GIA,

    key: uuidv4(),
  },
  quotationCreate: {
    label: '',
    ic: null,
    path: 'tao-bao-gia',
    permissions: PERMISSIONS.quanLyKinhDoanh.BAO_GIA,
    key: uuidv4(),
  },
  quotationEdit: {
    label: '',
    ic: null,
    path: 'chinh-sua-bao-gia/:id',
    permissions: PERMISSIONS.quanLyKinhDoanh.BAO_GIA,

    key: uuidv4(),
  },
  contract: {
    label: 'Hợp đồng',
    ic: null,
    path: 'hop-dong',
    permissions: PERMISSIONS.quanLyKinhDoanh.HOP_DONG,
    key: uuidv4(),
  },
  invoice: {
    label: 'Hóa đơn',
    ic: null,
    path: 'hoa-don',
    permissions: PERMISSIONS.quanLyKinhDoanh.HOA_DON,
    key: uuidv4(),
  },
  documentViewer: {
    label: 'Tài liệu',
    ic: null,
    path: 'tai-lieu/:id',
    key: uuidv4(),
  },
  contractCreate: {
    label: 'Tạo hợp đồng',
    ic: null,
    path: 'tao-hop-dong',
    permissions: PERMISSIONS.quanLyKinhDoanh.HOP_DONG,
    key: uuidv4(),
  },
  contractEdit: {
    label: '',
    ic: null,
    path: 'chinh-sua-hop-dong/:id',
    permissions: PERMISSIONS.quanLyKinhDoanh.HOP_DONG,
    key: uuidv4(),
  },
  technicalBusiness: {
    label: 'Nghiệp vụ kĩ thuật',
    ic: ApartmentOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.NghiepVuKyThuat,
    key: uuidv4(),
  },
  businessRequest: {
    label: 'Yêu cầu kĩ thuật',
    ic: null,
    path: 'yeu-cau-ki-thuat',
    permissions: PERMISSIONS.NghiepVuKyThuat.YEU_CAU_KI_THUAT,
    key: uuidv4(),
  },
  businessManage: {
    label: 'Quản lý công việc',
    ic: null,
    path: 'quan-ly-yeu-cau',
    permissions: PERMISSIONS.NghiepVuKyThuat.QUAN_LY_CONG_VIEC,
    key: uuidv4(),
  },
  marketingManage: {
    label: 'Quản lý Maketing',
    ic: SlackSquareOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.quanLyMaketing,
    key: uuidv4(),
  },
  seminar: {
    label: 'Hội thảo',
    ic: null,
    path: 'hoi-thao',
    permissions: PERMISSIONS.quanLyMaketing.HOI_THAO,
    key: uuidv4(),
  },
  conference: {
    label: 'Hội nghị',
    ic: null,
    path: 'hoi-nghi',
    permissions: PERMISSIONS.quanLyMaketing.HOI_NGHI,
    key: uuidv4(),
  },
  newProduct: {
    label: 'Sản phẩm mới',
    ic: null,
    path: 'san-pham-moi',
    permissions: PERMISSIONS.quanLyMaketing.SAN_PHAM_MOI,
    key: uuidv4(),
  },
  report: {
    label: 'Báo cáo và thống kê',
    ic: BarChartOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.baoCaoVaThongKe,
    key: uuidv4(),
  },
  revenueStatistics: {
    label: 'Thống kê doanh thu',
    ic: null,
    path: 'revenue-statistics',
    permissions: PERMISSIONS.baoCaoVaThongKe.BAO_CAO_NHAN_SU,
    key: uuidv4(),
  },
  systems: {
    label: 'Hệ thống',
    ic: SettingOutlined,
    path: false,
    permissions: GROUP_PERMISSION_NAVIGATIONS.heThong,
    key: uuidv4(),
  },
  permissions: {
    label: 'Phân quyền',
    ic: null,
    path: 'phan-quyen',
    permissions: PERMISSIONS.heThong.PHAN_QUYEN,
    key: uuidv4(),
  },
  all: {
    label: '',
    ic: null,
    path: `/`,
    key: uuidv4(),
  },
};

export const sidebarRoutes = [
  {
    ...paths.dashboard,
    component: Dashboard,
  },
  {
    ...paths.employeeManage,
    children: [
      {
        ...paths.department,
        component: Department,
      },
      {
        ...paths.employee,
        component: Employee,
      },
    ],
  },
  {
    ...paths.groupCustomer,
    children: [
      {
        ...paths.customerGroup,
        component: CustomerGroup,
      },
      // {
      //   ...paths.fields,
      //   component: Fields,
      // },
      {
        ...paths.customer,
        component: Customer,
      },
    ],
  },
  {
    ...paths.groupDealers,
    children: [
      {
        ...paths.dealers,
        component: Dealers,
      },
      {
        ...paths.dealersResult,
        component: DealersResult,
      },
    ],
  },
  {
    ...paths.business,
    children: [
      {
        ...paths.customerRequirement,
        component: CustomerRequirement,
      },
      {
        ...paths.quotation,
        component: Quotation,
      },
      {
        ...paths.contract,
        component: Contract,
      },
      {
        ...paths.invoice,
        component: Invoice,
      },
    ],
  },
  {
    ...paths.technicalBusiness,
    children: [
      {
        ...paths.businessRequest,
        component: TechnicalBusinessRequestIndex,
      },
      {
        ...paths.businessManage,
        component: TechnicalBusinessManageIndex,
      },
      {
        ...paths.businessResult,
        component: TechnicalBusinessResult,
      },
    ],
  },
  {
    ...paths.marketingManage,
    children: [
      {
        ...paths.seminar,
        component: Seminar,
      },
      {
        ...paths.conference,
        component: Conference,
      },
      {
        ...paths.newProduct,
        component: NewProduct,
      },
    ],
  },
  {
    ...paths.report,
    children: [
      {
        ...paths.revenueStatistics,
        component: RevenueStatistic,
      },
    ],
  },
  {
    ...paths.systems,
    children: [
      {
        ...paths.permissions,
        component: Permission,
      },
    ],
  },
];

export const detailRoutes = [
  {
    ...paths.quotationCreate,
    component: CreateQuote,
  },
  {
    ...paths.quotationEdit,
    component: CreateQuote,
  },
  {
    ...paths.contractCreate,
    component: CreateContract,
  },
  {
    ...paths.contractEdit,
    component: CreateContract,
  },
  {
    ...paths.documentViewer,
    component: DocumentViewer,
  },
  {
    ...paths.detailStaff,
    component: DetailStaff,
  },
  {
    ...paths.all,
    component: Dashboard,
  },
];

export const appRoutes = [...sidebarRoutes, ...detailRoutes];
