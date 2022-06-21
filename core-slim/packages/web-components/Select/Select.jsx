import style from './Select.style';
import React, { useEffect, useState } from 'react';
import { useStyles } from '@abst/hooks';
import SelectBase, { AsyncCreatable, Async, Creatable } from 'react-select-v1';

const defaults = { onBlur: null, optionAccessors: {}, simpleValue: true };

/**
 * @component Select
 * @desc legacy enum input component
 * @memberof module:@abst/web-components
 * @alias LegacySelect
 *
 * @deprecated use {@link SelectInput|form-web/inputs/Select} instead
 *
 * @param {object} props
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Select } from '@abst/web-components';
 */
export const Select = (props) => {
  let Comp;
  const __defaults = defaults;
  if (!Comp) {
    const { async, creatable } = props;
    if (async && creatable) Comp = AsyncCreatable;
    else if (async) Comp = Async;
    else if (creatable) {
      Comp = Creatable;
      __defaults.filterOptions = undefined;
    } else Comp = SelectBase;
  }

  const sty = useStyles(style);

  const {
    afterChange, beforeChange, disabled, filterOptions, input,
    items, labelKey, valueKey, many, multi, onBlur, options: opts,
    optionAccessors, simpleValue, valueDidChange, valueWillChange, ...rest
  } = { ...__defaults, ...props };
  const [currentVal, setValue] = useState(input?.value || null);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(_.reduce(items || opts, (memo, opt) => {
      if (_.isPlainObject(opt)) memo.push(opt);
      else memo.push({ label: opt, value: opt });
      return memo;
    }, []));
  }, [items, opts]);
  if (!Comp) return null;
  return (
    <div style={ sty.wrapper }>
      <Comp
        autoBlur
        autoSize={ false }
        disabled={ disabled }
        multi={ many || multi }
        onBlurResetsInput={ false }
        onCloseResetsInput={ false }
        options={ options }
        simpleValue={ simpleValue }
        labelKey={ labelKey ? labelKey :
          _.has(optionAccessors, 'label') ? optionAccessors.label : 'label'
        }
        valueKey={ valueKey ? valueKey :
          _.has(optionAccessors, 'value') ? optionAccessors.value : 'value'
        }
        filterOptions={ filterOptions }
        { ..._.omit(rest, ['meta', 'async', 'creatable']) }
        { ...input }
        onBlur={ (e) => { if (typeof onBlur === 'function') onBlur(e); } }
        onChange={ (val) => {
          if (_.isFunction(beforeChange)) beforeChange(val, currentVal);
          if (_.isFunction(valueWillChange)) valueWillChange(val, currentVal);
          if (_.isFunction(input?.onChange)) input.onChange(val);
          if (_.isFunction(input?.onBlur)) input.onBlur(val);
          if (_.isFunction(afterChange)) afterChange(val, currentVal);
          if (_.isFunction(valueDidChange)) valueDidChange(val, currentVal);
          setValue(val);
        } }
      />
    </div>
  );
};
