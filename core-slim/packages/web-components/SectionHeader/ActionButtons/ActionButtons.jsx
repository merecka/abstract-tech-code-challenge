/* eslint-disable no-case-declarations */
import React, { isValidElement, useMemo } from 'react';
import styles from './ActionButtons.style.js';
import { Button } from '../../Button';
import { View } from '../../View';

/**
 * @component ActionButtons
 * @desc button "bar"/row component
 * @memberof module:@abst/web-components
 * @alias ActionButtons
 *
 * @prop {ButtonProps[]} buttons array of button configurations
 *
 * @param {object} props **NOTE:** additional props are passed to each rendered button
 *
 * @returns {ReactComponent}
 * @example <caption>import</caption>
 * import { ActionButtons } from '@abst/web-components';
 */
export const ActionButtons = function CoreActionButtons({ buttons, ...props }) {
  const sty = useMemo(() => styles(), []);
  return (
    <View style={ sty.wrapper }>{ _.compact(_.map(buttons || [], (Btn, i) => {
      switch(true) {
        case isValidElement(Btn): return Btn;
        case _.isFunction(Btn):
          return <Btn key={ i } style={ sty.button } { ...props } />;
        case  _.isPlainObject(Btn):
          const { style = {}, ..._props } = Btn;
          return (
            <Button key={ i }
              style={{ ...sty.button, ...style }}
              size='small'
              { ...{ ...props, ..._props } }
            />
          );
        default: return null;
      }
    })) }</View>
  );
};
