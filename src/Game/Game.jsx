import React from 'react';
import styles from './Game.style';
import { useStyles, useValueMemo } from '@abst/hooks';
import {
  AnimatedSwitch,
  SectionHeader,
  View
} from '@abst/web-components';
import { useGame } from '@src/Game/hooks';
import { withData, withGame } from './hoc';
import { withReset, useReset } from '@abst/reset';
import { compose } from 'redux';
import * as screens from './screens';
import { Loader } from '@abst/loader';

const { Route } = AnimatedSwitch;

function _Game(/* props */) {
  const sty = useStyles(styles/* , props *//* , defaultProps */);
  const Game = useGame();
  const { loading, state: { phase }} = Game;
  const reset = useReset();
  const dummyPath = useValueMemo(() => `/${phase || ''}`, [phase]);

  if (Game.loading) return <Loader spinner='pacman' color='primary' />;

  return (
    <>
      <SectionHeader
        style={ sty.secHead }
        borderWidth={ 0 }
        actionButtons={ [{
          color: 'primary',
          icon: {
            name: 'undo',
            secondaryOpacity: 80,
            tooltip: { content: 'Restart Game', placement: 'left' }
          },
          borderWidth: 0,
          onClick: Game.restart,
          size: 'default'
        }, {
          icon: {
            name: 'times',
            secondaryOpacity: 80,
            tooltip: { content: 'Abort Game', placement: 'topLeft' }
          },
          color: 'warning',
          onClick: Game.abort,
          borderWidth: 0,
          size: 'default'
        }, {
          icon: {
            name: 'sync',
            opacity: 80,
            tooltip: { content: 'Reload Screen', placement: 'topLeft' }
          },
          color: 'danger.light',
          onClick: reset,
          borderWidth: 0,
          size: 'default'
        }] }
      />
      <View style={ sty.wpr }>
        {/*
        * loading ternary still exists because the children are technically
        * "rendered" even when they're not returned from ViewWrapper when
        * loadingProp is `true`, so this just ensures children won't throw
        * if, for example, a property of an undefined state prop are referenced.
        */
          !loading &&
          <AnimatedSwitch location={{ pathname: dummyPath }} type='glide'>
            <Route exact path='/' component={ screens.Home } />
            <Route path='/pregame' component={ screens.Pregame } />
            <Route path='/countdown' component={ screens.Countdown } />
            <Route path='/active' component={ screens.Active } />
            <Route path='/over' component={ screens.Over } />
          </AnimatedSwitch>
        }
      </View>
    </>
  );
}

export const Game = compose(withReset, withData, withGame)(_Game);
