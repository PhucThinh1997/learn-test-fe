Sider menu item examples:
```jsx
import { ConnectedRouter } from 'connected-react-router';

import WrapperLayout from 'components/main/index';
import SideMenu from '../menu/index';

import NAV_ITEMS from 'static/Nav';
import history from 'utils/history';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
// styling import
import "antd/dist/antd.css";

<ConnectedRouter history={history}>
    <WrapperLayout>
        <SideMenu>
            <div className="logo-alt"/>
            <MenuItem theme="dark" defaultKey="1" items={NAV_ITEMS} />
        </SideMenu>
    </WrapperLayout>
</ConnectedRouter>

```