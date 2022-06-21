import React from 'react';
import styles from './L2M.style';
import { useStyles, useValueMemo } from '@abst/hooks';
import { Col, Row, Text, View } from '@abst/web-components';
import { useGame } from '@src/Game/hooks';
import { OptionGrid } from '@src/Game/components';

export function L2M(/* props */) {
  const sty = useStyles(styles/* , props *//* , defaultProps */);
  const Game = useGame();
  const { current } = Game.state;
  const player = useValueMemo(() =>
    Game.players.findById(current.player) || {}
  , [current.player]);

  return (
    <Row nogutter style={ sty.wpr }><Col xs={ 9 } align='center'>
      <Row><Col xs={ 12 } justify='center'>
        <View style={ sty.titleWpr }>
          <Text h1 color='text' t={ player.displayFirstLast } />
        </View>
      </Col></Row>
      <OptionGrid />
      {/* streak and stuff */}
    </Col><Col xs={ 4 }>
      { null }
    </Col></Row>
  );
}
