import isEqual from 'react-fast-compare';
import { memo } from 'react';

/**
 * @hoc deepMemo
 * @desc deprecated component memoizer; use {@link memo} instead
 * @alias deepMemo
 * @memberof module:@abst/hoc
 *
 * @param {ReactComponent} Composed valid React Component
 *
 * @returns {ReactComponent} memoized component
 * @deprecated functionality has been folded into {@link memo}
 *
 * @example <caption>usage</caption>
 * import { View } from '@abst/web-components';
 * import { deepMemo } from '@abst/hoc';
 *
 * const Cmp = deepMemo(function _Cmp() {
 *   return (
 *     <View>{ null }</View>
 *   );
 * });
 */
export function deepMemo(Composed) { return memo(Composed, isEqual); }
