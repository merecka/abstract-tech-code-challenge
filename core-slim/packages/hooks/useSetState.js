import { useCallback, useMemo, useRef } from 'react';
import { useUpdate } from './useUpdate';

export function useSetState(initialState) {
  const update = useUpdate();
  /* pseudo-clone initial state; also ensure it's an object in ref */
  const iState = useMemo(() => ({ ...(initialState?.() || initialState) }), []);
  const state = useRef(iState);
  const setState = useCallback((nState, cb) => {
    if (_.isPlainObject(nState)) _.assign(state.current, nState);
    update();
    cb?.();
  });
  return [state.current, setState];
}
