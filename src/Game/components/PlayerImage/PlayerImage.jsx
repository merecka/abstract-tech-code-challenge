import React from 'react';
import { css } from './PlayerImage.style';
import { useCss } from '@abst/hooks';
import { /*Text ,*/ View } from '@abst/web-components';
import { usePlayer } from '@src/Game/hooks';
import cn from 'classnames';

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
    <View
      className={cn(cls.wpr, { 'no-bg': bg === false, shadow })}
      role="button"
      {...{ onClick }}
    >
      {/* NOTE: uncomment this (and the import statement) to see the name of the player */}
      {/* <Text t={`(This is ${player.displayFirstLast})`} className="cheat" /> */}
      <img
        src={`${pfx}/${playerId}.png`}
        onError={(e) => {
          e.currentTarget.onerror = null; // prevents endless looping
          e.currentTarget.src = `${pfx}/logoman.png`;
        }}
      />
    </View>
  );
}
