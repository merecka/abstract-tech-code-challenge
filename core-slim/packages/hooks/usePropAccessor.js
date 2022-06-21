import { useMemo } from 'react';
import { useMediatedValue } from './useMediatedValue';
import cn from 'classnames';

const dFalsy = [false, null, undefined];
function pass(v) { return v; }
function toNull() { return null; }
function getter(accessor) { return (v) => _.get(v, accessor); }
function createGet(accessor) {
  /* if no accessor exists, return props directly */
  if (!accessor) return pass;
  /* if function, use that */
  if (_.isFunction(accessor)) return accessor;
  /* if string/array, create getter using getter/setter */
  if (_.isString(accessor) || _.isArray(accessor)) return getter(accessor);
  /* otherwise, always return null :( */
  return toNull;
}

/** @hook usePropAccessor
 * @desc prop value transformer; can be used to transform a single prop or
 * or extract/transform a value from larger props object.
 *
 * > NOTE: all config options are memoized
 *
 * @alias usePropAccessor
 * @memberof module:@abst/hooks
 * @returns {any} return type determined by configuration
 *
 * @param {object} props part or all of a props object, or just the raw value
 * @param {object} config config object
 * @param {(boolean|string)} [config.className]
 * @param {object} [config.defaults] default values to apply to return object
 * @param {array} [config.falsyValues] array of raw values that should evaluate to null
 * @param {PropAccessor} [config.from] value extraction configuration
 * @param {array} [config.pass] parent props to pass directly to returned value
 * @param {function} [config.transform] return value manipulator; called
 * immediately before parsed value is returned
 * @param {PropAccessor} [config.to='value'] value insertion configuration
 *
 * @example <caption>Standard Usage</caption>
 * import { usePropAccessor } from '@abst/hooks';
 * import { Text } from '@abst/web-components';
 * function Sfc(props) {
 *   const title = usePropAccessor(props, {
 *      from: 'title',
 *      to: 'children',
 *      defaults: { h1: true, color: 'secondary' },
 *      transform: (val) => ({ ...val, children: _.startCase(val.children) })
 *   });
 *
 *   return <div>{ title && <Text { ...title } /> }</div>;
 * }
 *
 * @example <caption>Single-Prop Usage</caption>
 * import { usePropAccessor } from '@abst/hooks';
 * import { Text } from '@abst/web-components';
 * function Sfc({ title: _title }) {
 *   const title = usePropAccessor(title, {
 *      to: 'children',
 *      defaults: { h1: true, color: 'secondary' }
 *   });
 *
 *   return <div>{ title && <Text { ...title } /> }</div>;
 * }
 */
export function usePropAccessor(props = {}, config = {}) {
  const {
    className,
    debug,
    defaults,
    falsyValues,
    from,
    pass: passThru = [],
    transform,
    to,
  } = config || {};

  /* determine outPath separately, using accessor, then 'value' as fallback */
  const out = useMemo(() => {
    if (_.isFunction(to) || _.isString(to) || _.isArray(to)) return to;
    if (_.isString(from) || _.isArray(from)) return from;
    return 'value';
  }, []);

  /* create a memoized getter */
  const get = useMemo(() => createGet(from), []);

  /* determine what values should return null  */
  const optOuts = useMemo(() => _.isArray(falsyValues)
    ? falsyValues
    : dFalsy
  , []);

  /* create className getter */
  const dClassName = useMemo(() => {
    if (!className && !defaults?.className) return false;
    let val = className;
    if (className === true && _.isString(from)) val = from;
    return cn(val, defaults?.className);
  }, [className]);

  /* return parsed value */
  return useMediatedValue((nProps, nClass, nPass) => {
    /* --> get raw value from props object using generated getter */
    const rawVal = get(nProps);
    if (debug) console.log('@usePropAccessor – raw value:', rawVal);

    /* --> check for explicit opt-out */
    if (_.includes(optOuts, rawVal)) {
      if (debug) console.log('@usePropAccessor – falsy value discovered');
      return null;
    }

    /* --> create return value using defaults */
    let setVal;

    if (_.isPlainObject(rawVal)) setVal = rawVal;
    else if (_.isFunction(out)) setVal = out(rawVal, nProps);
    else { setVal = {}; _.set(setVal, out, rawVal); }
    setVal = _.defaults({}, setVal, _.pick(nProps, nPass), defaults);

    if (debug) console.log('@usePropAccessor – set value: ', setVal);

    /* --> if dClass exists, add it to setVal */
    if (nClass) {
      const cmpld = _.template(cn(nClass, setVal.className));
      setVal.className = cmpld(setVal);
    }

    if (transform) return transform(setVal, nProps);
    return setVal;
  }, props, dClassName, passThru);
}
/**
 * @typedef {(function|string|array)} PropAccessor
 * @desc flexible interface for extracting a value from an object
 * @alias PropAccessor
 * @memberof module:@abst/hooks
 *
 * @example <caption>as a function</caption>
 * (item) => item.name
 *
 * @example <caption>as a string</caption>
 * 'name'
 *
 * // complex dot-and-bracket notation is also acceptable
 * 'names[0].first'
 *
 * @example <caption> as an array</caption>
 * ['name']
 *
 * // with same dot-and-bracket notation as string-type
 * ['names', 0, 'first']
 */
