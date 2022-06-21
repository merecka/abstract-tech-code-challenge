import { memo as _memo } from 'react';
import isEqual from 'react-fast-compare';

/* NOTE: on why this is here.
 *
 * This is here because if we fail to learn the lessons of history, we're
 * doomed to repeat them. React.memo is fine, but at some point, we're
 * going to find some better way to achieve basic component memoization, and
 * when that day comes, those of us who were prepared for that eventuality will
 * **NOT** be clinching our buttholes and almost having a stroke as we
 * tepidly type `npx react-convert-memo-hoc-pretty-please --dont-break` or
 * whatever into our terminals.
 *
 * History doesn't repeat itself, but it does rhyme.
 */


/**
 * @hoc memo
 * @desc memoizer for components; similar to `react`'s {@link https://reactjs.org/docs/react-api.html#reactmemo|memo}
 * hoc, but with a default equality comparer applied.
 * @alias memo
 * @memberof module:@abst/hoc
 *
 * @param {ReactComponent} Composed valid React Component
 * @param {function} [isEqual=`react-fast-compare`] props comparer
 *
 * @returns {ReactComponent} memoized component
 *
 * @example <caption>usage</caption>
 * import { View } from '@abst/web-components';
 * import { memo } from '@abst/hoc';
 *
 * const Cmp = memo(function _Cmp() {
 *   return (
 *     <View>{ null }</View>
 *   );
 * });
 */
export function memo(Composed, isEq = isEqual) { return _memo(Composed, isEq); }
