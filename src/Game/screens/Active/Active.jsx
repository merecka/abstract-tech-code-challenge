import React from 'react';
// import styles from './Active.style';
import { /* useStyles,  */useValueMemo } from '@abst/hooks';
// import { Text, View } from '@abst/web-components';
import { useGame } from '@src/Game/hooks';
import { SevenSec } from './SevenSec';
import { L2M } from './L2M';
import { ActiveRoundContext } from '@src/Game/Context';

function Null() { return null; }
const boards = { '7sec': SevenSec, 'l2m': L2M };

export function Active(/* props */) {
  const Game = useGame();
  const { mode } = Game.state;
  // const sty = useStyles(styles/* , props *//* , defaultProps */);
  const Board = useValueMemo(() => boards?.[mode] || Null, [mode]);

  /* context value for children */
  const value = useValueMemo(() => {
    const { round, rounds } = Game.state;
    const _round = rounds[round] || {};
    return {
      ..._round,
      id: _round.player,
      player: Game.players.findById(_round.player) || {},
      submit: Game.submit
    };
  }, [Game.state.round, Game.state.rounds[Game.state.round]]);

  return (
    <ActiveRoundContext.Provider value={ value }>
      <Board />
    </ActiveRoundContext.Provider>
  );
}
