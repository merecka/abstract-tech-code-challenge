import React from 'react';
import { compose } from 'redux';
import { useDidUpdate, useValue } from '@abst/hooks';
import { ThemeContext } from '../contexts';
import { useThemeLib } from '../hooks/useThemeLib';
import { updateLessVars } from '../lib/updateLessVars';
import { withDarkMode as dftWithDarkMode } from './withDarkMode';
import { useLifecycles } from 'react-use';
import isEqual from 'fast-deep-equal';
import { withSidebar } from '@abst/sidebar';

function createWithTheme(conf = {}) {
  return function __withTheme(Composed) {
    return function WithTheme({ setDarkMode, ...rest }) {
      const value = useThemeLib({ ...conf, setDarkMode });
      const colors = useValue(_.pick(value[0], ['colors']), []);

      /* update LESS when colors change */
      useLifecycles(() => { updateLessVars(colors); });
      useDidUpdate((pClrs) => {
        if (!isEqual(pClrs, colors)) updateLessVars(colors);
      }, colors);

      return (
        <ThemeContext.Provider value={ value }>
          <Composed { ...rest }/>
        </ThemeContext.Provider>
      );
    };
  };
}

export const withTheme = ({
  withDarkMode = dftWithDarkMode,
  ...conf
} = {}) => compose(withDarkMode, createWithTheme(conf), withSidebar);
