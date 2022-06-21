import React from 'react';
import { useValueMemo } from '@abst/hooks';
import { View } from '@abst/web-components';
import { PlayerImage } from '@src/Game/components';
import moment from 'moment';

export function Option({ id, onClick }) {
  const loadTime = useValueMemo(() => new Date(), [id]);
  return (
    <View className='option-wpr'><View className='option'>
      <PlayerImage bg
        playerId={ id }
        maxHeight='24vh'
        onClick={ () => {
          /* NOTE: the -1500 part accounts for load times, etc */
          const delay = _.round((moment().diff(loadTime) - 1500) / 1000, 1);
          onClick(id, {
            delay,
            score: _.round((7 - delay) * 100 / 7)
          });
        } }
      />
    </View></View>
  );
}
