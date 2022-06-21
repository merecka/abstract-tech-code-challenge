import { useContext } from 'react';
import { DarkModeContext } from '../contexts';

export function useDarkMode() {
  return useContext(DarkModeContext);
}
