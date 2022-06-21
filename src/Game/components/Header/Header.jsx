import React, { useEffect, useRef } from 'react';
import { css } from './Header.style';
import { useCss } from '@abst/hooks';
import { Col, Row, Text } from '@abst/web-components';
import { useActiveRound } from '@src/Game/hooks';
import { ShotClock } from './ShotClock';
import cn from 'classnames';

export function Header(/* props */) {
  const Clock = useRef();
  const cls = useCss(css);
  const Round = useActiveRound();
  const { isCorrect, player } = Round;

  useEffect(() => {
    Clock.current.restart(() => {
      console.log('game over');
      // Game.advance();
    });
  }, [player.playerId]);
  useEffect(() => {
    if (isCorrect) Clock.current.stop();
  }, [isCorrect]);

  return (
    <Row className={ cls.wpr }><Col xs={ 1 } align='stretch'>
      <ShotClock
        className={ cn({ [cls.success]: isCorrect }) }
        autoStart={ Round.round === 0 }
        ref={ Clock }
      />
    </Col><Col xs={ 10 } justify='center' align='end'>
      <Text d2
        t={ player.displayFirstLast }
        color={ do {
          switch(isCorrect) {
            case true: 'success'; break;
            case false: 'danger'; break;
            default: 'text'; break;
          }
        } }
      />
    </Col>
    </Row>
  );
}
