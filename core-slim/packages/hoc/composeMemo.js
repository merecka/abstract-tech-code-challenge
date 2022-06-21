import { memo } from './memo';
import { compose } from 'redux';

/**
 * @hoc composeMemo
 * @desc creates a memoized component composed with other HOCs
 * @alias composeMemo
 * @memberof module:@abst/hoc
 *
 * @param {ReactComponent} Composed valid React Component
 *
 * @returns {ReactComponent} memoized component with other HOCs applied
 *
 * @example <caption>usage</caption>
 * import { View } from '@abst/web-components';
 * import { composeMemo } from '@abst/hoc';
 *
 * const Cmp = composeMemo(function _Cmp() {
 *   return (
 *     <View>{ null }</View>
 *   );
 * }, extraHoc1, extraHoc2);
 */
export function composeMemo(Composed, ...hocs) {
  return compose(...hocs)((memo(Composed)));
}
