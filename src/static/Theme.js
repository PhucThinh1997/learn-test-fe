import darkVars from '../themes/dark.json';
import lightVars from '../themes/light.json';

// list application theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};
// app theme key name
export const DEFAULT_VARS = lightVars;
export const DARK_VARS = darkVars;
export const LIGHT_VARS = lightVars;
export const DEFAULT_THEME = 'light';
export const THEME_KEY = 'theme';
export const VARS_COLOR_KEY = 'vars-color';
export const COLORSET_KEY = 'colors-set';

// list dynamic variable colors
export const COLOR_VARS = ['@primary-color', '@link-color', '@text-color', '@text-color-secondary', '@heading-color'];
// list dynamic colors
export const COLORS_THEME = [
  {
    name: 'Sunset',
    colors: ['#ef4f86', '#e85566', '#f47b5a', '#f9ac5e', '#f9dd67'],
  },
  {
    name: 'Green till Dawn',
    colors: ['#1b8851', '#42aa1f', '#7ac800', '#9dcf00', '#e2c800'],
  },
  {
    name: 'Default',
    colors: ['@blue-6', '@primary-color', 'fade(@black, 65%)', 'fade(@black, 45%)', 'fade(#000, 85%)'],
  },
];
