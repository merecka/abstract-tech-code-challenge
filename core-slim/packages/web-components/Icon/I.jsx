import React, { forwardRef/* , useEffect, useState */ } from 'react';
import styles from './I.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediatedValue, useStyles } from '@abst/hooks';
import { IconCtr as Ctr, IconWpr as Wpr } from './components';
import utils from './utils';
const { configure } = utils;

/**
 * @typedef {object|string} IconProps
 * @alias IconProps
 * @memberof module:@abst/web-components
 * @desc API for icon elements. When passed as a string; value is applied to the
 * `name` property. **NOTE:** properties described as `FA`
 * are passed directly to
 * {@link https://github.com/FortAwesome/react-fontawesome|react-fontawesome}
 * without modification.
 *
 * @prop {string} name font-awesome icon name
 * @prop {object} [buttonStyle] style passed to outer div when `onClick` is present
 * @prop {string} [className] CSS class applied to icon element
 * @prop {Color} [color='text'] icon primary color
 * @prop {boolean} [disabled] disabled flag
 * @prop {string} [icon] alias of `name`
 * @prop {string} [id] HTML id attribute
 * @prop {IconProps} [mask] configuration for masking icon
 * @prop {function} [onClick] click handler callback; causes icon to become wrapped in additional outer div
 * @prop {number} [opacity=1] opactiy of primary color in duo-tone icons
 * @prop {number} [rotate] icon's rotation angle; use this for smooth rotation transition
 * @prop {Color} [secondaryColor] secondary color applied to duo-tone icons; defaults to primary color.
 * @prop {number} [secondaryOpacity=40] opacity of secondary path in duo-tone icons
 * @prop {string|number} [size] FA size prop, or, when passed as number, icon's font size.
 * @prop {object} [style] style object applied to main icon component
 * @prop {TooltipProps} [tooltip] text to show on hover
 * @prop {number} [transitionDuration=200] CSS transition duration for changes in icon's visual properties
 * @prop {string} [transitionType='ease-in-out'] CSS transition-type
 * @prop {string} [weight] font-awesome sub-library to use; one of `light|regular|solid|duotone|brand`
 * @prop {boolean} [border] FA
 * @prop {boolean} [fixedWidth] FA
 * @prop {boolean} [flip] FA
 * @prop {boolean} [inverse] FA
 * @prop {boolean} [listItem] FA
 * @prop {boolean} [pull] FA
 * @prop {boolean} [pulse] FA
 * @prop {number} [rotation] FA
 * @prop {boolean} [spin] FA
 * @prop {boolean} [swapOpacity] FA
 * @prop {boolean} [symbol] FA
 * @prop {object} [transform] FA
 */


/**
 * @component I
 * @desc Font-awesome 5 icon component, with a bunch of enhancements
 * @memberof module:@abst/web-components
 * @alias I
 *
 * @param {IconProps}
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { I } from '@abst/web-components';
 */
export const I = forwardRef(function _I(props, ref) {
  const sty = useStyles(styles, props);
  const { /* fa props */
    border, fixedWidth, flip, inverse, listItem, pull, pulse, rotation,
    spin, swapOpacity, symbol, transform,

    /* addl props */
    disabled, id, className, mask: _mask = null, onClick, tooltip = null,
    icon: _icon, name = _icon, weight
  } = props;

  const icon = useMediatedValue(configure, name, weight, {});
  const mask = useMediatedValue(configure, _mask, null, {});

  return (
    <Wpr { ...{ tooltip } }>
      <Ctr { ...{ disabled, onClick, ref, style: sty.button } }>
        <FontAwesomeIcon
          color={ sty.color }
          style={ sty.icon }
          size={ sty.size }
          { ...{
            border, className, fixedWidth, flip, icon, id, inverse, listItem,
            mask, pull, pulse, rotation, spin, swapOpacity, symbol,
            transform
          } }
        />
      </Ctr>
    </Wpr>
  );
});


/**
 * @component Icon
 * @desc alias of {@link I}
 * @memberof module:@abst/web-components
 * @alias Icon
 *
 * @param {IconProps} props
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Icon } from '@abst/web-components';
 */
export const Icon = I;
