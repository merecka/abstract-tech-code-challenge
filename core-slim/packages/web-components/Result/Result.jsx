import React, { useCallback, useMemo } from 'react';
import { css } from './Result.style';
import { useHistory } from 'react-router';
import { useCustomCompareEffect, useMediatedState } from 'react-use';
import { useCss, useMediatedValue  } from '@abst/hooks';
import { I } from '../Icon';
import { Text } from '../Text';
import { View } from '../View';
import cn from 'classnames';
import isEqual from 'fast-deep-equal';

import { Btns, TooltipIcon } from './components';
import { normalizeProps, getActionButtons } from './lib';

/* action button eq check */
const noFns = (btns) => _.map(btns, (btn) => _.omitBy(btn, _.isFunction));
const btnsAreEq = (pBtns, nBtns) => isEqual(noFns(pBtns), noFns(nBtns));

/**
 * @component Result
 * @desc informational/outcome display component, typically used as replacement
 * for component that can't/won't render.
 * @memberof module:@abst/web-components
 * @alias Result
 *
 * @prop {ButtonProps[]} actionButtons array of button configurations to
 * display; if `status=error|empty`, "go back" button displays by default
 * @prop {boolean} [bordered=true] border display flag
 * @prop {string} description body description content
 * @prop {string|array|object} error any string or object representing an `Error`;
 * parsed interally to find a string to display as `description`
 * @prop {IconProps} icon main icon; display varies by layout type
 * @prop {string} layout='default' visual layout preset; one of `default|compact|inset`
 * @prop {string} status='error' display type; one of `'error'|'empty'|'success'|'404'|'403'|'500'`
 * @prop {string} title='' main title content
 * @prop {object} [wrapperStyle={}] style passed directly to Card component
 *
 * @param {object} props **NOTE:** additional props are passed directly to outer {@link Card} element.
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Result } from '@abst/web-components';
 */
export function Result(_props) {
  const { actionButtons = [], className, fill, handleReset, ...rest } = _props;
  const history = useHistory();

  const getActBtns = useCallback((p) =>
    _.map(getActionButtons(p), ({ type, ...btn }) => {
      switch(type) {
        case 'back': btn.onClick = history.goBack; break;
        default: break;
      }
      return btn;
    })
  , []);

  /* action btns */
  const iBtns = useMemo(() => getActBtns(_props), []);
  const [actBtns, setActBtns] = useMediatedState(getActBtns, iBtns);

  useCustomCompareEffect(() => {
    setActBtns(_props);
  }, [actionButtons], btnsAreEq);

  const {
    color, description, icon, innerStyle, layout, style, title
  } = useMediatedValue(normalizeProps, rest);

  const cls = useCss(css, { color });
  return (
    <View style={ style }
      className={ cn(cls.result, `layout-${layout}`, { fill }, className) }
    ><View className='container' style={ innerStyle }>{ do {
      switch(layout) {
        case 'mini':
          return <TooltipIcon { ...{ actBtns, description, icon, title } } />;
        default:
          return (
            <>{
              !!icon && (layout === 'compact'
                ? <TooltipIcon { ...{ actBtns, title, icon } } />
                : <I { ...icon } />
              )} {
              !!title && <Text { ...title } />
            } {
              !!description && <Text { ...description } />
            } {
              <Btns { ...{ actBtns } } />
            }</>
          );
      }
    } }</View></View>
  );
}
