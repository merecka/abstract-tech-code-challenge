import { useCallback, useMemo } from 'react';
import { useEffectOnce, useMediatedState } from 'react-use';
import { useDidUpdate } from './useDidUpdate';

/**
 * @hook useCustomMediatedValue
 * @desc {@link useMediatedValue}, with a custom equality function
 * @alias useCustomMediatedValue
 * @memberof module:@abst/useCustomMediatedValue
 *
 * @param {function} mediator function to apply to value before setting it;
 * accepts deps as arguments
 * @param {function} isEqual function to determine when value has changed
 * @param {...any} ...deps dependencies to pass to mediator; called when
 * any dep value changes.
 *
 * @returns {any} value derived from mediator function
 *
 * @example <caption>usage</caption>
 * import { useCustomMediatedValue } from '@abst/useMediatedValue';
 * function eqCheck(pVal, val) { return pVal !== val }
 *
 * function Sfc() {
 *   const mediatedValue = useCustomMediatedValue(function mediatior(v) {
 *     return _.toString(v);
 *   }, eqCheck, value);
 * }
 */
export function useCustomMediatedValue(mediator, isEqual, ...deps) {
  useEffectOnce(() => {
  /* ensure mediator */
    if (!_.isFunction(mediator)) {
      throw new Error(`\
      first argument provided to useCustomMediatedValue must be a function; \
      received ${typeof mediator}.\
      `);
    }

    if (!_.isFunction(isEqual)) {
      throw new Error(`\
  second argument provided to useCustomMediatedValue must be a function; \
  received ${typeof isEqual}.\
      `);
    }
  });

  const cb = useCallback(([..._deps]) => mediator(..._deps), []);
  const initialValue = useMemo(() => cb([...deps]), []);
  const [value, setValue] = useMediatedState(cb, initialValue);
  useDidUpdate((...pDeps) => {
    if (!isEqual(pDeps, deps)) setValue([...deps]);
  }, ...deps);
  return value;
}
