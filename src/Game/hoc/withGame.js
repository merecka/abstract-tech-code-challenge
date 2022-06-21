import React, { useEffect, useMemo } from 'react';
import { useValueMemo } from '@abst/hooks';
import { useStorage, useStorageReducer } from '@abst/storage';
import { reducer } from '../lib';
import { GameContext } from '../Context';

export function withGame(Composed) {
  return function WithGame(props) {
    const DataStore = useStorage('data');
    const [GameStore, dispatch] = useStorageReducer('game', reducer);
    const players = useMemo(() => ({
      findById: (playerId) => _.find(DataStore.state.players, { playerId }),
      list: () => DataStore.state.players,
      get count() { return DataStore.state.playerCount; }
    }), []);
    // console.log(GameStore);
    const teams = useMemo(() => ({
      findById: (teamId) => _.find(DataStore.state.teams, { teamId })
    }), []);
    const lib = useMemo(() => {
      return {
        abort: async() => {
          await GameStore.setState({ phase: null });
          GameStore.reset();
        },
        advance: (phase) => dispatch('advance phase', phase),
        create: (mode = GameStore.state.mode) =>
          dispatch('create', { mode }, DataStore.state),
        get restart() {
          return async() => {
            const { mode } = GameStore.state;
            /* reset state, but set restarting flag */
            await GameStore.reset({ isRestarting: true, mode, phase: 'pregame' });
            // console.log('@reset: ', GameStore.state);
            return this.create();
          };
        },
        submit: (...args) => dispatch('submit', ...args)
      };
    }, []);

    /* listeners */
    useEffect(() => {
      const unsub1 = GameStore.subscribe('change:phase', (diff) => {
        console.log('new phase:', diff.current);
        switch(diff.current) {
          case 'over':
            dispatch('cleanup');
            break;
          default: break;
        }
      });
      /* TODO: add a 2nd listener that pre-loads the next round */
      const unsub2 = GameStore.subscribe('change:round', (diff, store) => {
        if (
          _.isFinite(diff.current) &&
          !store.state.rounds[diff.current + 1]
        ) {
          console.log('@listener: pre-loading round', diff.current + 1);
          dispatch('add round');
        }
      });
      return () => { unsub1(); unsub2(); };
    }, []);

    const value = useValueMemo(() => {
      return {
        ...lib,
        players,
        teams,
        loading: DataStore.state.loading,
        get state() { return GameStore.state; }
      };
    }, [DataStore.state.loading]);

    return (
      <GameContext.Provider value={ value }>
        <Composed { ...props } />
      </GameContext.Provider>
    );
  };
}
