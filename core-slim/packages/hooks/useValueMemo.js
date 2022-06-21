import { useEffect, useMemo, useRef } from 'react';
import { useDidUpdate } from './useDidUpdate';
import { useUpdate } from './useUpdate';
import isEqual from 'react-fast-compare';

/**
 * @hook useValueMemo
 * @desc basically `useMemo` for complex values
 * @alias useValueMemo
 * @memberof module:@abst/hooks
 *
 * @param {function} memo memo function
 * @param {array<any>} deps secondary dependencies to monitor
 *
 * @returns {any} value
 *
 * @example <caption>usage</caption>
 * import { useValueMemo } from '@abst/hooks';
 *
 * function Sfc() {
 *   const Value = useValueMemo(function memo() {}, [...deps]);
 * }
 */
export function useValueMemo(memo, deps = []) {
  useEffect(() => {
    if (!_.isArray(deps)) {
      throw new Error('second argument supplied to useValueMemo must be an array');
    }
  }, [typeof deps]);

  const isFn = useMemo(() => _.isFunction(memo), [typeof memo]);
  const initialValue = useMemo(isFn ? memo : () => memo, [isFn]);
  const update = useUpdate();
  const value = useRef(initialValue);

  useDidUpdate((pDeps) => {
    if (!isEqual(pDeps, deps)) {
      value.current = isFn ? memo() : memo;
      update();
    }
  }, deps);

  return value.current;
}
