import { useEffect } from 'react';
import { useValueMemo } from '@abst/hooks';
import { useGame } from './useGame';


export function useRound(index) {
  const Game = useGame();
  useEffect(() => {
    if (!_.isFinite(index)) {
      throw new Error(
        'useRound requires a round index; use `useActiveRound` to get current round data'
      );
    }
  }, []);

  return useValueMemo(() => {
    const round = Game.state.rounds[index];
    const player = Game.players.findById(round.player) || {};

    return {
      ...round,
      id: round.player,
      player,
      team: Game.teams.findById(player.teamId) || {}
    };
  }, [Game.state.rounds[index]]);
}
