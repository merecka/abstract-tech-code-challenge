import { version } from './package.json';
import _ from 'lodash';

/* palette for simplified single-theme (dark-only) */
const palette = {
  primary: 'hsl(17,100%,71%)',
  secondary: '#C4FF00',
  tertiary: 'rgb(0,255,240)',
  success: 'rgb(122,252,143)',
  info: '#7DDEFF',
  warning: '#ffe55d',
  danger: '#f96b8d'
};

const config  = {
  env: 'development',
  fonts: {
    body: 'Bitter',
    display: 'Big Shoulders Text',
    monospace: 'Inconsolata',
    title: 'Exo',
  },
  release: { version },
  template: { drawerWidth: 180, drawerTransitionDuration: 150 },
  theme: { ...palette, dark: { ...palette, canvas: '#232426' }}
};

const byEnv = {
  development: config,
  staging: _.defaults({ env: 'staging' }, config),
  production: _.defaults({ env: 'production' }, config)
};

export default byEnv[process.env.NODE_ENV];
