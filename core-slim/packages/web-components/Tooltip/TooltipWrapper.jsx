import React from 'react';
import style from './Tooltip.style';
import { useStyles } from '@abst/hooks';
import Tooltip from 'rc-tooltip';

/**
 * @component TooltipWrapper
 * @desc returns more stripped down version of {@link Tooltip}; extends
 * {@link https://ant.design/components/tooltip/?theme=dark|Antd Tooltip}
 * @memberof module:@abst/web-components
 * @alias TooltipWrapper
 *
 * @prop {ReactNode} content tooltip body
 * @prop {object} [...rest] additional props are passed directly to main component
 *
 * @example <caption>import</caption>
 * import { TooltipWrapper } from '@abst/web-components';
 */
export const TooltipWrapper = (props) => {
  const sty = useStyles(style, props);
  const { content, ...rest } = props;
  return (
    <Tooltip
      overlay={ () => <span style={ sty.overlayCtr }>{ content }</span> }
      style={ sty.tooltip }
      { ..._.omit(rest, ['overlayContainerStyle', 'tooltipStyle']) }
    />
  );
};
