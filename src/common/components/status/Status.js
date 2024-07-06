import React from 'react';
import "./status.less"

const Status = (props) => {
  const { text, color, bgColor, keys = 'success' } = props;
  const listEnum =
  {
    success: {
      color: "green",
      backgroundColor: "#b7eb8f"
    },
    error: {
      color: "#f55442",
      backgroundColor: "#ffccc7"
    },
    info: {
      color: "#1890ff",
      backgroundColor: "#91caff",
    },
    warning: {
      color: "#f56a00",
      backgroundColor: "#fccca7",
    }
  }

  return (
    <div className='status-color-alert' style={{ color: listEnum[keys].color, backgroundColor: listEnum[keys].backgroundColor }}>
      {text}
    </div>

  );
};

export default Status;
