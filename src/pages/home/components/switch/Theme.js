import React, { useEffect, useContext, useRef } from 'react';
import { Switch, message } from 'antd';

import { useLocalStorage } from 'hooks/localStorage';
import { ThemeContext } from 'context/Theme';
import { THEME, VARS_COLOR_KEY, THEME_KEY, COLORSET_KEY, COLOR_VARS } from 'static/Theme';
import { pickupThemeVars, pickupColors, updateColors } from 'utils/theme';
import _ from 'lodash';
/**
 * A toggle component to switch theme between dark & light
 * @param {object} props
 */
function ToggleTheme(props) {
  // add local storage hook to save color vars into local storage
  // eslint-disable-next-line
  const [vars, setVars, clearVars] = useLocalStorage(VARS_COLOR_KEY, () => {
    const localVars = localStorage.getItem(VARS_COLOR_KEY);
    return localVars;
  });
  // eslint-disable-next-line
  const [name, setName, clearName] = useLocalStorage(THEME_KEY, THEME.LIGHT);
  // theme context
  const context = useContext(ThemeContext);
  const { theme, toggleTheme } = context;
  let newVars = useRef(null);
  let findColor = useRef(null);

  /**
   * Update dynamic theme color variable
   * @param {string} theme
   */
  function changeColorVars(theme) {
    newVars.current = pickupThemeVars(theme);
    const colorTheme = JSON.parse(localStorage.getItem(COLORSET_KEY));

    if (!newVars.current) {
      return;
    }
    if (colorTheme) {
      findColor.current = pickupColors(colorTheme);
      findColor.current &&
        _.each(COLOR_VARS, function (v, index) {
          newVars.current[v] = findColor.current.colors[index];
        });
    }
    return newVars.current;
  }

  useEffect(() => {
    let currentVars = changeColorVars(theme);
    updateColors(currentVars)
      .then()
      .catch((error) => message.error(`Fail to switch theme ${theme}`));
  }, [theme]);

  return (
    <Switch
      {...props}
      checkedChildren={THEME.LIGHT}
      unCheckedChildren={THEME.DARK}
      checked={theme === THEME.LIGHT}
      onChange={(checked) => {
        const name = checked ? THEME.LIGHT : THEME.DARK;
        // update local storage
        setName(name);
        // update theme name
        toggleTheme(name);
        // take latest variables
        let currentVars = changeColorVars(name);
        // run update colors
        updateColors(currentVars)
          .then()
          .catch((error) => {
            clearVars();
            message.error(`Fail to switch theme ${theme}`);
          });
      }}
    ></Switch>
  );
}

export default ToggleTheme;
