import { useCallback, useMemo } from 'react';
import { useMountedState } from 'react-use';
import asyncify from 'async/asyncify';
function noop() {}

/**
 * @hook useMountedDispatch
 * @desc creates a wrapper around the provided dispatch function that prevents
 * it from running after a component has unmounted and allows it to be used
 * in chained promises.
 * @alias useMountedDispatch
 * @memberof module:@abst/hooks
 *
 * @param {function} dispatch dispatch function to wrap
 * @param {function} [callback=noop] callback to fire after dispatch runs;
 * in state-getters, this will typically be `useUpdate` or similar
 *
 * @returns {CoreDispatch} async wrapped dispatch
 *
 * @example <caption>usage</caption>
 * import { useMountedDispatch } from '@abst/hooks';
 *
 * function Sfc() {
 *   const pseudoAsyncDispatch = useMountedDispatch(dispatch, callback);
 * }
 */
export function useMountedDispatch(dispatchSync, cb = noop) {
  const isMounted = useMountedState();
  /* turn dispatch into proper async function */
  const dispatchAsync = useMemo(() => asyncify(dispatchSync), []);

  /* create a wrapper that returns a promise */
  const dispatch = useCallback((type, payload, meta) =>
    new Promise(async(res, rej) => {
      try {
        if (isMounted()) {
          await dispatchAsync({ type, payload, meta }, () => Promise.resolve());
          cb();
        } return res();
      } catch(e) { return rej(e); }
    })
  , []);
  return dispatch;
}
