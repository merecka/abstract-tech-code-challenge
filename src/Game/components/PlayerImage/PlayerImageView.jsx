import React from 'react';
import { Text, View } from '@abst/web-components';
import cn from 'classnames';

const pfx = 'https://cdn.nba.com/headshots/nba/latest/1040x760';

export function PlayerImageView({
  player,
  cls,
  playerId,
  shadow,
  onClick,
  bg,
}) {
  return (
    <View
      className={cn(cls.wpr, { 'no-bg': bg === false, shadow })}
      role='button'
      {...{ onClick }}
    >
      {/* NOTE: uncomment this (and the import statement) to see the name of the player */}
      <Text t={`(This is ${player.displayFirstLast})`} className='cheat' />
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
