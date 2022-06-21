import { useEffect, useMemo, useRef } from 'react';
import { useDidUpdate } from './useDidUpdate';
import { useValueMemo } from './useValueMemo';
import { useUpdate } from './useUpdate';

import isEqual from 'fast-deep-equal';

/**
 * @hook useValue
 * @desc complex value memoizer; only updates when the value itself or secondary
 * dependencies change. This is a particularly useful when passing a complex or
 * expensive value (i.e. a large object) to a bunch of children at once.
 * @alias useValue
 * @memberof module:@abst/hooks
 *
 * @param {any} value value to memoize
 * @param {array<any>} deps secondary dependencies to monitor
 *
 * @returns {any} value
 *
 * @example <caption>usage</caption>
 * import { useValue } from '@abst/hooks';
 *
 * function Sfc() {
 *   const Value = useValue(value, [...deps]);
 * }
 */
export function useValue(_value, deps = []) {
  useEffect(() => {
    if (!_.isArray(deps)) {
      throw new Error('second argument supplied to useValue must be an array');
    }
  }, [_.isArray(deps)]);

  /* was a function initially */
  const isFn = useMemo(() => _.isFunction(_value), []);
  if (isFn) return useValueMemo(_value, deps);

  const initialValue = useMemo(() => _value, []);
  const value = useRef(initialValue);
  const update = useUpdate();

  useDidUpdate(({ _value: pVal }, pDeps) => {
    /* value itself has changed OR deps have change */
    if (!isEqual(_value, pVal) || !isEqual(pDeps, deps)) {
      value.current = _value;
      update();
    }
  }, { _value }, deps);

  return value.current;
}
