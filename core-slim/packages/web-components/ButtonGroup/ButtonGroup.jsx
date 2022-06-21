import React, { isValidElement, useCallback, useMemo, useState } from 'react';
import { css } from './ButtonGroup.style';
import {
  useCss,
  useCustomMediatedValue,
  useDidUpdate,
  useMediatedValue
} from '@abst/hooks';
import { View } from '../View';
import { BtnGrpContext } from './BtnGrpContext';
import cn from 'classnames';
import isEq from 'fast-deep-equal';
import { BtnGrpBtn } from './BtnGrpBtn';

const noFnsArr = (vals) => _.map(vals, (val) => _.omitBy(val, _.isFunction));
const btnsAreEqual = (pBtns, btns) => isEq(noFnsArr(pBtns), noFnsArr(btns));
const customIsEq = ([pBtns, ...pRest], [btns, ...rest]) =>
  btnsAreEqual(pBtns, btns) && isEq(pRest, rest);

/* standardizes btn format; returns [buttonArr, len] */
const normalizeBtns = (btns, isSwitch, vKey, lKey) => {
  const ret = _.compact(_.map(btns, (Btn, i) => {
    if (_.isString(Btn)) return { label: Btn, value: Btn, index: i };
    if (_.isPlainObject(Btn)) {
      return {
        ...Btn,
        label: _.get(Btn, lKey),
        value: _.has(Btn, [vKey])
          ? _.get(Btn, vKey)
          : i,
        index: i,
      };
    }
    if (_.isFunction(Btn)) {
      return {
        index: i, value: i.toString(), __isCustom: true
      };
    }
    console.warn(`button group button @ index ${i} has invalid configuration`);
    return null;
  }));
  return [ret, ret.length];
};

export function ButtonGroup(props) {
  const {
    borderRadius = 12,
    height = 42,
    className,
    color = 'primary',
    buttons: _buttons,
    gutter,
    initialValue: iVal,
    labelKey = 'label',
    layout: _layout = 'group',
    onClick, onChange = onClick,
    isSwitch = false,
    style,
    value: val,
    valueKey = 'value',
  } = props;
  const cls = useCss(css, { gutter }, {}, 'core-btn-grp');

  const layout = useMemo(() => {
    switch(_layout) {
      case 'pills': return 'pill';
      case 'pill': case 'group': return _layout;
      default: return 'group';
    }
  }, [_layout]);


  const isControlled = useMemo(() => !_.isUndefined(val), []);
  const [buttons, bLen] = useCustomMediatedValue(
    normalizeBtns, customIsEq,
    _buttons, isSwitch, valueKey, labelKey
  );

  /* buttons,  */
  const Btns = useCallback(({ count }) => (
    <>{ _.map(_.range(count), (i) =>
      <BtnGrpBtn key={ i } index={ i } />
    ) }</>
  ), []);

  /*
   * initialValue fallthrough:
   * props.initialValue -> val -> value of first button -> null
   */
  const initialValue = useMemo(() => !_.isUndefined(iVal)
    ? iVal
    : isControlled
      ? val
      : isSwitch
        ? _.get(buttons?.[0], valueKey)
        : null
  , []);

  const [active, setActive] = useState(initialValue);
  useDidUpdate(() => { if (isControlled) setActive(val); }, { val });

  const ctxVal = useMediatedValue(
    (nVal, nBtns, nLayout, nBdrRad, nClr, nSwtch, nHeight) => ({
      getItem: (index) => {
        const btn = _.find(nBtns, { index });
        if (!btn) return { valid: false };
        const {
          __isCustom, onClick: btnOnClick, disabled, tooltip, value, ...itm
        } = btn;
        const isActive = isEq(nVal, value);
        return {
          El: __isCustom && nBtns[index],
          button: {
            borderRadius: nBdrRad,
            color: disabled ? 'text.disabled' : nClr,
            // disabled,
            ...itm,
            bordered: nSwtch
              ? !isActive
              : itm?.bordered,
            height: nHeight,
            hoverable: !disabled,
            onClick: nSwtch || disabled
              ? null
              : () => { btnOnClick && btnOnClick(value, itm); },
            style: { cursor: disabled ? 'not-allowed' : 'pointer' },
            ...(nLayout === 'group' ? {
              isInGroup: true,
              isFirst: index === 0,
              isLast: (index + 1) === (nBtns?.length || 0)
            } : {})
          },
          tooltip,
          valid: true,
          wrapper: {
            className: cn({
              'btn-wpr': true,
              'is-active': isActive,
              'is-disabled': disabled
            }),
            onClick: nSwtch && !disabled ? () => {
              if (!isControlled) setActive(value);
              onChange && onChange(value, itm);
              btnOnClick && console.warn(
                'onClick is ignored for "<ButtonGroup isSwitch />" items'
              );
            } : undefined,
            role: nSwtch ? 'button' : undefined
          },
        };
      }
    })
    , active, buttons, layout, borderRadius, color, isSwitch, height
  );

  /* eslint-disable react/no-children-prop */
  return (
    <BtnGrpContext.Provider value={ ctxVal }>
      <View { ...{ style } }
        className={ cn(cls.wpr, `layout-${layout}`, className) }
      >
        <Btns count={ bLen } />
      </View>
    </BtnGrpContext.Provider>
  );
}
