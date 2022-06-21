import { useState } from 'react';
import { useDeepCompareEffect, usePreviousDistinct } from 'react-use';
import isEqual from 'fast-deep-equal';

/**
 * @hook useDidUpdate
 * @desc a `componentDidUpdate`-like hook; runs an onChange function on all but
 * first change in dependencies
 * @alias useDidUpdate
 * @memberof module:@abst/hooks
 *
 *
 *
 * @param {function} onChange callback to run; receives previous values of all
 * dependencies in the order they're passed to hook.
 * @param {...any} ...deps values to watch for changes
 *
 * @example <caption>usage</caption>
 * import { useDidUpdate } from '@abst/hooks';
 *
 * function Sfc({ val1, val2 }) {
 *   const DidUpdate = useDidUpdate((pVal1, pVal2) => {
 *     if (pVal2 !== val2) console.log(`new val2: ${val2}`);
 *   }, val1, val2);
 * }
 */
export function useDidUpdate(onChange, ...deps) {
  const [first, setFirst] = useState(true);
  const pDeps = usePreviousDistinct(deps);

  useDeepCompareEffect(() => {
    if (!first && !isEqual(deps, pDeps)) onChange(...pDeps);
    else if (first) setFirst(false);
  }, deps);
}
