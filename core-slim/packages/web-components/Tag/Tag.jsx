import React, { Fragment, useMemo } from 'react';
import style, { css } from './Tag.style';
import { useCss, useStyles, useValueMemo } from '@abst/hooks';
import { Tag as AntTag } from 'antd';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import classnames from 'classnames';

/**
 * @component Tag
 * @desc Tag UI element; extends {@link https://ant.design/components/tag|Antd Tag}
 * @memberof module:@abst/web-components
 * @alias Tag
 *
 * @prop {boolean}  [checkable=false] whether tag should render as
 * {@link https://ant.design/components/tag/#Tag.CheckableTag|Antd Tag.CheckableTag}
 * @prop {string|Color} [color] tag color; **NOTE**: Antd Tag color presets are still rendered as intended.
 * @prop {string} [label] if passed, replaces `children`
 * @prop {string|ReactNode} [tooltip] tooltip to display on tag
 * @prop {TooltipProps} [tooltipProps] tooltip wrapper configuration
 * @prop {boolean} [checked] whether checkable tag is checked
 * @prop {string} [className] CSS class applied to main tag element
 * @prop {boolean} [closable] whether tag should be closable
 * @prop {function} [onChange] click callback when `checkable=true`
 * @prop {function} [onClose] close callback when `closable=true`
 * @prop {boolean|number} [truncate=true] whether tag should be truncated after
 * n characters; when true, full label will be transferred to tooltip wrapper
 * @prop {function} [onClickLabel] callback when tag label is clicked
 * @prop {boolean} [visible] visibility control when `closable=true`
 * @prop {ReactNode} [children] inner element when `label` is not present
 * @prop {object} [style] style applied to main tag element
 * @prop {object} labelStyle style applied to label {@link Text} element
 *
 * @param {object} props
 *
 * @returns {ReactComponent}
 */
export function Tag(props) {
  const {
    checkable = false, checked = checkable ? false : undefined, className,
    closable, onChange = checkable ? () => {} : undefined,
    onClose = closable ? () => {} : undefined, label, truncate = true,
    onClickLabel, visible = closable ? true : undefined, children,
    tooltip: _tooltip = {}, tooltipProps = _tooltip
  } = props;

  const sty = useStyles(style, _.pick(props, ['color', 'labelStyle', 'style']));
  const cls = useCss(css, _.pick(props, ['color']));
  const maxLen = useMemo(() =>
    _.isFinite(truncate) ? truncate : truncate ? 125 : null
  , []);
  const hasTooltip = useValueMemo(() =>
    !!tooltipProps ||
    ((maxLen && _.isString(label)) && ((label?.length || 0) > maxLen))
  , [label?.length || 0, tooltipProps]);
  const El = useMemo(() => checkable ? AntTag.CheckableTag : AntTag, []);
  const Wrapper = useMemo(() => hasTooltip ? Tooltip : Fragment, []);
  // useEffect(() => {
  //   setHasTooltip(
  //     (maxLen && _.isString(label)) && ((label?.length || 0) > maxLen)
  //   );
  // }, );

  return (
    <Wrapper {
      ...(hasTooltip ? { content: label, maxWidth: 300, ...tooltipProps } : {})
    }>
      <El { ...{ checked, closable, onChange, onClose, visible } }
        color={ sty.color }
        style={ sty.tag }
        className={ classnames('core-tag', cls.closeIcon, className) }
      >{ (_.isString(label) || _.isFinite(label))
          ? <Text
            style={ sty.label }
            active={ _.isFunction(onClickLabel) }
            onClick={ onClickLabel }
          >{ maxLen ?
              _.truncate(label, { length: maxLen, separator: ' ' }) : label
            }</Text>
          : children
        }
      </El>
    </Wrapper>
  );
}
