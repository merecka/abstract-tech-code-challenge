import React, { forwardRef } from 'react';
import { ThemeContext }  from '../contexts';
import { useThemeLib } from '../hooks/useThemeLib';
import { useTheme } from '../hooks/useTheme';

export const withSubTheme = (conf) => (Composed) => {
  return forwardRef(function WithSubTheme(props, ref) {
    const [{ palette, ...parentTheme }] = useTheme();

    const value = useThemeLib({
      parentPalette: palette,
      ...conf,
      parentTheme,
      isSubTheme: true,
    });

    return (
      <ThemeContext.Provider value={ value }>
        <Composed { ...{ ...props, ref } } />
      </ThemeContext.Provider>
    );
  });
};
