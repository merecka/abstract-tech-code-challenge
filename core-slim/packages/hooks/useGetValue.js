import { useCallback, useMemo } from 'react';
import { useGetSet } from 'react-use';
import { useDidUpdate } from './useDidUpdate';
import isEq from 'fast-deep-equal';

/**
 * @hook useGetValue
 * @desc `react-use`'s {@link https://github.com/streamich/react-use/blob/master/docs/useGetSet.md|useGetSet}
 * @alias useGetValue
 * @memberof module:@abst/hooks
 *
 * @param {function} setter value setter; receives deps as arguments
 * @param {...any} ...deps dependencies to pass to setter; value updates when
 * any dep value changes.
 *
 * @returns {function} getter
 *
 * @example <caption>usage</caption>
 * import { useGetValue } from '@abst/hooks';
 *
 * function Sfc() {
 *   const GetValue = useGetValue(function setter(...deps) {}, ([...deps]));
 * }
 */
export function useGetValue(_setter, ...deps) {
  const setter = useCallback(_setter, []);
  const initialValue = useMemo(() => setter(...deps), []);
  const [getValue, setValue] = useGetSet(initialValue);

  useDidUpdate((...prev) => {
    if (!isEq(prev, ...deps)) setValue(setter(...deps));
  }, ...deps);

  return getValue;
}
