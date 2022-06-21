import React, { forwardRef, useMemo } from 'react';
import style from './Col.style';
import { useStyles } from '@abst/hooks';
import { Col as ColBase } from 'react-grid-system';
import { View } from '../View';
import classnames from 'classnames';
const omitted = ['align', 'innerStyle', 'justify', 'style'];

/**
 * @component Col
 * @memberof module:@abst/web-components
 * @desc Grid column component; extends
 * {@link https://sealninja.github.io/react-grid-system/#col | react-grid-system/`Col`},
 * with an additional util function that normalizes sizes to column values.
 * @alias Col
 *
 * @prop {ReactComponent} [Container] inner element
 * @prop {ReactComponent} [Wrapper] outer element
 * @prop {FlexShortcode}  [align] vertical alignment
 * @prop {FlexShortcode}  [justify] horizontal alignment
 * @prop {boolean}        [autoSize] whether column should shrink to mininum width
 * @prop {string}         [className] class applied to outer element
 * @prop {string}         [innerClassName] class applied to column inner element
 * @prop {object}         [innerStyle] style applied to inner element
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Col } from '@abst/web-components';
 *
 * @example <caption>size value types</caption>
 * export function FittyPerCent({ children }) {
 *   return (
 *     <Col { ...{ children } }
 *       sm={ 6 }       // number
 *       md={ '6' }     // string
 *       lg={ '50%' }   // width percent
 *       xl={ '6/12' }  // width fraction
 *     />
 *   );
 * }
 */
export const Col = forwardRef(function CoreCol(props, ref) {
  const sty = useStyles(style, props);
  const {
    autoSize, children, className, innerClassName, Wrapper, Container, ...rest
  } = props;
  const Wpr = useMemo(() => Wrapper || (autoSize ? View : ColBase), []);
  const Ctr = useMemo(() => Container || View, []);
  return (
    <Wpr { ..._.omit(rest, omitted) }
      className={ classnames('abst-col ', className) }
      style={ sty.wrapper }
    >
      <Ctr ref={ ref }
        className={ classnames('abst-col-inner', innerClassName) }
        style={ sty.container }
      >{ children }</Ctr>
    </Wpr>
  );
});
