import { useContext } from 'react';
import { ResetContext } from './ResetContext';

export function useReset() {
  const provider = useContext(ResetContext);
  return provider?.handleReset;
}
