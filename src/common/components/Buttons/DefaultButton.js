import React from 'react';
import { Button } from 'antd';
function DefaultButton(props) {
  return <Button type="default" size="small" {...props} />;
}

DefaultButton.propTypes = {};

export default DefaultButton;
