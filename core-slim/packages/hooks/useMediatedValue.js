import { useCallback, useMemo } from 'react';
import { useMediatedState } from 'react-use';
import { useDidUpdate } from './useDidUpdate';
import isEqual from 'fast-deep-equal';

/**
 * @hook useMediatedValue
 * @desc `react-use`'s {@link https://github.com/streamich/react-use/blob/master/docs/useMediatedState.md|useMediatedState}
 * for complex values
 * @alias useMediatedValue
 * @memberof module:@abst/useMediatedValue
 *
 * @param {function} mediator function to apply to value before setting it;
 * accepts deps as arguments
 * @param {...any} ...deps dependencies to pass to mediator; called when
 * any dep value changes.
 *
 * @returns {any} value derived from mediator function
 *
 * @example <caption>usage</caption>
 * import { useMediatedValue } from '@abst/useMediatedValue';
 *
 * function Sfc() {
 *   const mediatedValue = useMediatedValue(function mediatior(v) {
 *     return _.toString(v);
 *   }, value);
 * }
 */
export function useMediatedValue(mediator, ...deps) {
  /* ensure mediator */
  if (!_.isFunction(mediator)) {
    throw new Error(`\
first argument provided to useMediatedValue must be a function; \
received ${typeof mediator}.\
    `);
  }
  const cb = useCallback(([..._deps]) => mediator(..._deps), []);
  const initialValue = useMemo(() => cb([...deps]), []);
  const [value, setValue] = useMediatedState(cb, initialValue);
  useDidUpdate((...pDeps) => {
    if (!isEqual(pDeps, deps)) setValue([...deps]);
  }, ...deps);
  return value;
}
