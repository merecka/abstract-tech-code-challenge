import { useContext } from 'react';
import { GameContext } from '../Context';

export function useGame() {
  return useContext(GameContext);
}
