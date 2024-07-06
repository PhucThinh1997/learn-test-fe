import React from 'react';
import { Button } from 'antd';
function DangerButton(props) {
  return <Button danger size="small" {...props} />;
}

DangerButton.propTypes = {};

export default DangerButton;
