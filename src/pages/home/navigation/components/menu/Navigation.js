// Libs
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import {
  DashboardOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
  ApartmentOutlined,
  PieChartOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

import * as gridViewActions from 'components/Grid/controllers/actions';
import { updateSearch } from 'redux/global/actions';
import Scrollbars from 'components/Scrollbars';

import './Navigation.less';

const { SubMenu, Item } = Menu;

const Navigation = (props) => {
  const { onSelect, collapsed } = props;
  const [itemSub, setItems] = useState(JSON.parse(localStorage.getItem('items')));
  const [defaultKey, setDefaultKey] = useState(JSON.parse(localStorage.getItem('submenu')));

  const dispatch = useDispatch();

  const onClick = (e) => {
    localStorage.setItem('items', JSON.stringify(e.key));
    if (e.keyPath.length > 1) {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[1]));
    } else {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[0]));
    }
    setItems(e.key);
    setDefaultKey(e?.keyPath[1]);
    // #8 - clear search text
    dispatch(updateSearch(''));
  };

  return (
    <Scrollbars className="scroll-bars--navigation" style={{ height: 'calc(100% - 250px)' }} autoHide>
      <Menu
        defaultSelectedKeys={['dashboard']}
        // openKeys={openKeys}
        // onOpenChange={onOpenChange}
        defaultOpenKeys={[defaultKey]}
        selectedKeys={[itemSub]}
        onClick={onClick}
        onSelect={onSelect}
        className="menu-navigation"
        inlineCollapsed={collapsed}
        mode="inline"
        trigger={null}
      >
        <Item key="/dashboard" className="menu-navigation__item" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Trang chủ</Link>
        </Item>

        <SubMenu
          key={'nhan-su-sub'}
          icon={<UsergroupAddOutlined />}
          title={'Quản lý nhân sự'}
          className="menu-navigation__sub-menu"
        >
          <Item key="phongBan" className="menu-navigation__item">
            <Link to="/quan-ly-phong-ban">Khoa/Phòng/Ban</Link>
          </Item>
          <Item key="staffManage" className="menu-navigation__item">
            <Link to="/quan-ly-nhan-vien">Nhân sự</Link>
          </Item>
        </SubMenu>

        <SubMenu
          key={'khach-hang-sub'}
          icon={<UserSwitchOutlined />}
          title={'Quản lý khách hàng'}
          className="menu-navigation__sub-menu"
        >
          <Item key="nhom-khach-hang" className="menu-navigation__item">
            <Link to="/nhom-khach-hang">Nhóm khách hàng</Link>
          </Item>
          <Item key="khach-hang" className="menu-navigation__item">
            <Link to="/khach-hang">Khách hàng</Link>
          </Item>
        </SubMenu>

        <SubMenu key={'mau'} icon={<ProjectOutlined />} title={'Quản lý mẫu'} className="menu-navigation__sub-menu">
          <Item key="loai-mau-tiep-nhan" className="menu-navigation__item">
            <Link to="/loai-mau-tiep-nhan">Loại mẫu tiếp nhận</Link>
          </Item>
          <Item key="nen-mau" className="menu-navigation__item">
            <Link to="/nen-mau">Quản lý nền mẫu</Link>
          </Item>
          <Item key="nhom-linh-vuc" className="menu-navigation__item">
            <Link to="/nhom-linh-vuc">Nhóm lĩnh vực</Link>
          </Item>
          <Item key="linh-vuc" className="menu-navigation__item">
            <Link to="/linh-vuc">Lĩnh vực</Link>
          </Item>
          <Item key="nhom-chi-tieu" className="menu-navigation__item">
            <Link to="/nhom-chi-tieu">Nhóm chỉ tiêu</Link>
          </Item>
          <Item key="chi-tieu-kiem-nghiem" className="menu-navigation__item">
            <Link to="/chi-tieu-kiem-nghiem">Chỉ tiêu kiểm nghiệm</Link>
          </Item>
          <Item key="dang-bao-che" className="menu-navigation__item">
            <Link to="/dang-bao-che">Dạng bào chế</Link>
          </Item>
          <Item key="hoat-chat" className="menu-navigation__item">
            <Link to="/hoat-chat">Hoạt chất</Link>
          </Item>
          <Item key="hoa-chat" className="menu-navigation__item">
            <Link to="/hoa-chat">Hóa chất</Link>
          </Item>
          <Item key="phuong-phap-thu" className="menu-navigation__item">
            <Link to="/phuong-phap-thu">Phương pháp thử</Link>
          </Item>
        </SubMenu>

        <SubMenu
          key={'quy-trinh-sub'}
          icon={<ApartmentOutlined />}
          title={'Quản lý quy trình'}
          className="menu-navigation__sub-menu"
        >
          <Item key="tiep-nhan-ho-so" className="menu-navigation__item">
            <Link to="/tiep-nhan-ho-so">Tiếp nhận hồ sơ</Link>
          </Item>
          <Item key="phan-chia-chi-tieu" className="menu-navigation__item">
            <Link to="/phan-chia-chi-tieu">Phân chia chỉ tiêu</Link>
          </Item>
          <Item key="phan-chia-kiem-mau" className="menu-navigation__item">
            <Link to="/phan-chia-kiem-mau">Phân chia kiểm mẫu</Link>
          </Item>
          <Item key="ket-qua-kiem-nghiem" className="menu-navigation__item">
            <Link to="/ket-qua-kiem-nghiem">Kết quả kiểm mẫu</Link>
          </Item>
          <Item key="nha-thau-phu" className="menu-navigation__item">
            <Link to="/nha-thau-phu">Nhà thầu phụ</Link>
          </Item>
          <Item key="tong-hop-ket-qua" className="menu-navigation__item">
            <Link to="/tong-hop-ket-qua">Tổng hợp kết quả</Link>
          </Item>
          {/* #17: Disable untill to do this feature */}
          {/* <Item key="quan-ly-su-co" className="menu-navigation__item">
            <Link to="/quan-ly-su-co">Quản lý sự cố</Link>
          </Item> */}
        </SubMenu>

        {/* <SubMenu
				key={"quan-ly-mau-sub"}
				icon={<DeploymentUnitOutlined />}
				title={"Quản lý mẫu"}
				className="menu-navigation__sub-menu"
			>
				<Item key="quan-ly-mau-luu" className="menu-navigation__item">
					<Link to="/quan-ly-mau-luu">Quản lý mẫu lưu</Link>
				</Item>
				<Item key="quan-ly-mau-thanh-ly" className="menu-navigation__item">
					<Link to="/quan-ly-mau-thanh-ly">Quản lý mẫu thanh lý</Link>
				</Item>
				<Item
					key="quan-ly-mau-tra-khach-hang"
					className="menu-navigation__item"
				>
					<Link to="/quan-ly-mau-tra-khach-hang">
						Quản lý mẫu trả khách hàng
					</Link>
				</Item>
				<Item key="quan-ly-mau-het" className="menu-navigation__item">
					<Link to="/quan-ly-mau-het">Quản lý mẫu hết</Link>
				</Item>
				<Item key="quan-ly-nha-thau-phu" className="menu-navigation__item">
					<Link to="/quan-ly-nha-thau-phu">Quản lý nhà thầu phụ</Link>
				</Item>
			</SubMenu> */}

        <SubMenu
          key={'quan-ly-tai-lieu-sub'}
          icon={<FolderOpenOutlined />}
          title={'Quản lý tài liệu'}
          className="menu-navigation__sub-menu"
        >
          <Item key="nhom-tai-lieu" className="menu-navigation__item">
            <Link to="/quan-ly-mau-luu">Nhóm tài liệu</Link>
          </Item>
          <Item key="tai-lieu-bieu-mau" className="menu-navigation__item">
            <Link to="/tai-lieu-bieu-mau">Tài liệu/ Biểu mẫu</Link>
          </Item>
        </SubMenu>

        <SubMenu
          key={'thong-ke-sub'}
          icon={<PieChartOutlined />}
          title={'Báo cáo/ Thống kê'}
          className="menu-navigation__sub-menu"
        >
          <Item key="thong-ke-chung" className="menu-navigation__item">
            <Link to="/thong-ke-chung">Thống kê chung</Link>
          </Item>
          <Item key="thong-ke-so-mau-nhan-tu-khach-hang" className="menu-navigation__item">
            <Link to="/thong-ke-so-mau-nhan-tu-khach-hang">Thống kê số mẫu nhận từ khách hàng</Link>
          </Item>
          <Item key="thong-ke-mau-nhan-phong-thi-nghiem" className="menu-navigation__item">
            <Link to="/thong-ke-mau-nhan-phong-thi-nghiem">Thống kê mẫu nhận phòng thí nghiệm</Link>
          </Item>
          <Item key="thong-ke-so-chi-tieu-nhan" className="menu-navigation__item">
            <Link to="/thong-ke-so-chi-tieu-nhan">Thống kê số chỉ tiêu nhận</Link>
          </Item>
          <Item key="thong-ke-tien-do-kiem-thu" className="menu-navigation__item">
            <Link to="/thong-ke-tien-do-kiem-thu">Thống kê tiến độ thử nghiệm</Link>
          </Item>
          <Item key="thong-ke-tai-lieu" className="menu-navigation__item">
            <Link to="/thong-ke-tai-lieu">Thống kê tài liệu</Link>
          </Item>
          <Item key="thong-ke-cac-su-co" className="menu-navigation__item">
            <Link to="/thong-ke-cac-su-co">Thống kê các sự cố</Link>
          </Item>
          <Item key="thong-ke-danh-sach-nhan-su" className="menu-navigation__item">
            <Link to="/thong-ke-danh-sach-nhan-su">Thống kê danh sách nhân sự</Link>
          </Item>
          <Item key="thong-ke-danh-sach-khac-hang" className="menu-navigation__item">
            <Link to="/thong-ke-danh-sach-khac-hang">Thống kê danh sách khách hàng</Link>
          </Item>
          <Item key="thong-ke-phuong-phap-thu" className="menu-navigation__item">
            <Link to="/thong-ke-phuong-phap-thu">Thống kê danh sách phương pháp thử</Link>
          </Item>
          <Item key="thong-ke-nen-mau" className="menu-navigation__item">
            <Link to="/thong-ke-nen-mau">Thống kê danh sách nền mẫu</Link>
          </Item>
          <Item key="thong-ke-chi-tieu-kiem-nghiem" className="menu-navigation__item">
            <Link to="/thong-ke-chi-tieu-kiem-nghiem">Thống kê danh sách chỉ tiêu thử nghiệm</Link>
          </Item>
        </SubMenu>

        <SubMenu
          key="system-management"
          icon={<ApartmentOutlined />}
          title={'Quản trị hệ thống'}
          className="menu-navigation__sub-menu"
        >
          <Item key="he-thong/nguoi-dung" className="menu-navigation__item">
            <Link to="/he-thong/nguoi-dung">Người dùng</Link>
          </Item>
          <Item key="he-thong/tai-khoan" className="menu-navigation__item">
            <Link to="/he-thong/tai-khoan">Tài khoản</Link>
          </Item>
        </SubMenu>
      </Menu>
    </Scrollbars>
  );
};

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
