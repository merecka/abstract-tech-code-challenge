import { useGame } from './useGame';
import { useValueMemo } from '@abst/hooks';

export function usePlayer(id) {
  const Game = useGame();

  return useValueMemo(() => {
    if (!id) return null;
    const player = Game.players.findById(id);
    const team = Game.teams.findById(player?.teamId);
    return {
      ...player,
      team
    };
  }, [id]);
}
