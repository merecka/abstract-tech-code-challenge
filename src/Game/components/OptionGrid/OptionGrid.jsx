import React, { useCallback } from 'react';
import { css } from './OptionGrid.style';
import { useCss } from '@abst/hooks';
import { useActiveRound } from '@src/Game/hooks';
import { View } from '@abst/web-components';
import { Option } from './Option';

export function OptionGrid(/* props */) {
  const cls = useCss(css);
  const Round = useActiveRound();

  const renderImage = useCallback((id, ind) =>
    <Option { ...{ id } } onClick={ Round.submit } key={ ind.toString() } />
  );

  return (
    <View className={ cls.wpr }>
      <View className={ cls.optGrid }>
        { _.map(Round.options, renderImage) }
      </View>
    </View>
  );
}
