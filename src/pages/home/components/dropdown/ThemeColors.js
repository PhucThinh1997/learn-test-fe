import React, { useContext } from 'react';
import { useLocalStorage } from 'hooks/localStorage';

import { Dropdown } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

import ThemeColorsPicker from '../menu/ColorsPicker';
import { VARS_COLOR_KEY, COLOR_VARS, COLORS_THEME, COLORSET_KEY, THEME } from 'static/Theme';
import { updateColors, pickupThemeVars } from 'utils/theme';

import './ThemeColors.less';
import _ from 'lodash';
import { ThemeContext } from 'context/Theme';
/**
 * Application theme collection colors to support dynamic colors
 * There are supporting 5 colors change:
 * primary-color
 * secondary-color
 * text-color
 * text-color-primary
 * text-color-secondary
 * heading-color
 * @param {object} props
 */
const ThemeColors = (props) => {
  const { className } = props;
  let displayIcon = props.icon || BgColorsOutlined;

  // eslint-disable-next-line
  const context = useContext(ThemeContext);
  // eslint-disable-next-line
  const { theme, toggleTheme } = context;
  // add colorTheme state
  // eslint-disable-next-line
  const [colorTheme, setColorTheme] = useLocalStorage(COLORSET_KEY);

  // add local storage hook to save color vars into local storage
  // eslint-disable-next-line
  const [vars, setVars] = useLocalStorage(VARS_COLOR_KEY);

  const changeColorsTheme = (newColorTheme) => {
    let newVars = pickupThemeVars(theme || THEME.LIGHT);
    // take current variables and make update
    const findColor = _.find(COLORS_THEME, (c) => c.name === newColorTheme);
    _.each(COLOR_VARS, function (v, index) {
      newVars[v] = findColor.colors[index];
    });
    setColorTheme(newColorTheme);
    // save theme data to local storage
    setVars(newVars);
    // load dynamic colors
    updateColors(newVars);
  };
  // create a floating theme colors picker  menu
  const picker = (
    <ThemeColorsPicker
      className="item-color"
      themes={COLORS_THEME}
      onSelectTheme={changeColorsTheme}
    ></ThemeColorsPicker>
  );

  return (
    <Dropdown overlay={picker}>
      {React.createElement(displayIcon, {
        className: className,
      })}
    </Dropdown>
  );
};

// define propTypes

export default ThemeColors;
