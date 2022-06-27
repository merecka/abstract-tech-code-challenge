import React from 'react';
import { css } from './PlayerImage.style';
import { useCss } from '@abst/hooks';
import { usePlayer } from '@src/Game/hooks';
import { PlayerImageView } from './PlayerImageView';

const pfx = 'https://cdn.nba.com/headshots/nba/latest/1040x760';

export function PlayerImage({
  bg,
  playerId,
  maxHeight,
  shadow = true,
  onClick,
}) {
  const player = usePlayer(playerId);
  const cls = useCss(css, {
    bg,
    maxHeight,
    teamColors: player?.team?.colors,
  });

  if (!_.isFinite(playerId)) return null;

  return (
    <PlayerImageView
      player={player}
      cls={cls}
      playerId={playerId}
      shadow={shadow}
      onClick={onClick}
      bg={bg}
    />
  );
}
