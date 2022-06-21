import React from 'react';
import styles from './SevenSec.style';
import { useStyles } from '@abst/hooks';
import { Col, Row } from '@abst/web-components';
import { Header, OptionGrid, Scoreboard } from '@src/Game/components';

export function SevenSec(/* props */) {
  const sty = useStyles(styles/* , props *//* , defaultProps */);

  return (
    <Row style={ sty.wpr } align='center'>
      <Col xs={ 9 } innerStyle={ sty.colCtr } align='end'>
        <Header />
      </Col>
      <Col xs={ 3 } /* TODO: move restart/quit btns here */ />
      <Col innerStyle={ sty.colCtr } xs={ 9 } align='center'>
        <OptionGrid />
      </Col><Col xs={ 3 } style={ sty.scoreboardWpr } align='stretch'>
        <Scoreboard />
      </Col></Row>
  );
}
