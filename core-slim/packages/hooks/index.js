/**
 * @module @abst/hooks
 * @desc > A potpourri of useful hooks that can do just about anything.
 */

export * from './createAsyncReducerContext';
export * from './useAsyncReducer';
export * from './useCss';
export * from './useCustomCss';
export * from './useCustomMediatedValue';
export * from './useCustomStyles';
export * from './useDidUpdate';
export * from './useGetSetState';
export * from './useGetValue';
export * from './useMeasure';
export * from './useMediatedValue';
export * from './useMountedDispatch';
export * from './usePropAccessor';
export * from './useSetState';
export * from './useStyles';
export * from './useUpdate';
export * from './useValue';
export * from './useValueMemo';

/**
 * @typedef {function} CoreReducer
 * @desc function used to derive state in
 * {@link https://reactjs.org/docs/hooks-reference.html#usereducer|useReducer}-style
 * hooks, standardized for use in Hub.
 * @alias CoreReducer
 * @memberof module:@abst/hooks
 *
 * @param {object} state current state
 * @param {object} action action, description
 * @param {string} action.type type name
 * @param {any}    [action.payload] payload for the action
 * @param {any}    [action.meta] in core reducers, the third argument passed to
 *                               {@link CoreDispatch}
 */

/**
 * @typedef {object} CoreState
 * @desc state returned from a {@link CoreReducer} function
 * @alias CoreState
 * @memberof module:@abst/hooks
 */

/**
 * @typedef {function} CoreDispatch
 * @desc modified dispatch function for {@link CoreReducer}s. Critically,
 * the modified dispatch is asyncified, allowing for something like
 * `await dispatch('action');` to be used. However, the asyncification is
 * currently primarly for sequencing purposes across companion functions; it
 * will not `await` finalization of the subsequent state changes.
 * @alias CoreDispatch
 * @memberof module:@abst/hooks
 * @param {string}  type action type name
 * @param {any}     [payload] action payload
 * @param {any}     [meta] additional data to pass to the reducer
 */

/**
 * @typedef {function} CoreStyleGenerator
 * @desc function used to generate styles for various style-related hooks
 * @alias CoreStyleGenerator
 * @memberof module:@abst/hooks
 *
 * @param {CoreTheme} theme theme instance; may have additional values in some hooks
 * @param {object} props props passed to generator via hook, with defaults applied
 *
 * @returns {object} generally always returns an object; see specific hook
 * documentation for details
 *
 * @example <caption>basic usage</caption>
 * export default (theme, props) => {
 *   return {
 *     wpr: {}
 *   }
 * };
 */
