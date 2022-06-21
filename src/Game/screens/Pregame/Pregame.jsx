import React from 'react';
// import styles from './Pregame.style';
// import { useStyles } from '@abst/hooks';
import { Loader } from '@abst/loader';

export function Pregame(/* props */) {
  // const sty = useStyles(styles/* , props *//* , defaultProps */);
  return <Loader fill spinner='pacman' color='primary' />;
}
