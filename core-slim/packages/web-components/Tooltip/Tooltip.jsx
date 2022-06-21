import React from 'react';
import { css } from './Tooltip.style';
import { useCss } from '@abst/hooks';
import { Popover } from 'antd';
import cn from 'classnames';

/**
 * @typedef {object} TooltipProps
 * @desc props for configuring tooltip
 * @alias TooltipProps
 * @memberof module:@abst/web-components
 * @prop {ReactNode} children node the tooltip wraps
 * @prop {ReactNode} content body text/element
 * @prop {string} [className] CSS class, applied to outer dev element
 * @prop {ReactComponent} [container='span'] element that wraps `children`
 * @prop {string} [placement='top'] position relative to children; one of
 *  `top|topLeft|topRight|right|rightTop|rightBottom|bottom|bottomLeft|bottomRight|left|leftTop|leftBottom`
 * @prop {string} [trigger='hover'] action that triggers visibility; one of `click|focus|hover`
 * @prop {object} [...rest] additional props are passed directly to parent
 * {@link https://ant.design/components/popover/?theme=dark|Antd Popover} element
 */

/**
 * @component Tooltip
 * @desc tooltip component; extends
 * {@link https://ant.design/components/popover/?theme=dark|Antd Popover}
 * @memberof module:@abst/web-components
 * @alias Tooltip
 *
 * @param {TooltipProps} props **NOTE:** additional props are passed directly to main component
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Tooltip } from '@abst/web-components';
 */
export const Tooltip = (props) => {
  const {
    bordered, children, className, color, container: Ctr = 'span',
    containerStyle, maxWidth, placement = 'top', shadowed, style,
    ...rest
  } = props;


  const cls = useCss(css, {
    bordered, color, containerStyle, maxWidth, placement, shadowed, style
  });
  return (
    <Popover
      trigger='hover'
      { ...{ ...rest, placement } }
      overlayClassName={
        cn('core-popover', cls.popover, {
          'no-title': _.isUndefined(rest.title)
        }, className)
      }
    ><Ctr className={ cls.container }>{ children }</Ctr></Popover>
  );
};
