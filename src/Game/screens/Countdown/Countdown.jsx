import React, { useEffect, useRef } from 'react';
import styles from './Countdown.style';
import { useStyles, useUpdate } from '@abst/hooks';
import { Text, View } from '@abst/web-components';
import { useGame } from '@src/Game/hooks';

export function Countdown(/* props */) {
  const sty = useStyles(styles/* , props *//* , defaultProps */);
  const update = useUpdate();
  const Val = useRef(3);

  const Game = useGame();

  useEffect(() => {
    if (Val.current <= 0) { Game.advance(); }
  }, [Val.current]);

  /* clear timeout if unmount occurs early */
  useEffect(() => {
    const Int = setInterval(() => {
      Val.current = Val.current - 1;
      update();
    }, 1000);

    return () => { clearInterval(Int); };
  }, []);

  return (
    <View style={ sty.wpr }>
      <Text d1 t={ Val.current.toString() } />
    </View>
  );
}
