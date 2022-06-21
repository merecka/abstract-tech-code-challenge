import React, { useCallback, useState } from 'react';
import { DarkModeContext } from '@abst/theme/contexts';

export function withDarkMode(Composed) {
  return function WithDarkMode(props) {
    /* TODO: replace with useStorage */
    const [isDark, setIsDark] = useState(true);
    const setDarkMode = useCallback((v) => { setIsDark(!!v); }, []);
    return (
      <DarkModeContext.Provider value={ isDark }>
        <Composed { ...{ ...props, setDarkMode } } />
      </DarkModeContext.Provider>
    );
  };
}
