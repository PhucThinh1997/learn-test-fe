import React, { useEffect, useState } from 'react';
const StickyAction = (props) => {
  const regularDiv = {
    backgroundColor: 'white',
    borderTop: '1px solid #1890ff',
    textAlign: 'center',
    padding: '40px',
    paddingTop: '10px',
    paddingRight: '80px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    height: '60px',
    width: '100%',
  };
  const wrapperDiv = {
    display: 'block',
    padding: '40px',
    height: '20px',
    width: '100%',
  };
  return (
    <div style={{ height: '2vh' }}>
      <div style={wrapperDiv} />
      <div style={regularDiv}>
     { props.children}
        </div>
    </div>
  );
};

export default StickyAction;
