import React from 'react';
import { Menu } from 'antd';

const ThemeColorsPicker = (props) => {
  const { className, themes, onSelectTheme } = props;

  return (
    <Menu
      //selectedKeys={[theme]}
      onClick={(e) => {
        onSelectTheme(e.key);
      }}
    >
      {themes.map((color, index) => (
        <Menu.Item key={color.name}>
          <div className={className}>{color.name}</div>
          {color.colors.map((c, index) => {
            return <span key={index} style={{ backgroundColor: c }} className={className}></span>;
          })}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ThemeColorsPicker;
