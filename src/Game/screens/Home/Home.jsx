import React from 'react';
import styles from './Home.style';
import { useStyles } from '@abst/hooks';
import { Button, Col, Row, View } from '@abst/web-components';
import { useGame } from '@src/Game/hooks';

export function Home(/* props */) {
  const sty = useStyles(styles/* , props *//* , defaultProps */);
  const Game = useGame();
  return (
    <View style={ sty.wpr }>
      <Row><Col md={ 6 } justify='end'>
        <Button
          label='Play 7 Seconds Or Less'
          onClick={ () => { Game.create('7sec'); } }
          size='large'
        />
      </Col><Col md={ 6 } justify='start'>
        <Button
          disabled
          label='Play Last 2 Minutes'
          onClick={ () => { Game.create('L2M'); } }
          size='large'
        />
      </Col></Row>
    </View>
  );
}
