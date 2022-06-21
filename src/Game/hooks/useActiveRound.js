import { useContext } from 'react';
import { ActiveRoundContext } from '@src/Game/Context';

export function useActiveRound() {
  return useContext(ActiveRoundContext);
}
