import { useCallback, useMemo, useReducer, useRef } from 'react';
import { useUpdate } from 'react-use';
import { useMountedDispatch } from './useMountedDispatch';
import { useDidUpdate } from './useDidUpdate';
import isEqual from 'fast-deep-equal';

const noop = () => {};

/**
 * @hook useAsyncReducer
 * @desc modified {@link https://reactjs.org/docs/hooks-reference.html#usereducer|useReducer}
 * with {@link CoreDispatch}
 * @alias module:@abst/hooks#useAsyncReducer
 *
 * @param {CoreReducer} reducer state reducer fn
 * @param {CoreState} [initialState] initial state
 * @param {object} [conf] config object
 * @param {boolean} [conf.getter=false] whether getter should be returned instead
 * of the plain state object. If getter is used, re-eval occurs each time a
 * value within state changes. **When getter is used, state should not contain
 * any functions, or eval will be forced on every render**.
 * @param {boolean} [conf.getState] alias of `conf.getter`
 *
 * @returns {array} [{@link CoreState}, {@link CoreDispatch}]
 *
 * @example <caption>usage</caption>
 * import { useAsyncReducer } from '@abst/hooks';
 *
 * function Sfc() {
 *   const [state, dispatch] = useAsyncReducer(reducer, initialState);
 * }
 *
 *
 * @example <caption>usage with getter</caption>
 * import { useAsyncReducer } from '@abst/hooks';
 *
 * function Sfc() {
 *   const [state] = useAsyncReducer(reducer, initialState);
 *   const [getState] = useAsyncReducer(reducer, initialState, { getter: true });
 *
 *   // value returned will not update with state
 *   const getRegVal = useCallback(() => state.val, []);
 *
 *   // value returned changes with state
 *   const getLitVal = useCallback(() => getState().val, [])
 * }
 */
export function useAsyncReducer(reducer, initialState = {}, conf = {}) {
  const hasGetState = useMemo(() => (conf.getState || conf.getter), []);
  const [state, dispatchSync] = useReducer(reducer, initialState);
  const update = useUpdate();
  const callback = useMemo(() => hasGetState ? update : noop, []);
  const dispatch = useMountedDispatch(dispatchSync, callback);

  if (hasGetState) {
    const _state = useRef(initialState);
    const getState = useCallback(() => _state.current, []);
    useDidUpdate((pState) => {
      if (!isEqual(pState, state)) { _.assign(_state.current, state); }
    }, state);
    return [getState, dispatch];
  }

  return [state, dispatch];
}
