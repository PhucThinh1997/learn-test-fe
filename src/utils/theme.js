import { LIGHT_VARS, DARK_VARS, COLORS_THEME, COLOR_VARS, THEME } from 'static/Theme';

import _ from 'lodash';
/**
 * Update theme by modifying dynamic ant default variables using less
 * @param {object} vars
 */
export function updateVarsTheme(theme) {
  let vars = pickupThemeVars(theme);
  vars = { ...vars, '@white': '#fff', '@black': '#000' };
  return updateColors(vars);
}
export function updateColors(vars) {
  return new Promise((resolve, reject) => {
    window.less
      .modifyVars(vars)
      .then(() => resolve())
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Pickup less variables from Ant design theme
 * @param {string} theme
 */
export function pickupThemeVars(theme) {
  let v = LIGHT_VARS;
  if (theme === 'dark') {
    v = DARK_VARS;
  }
  return v;
}

/**
 * Pickup less variables from Ant design theme
 * @param {string} theme
 */
export function pickupColors(colorset) {
  if (!colorset) return null;
  const findColor = _.find(COLORS_THEME, (c) => c.name === colorset);
  return findColor;
}

export const applyColors = (newColorTheme, theme) => {
  let newVars = pickupThemeVars(theme || THEME.LIGHT);
  // take current variables and make update
  const findColor = _.find(COLORS_THEME, (c) => c.name === newColorTheme);
  _.each(COLOR_VARS, function (v, index) {
    newVars[v] = findColor.colors[index];
  });

  // load dynamic colors
  updateColors(newVars);
};
