import React from 'react';
import PropTypes from 'prop-types';
import { notification, Button } from 'antd';

/**
 * A Critical Notification component display message
 * @author
 */
const CriticalMessage = (props) => {
  const { type, title, content, duration, onClose } = props;
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );

  return notification[type]({
    message: title,
    description: content,
    key,
    btn,
    duration,
    close: onClose,
  });
};

CriticalMessage.propTypes = {
  /**
   * notification type
   */
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /**
   * Critical message title
   */
  title: PropTypes.string,
  /**
   * Critical message content
   */
  content: PropTypes.string,
};

export default CriticalMessage;
