import { useValueMemo } from '@abst/hooks';
import { useGame } from './useGame';

export function useRounds() {
  const Game = useGame();
  return useValueMemo(() => {
    return {
      all: Game.state.rounds,
      complete: _.filter(Game.state.rounds, { isComplete: true }),
      current: Game.state.rounds[Game.state.round] || {},
      next: Game.state.rounds[Game.state.round + 1] || {}
    };
  }, [Game.state.rounds, Game.state.round]);
}
