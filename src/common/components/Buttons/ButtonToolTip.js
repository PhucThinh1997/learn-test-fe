import { Button, Divider, Space, Tooltip } from 'antd';
import React from 'react';
const ButtonTooltip = (props) => (
  <>
    <Space wrap>
      <Tooltip title={props?.tip} color="blue" key="blue">
        {props.children}
      </Tooltip>
    </Space>
  </>
);
export default ButtonTooltip;




// import React from 'react';
// import { Button } from 'antd';

// function ButtonToolTip(props) {
//   return <Button type="primary" size="small" {...props} />;
// }

// ButtonToolTip.propTypes = {};

// export default ButtonToolTip;
