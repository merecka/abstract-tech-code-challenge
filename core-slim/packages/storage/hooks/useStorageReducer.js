import { useEffect, useMemo } from 'react';
import { useUpdate } from '@abst/hooks';
import { useStorage } from './useStorage';
import isEq from 'react-fast-compare';

export function useStorageReducer(
key,
reducer,
{ emitActions, ...storeConf } = {}
) {
  const update = useUpdate();
  const store = useStorage(key, storeConf);

  const dispatch = useMemo(() => async(type, payload, meta) => {
    /* snapshot copy of state for post-action emit */
    const prev = _.clone({ ...store.state });
    let current = prev;
    const action = { type, payload, meta };
    try {
      /* process reducer */
      /* NOTE: spread creates a mutable state obj - DO NOT CHANGE */
      const nState = await reducer({ ...prev }, action, store);
      /* hard-set state */
      current = await store.writeNewState(nState);
      /* return new state from dispatch */
      return current;
    } finally {
      if (emitActions !== false) {
        store.emit(type, { current, prev, action: { type, meta, payload }});
      }
    }
  }, [key]);

  useEffect(() => {
    /* when state changes, force a re-render */
    const unSub = store.subscribe('change', ({ current, prev }) => {
      if (!isEq(prev, current)) { update(); }
    });
    return unSub; /* turn off listener on unmount */
  }, []);

  return [store, dispatch];
}
