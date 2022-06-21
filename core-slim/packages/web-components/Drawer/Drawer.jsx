import React, {
  useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import styles from './Drawer.style';
import { useDidUpdate, useStyles } from '@abst/hooks';
import { View } from '../View';
import { useMeasure, useMountedState, useUpdateEffect } from 'react-use';
import cn from 'classnames';

/**
 * @component Drawer
 * @desc animated horizontally collapsing component w/ performance optimizations
 * @memberof module:@abst/web-components
 * @alias Drawer
 *
 * @prop {string} className CSS class applied to to outer {@link View}.
 * @prop {(number|string)} closedWidth=0 width when closed
 * @prop {boolean} destroyOnClose whether child element should be destroy each time drawer is closed
 * @prop {number} duration=250 toggle slide animation duration
 * @prop {number} gutter=16 margin applied to "moving" side of the drawer when open
 * @prop {string} innerClassName CSS class applied to inner {@link View}.
 * @prop {boolean} isOpen drawer open state
 * @prop {(number|string)} maxWidth drawer's maximum width when open.
 * @prop {function} [onDidClose] callback; fired _after_ close transition is complete
 * @prop {function} [onDidOpen] callback; fired _after_ open transition is complete
 * @prop {string} [position] relative position on screen; determines which direction drawer opens
 * @prop {object} [style] style applied to inner {@link View}
 * @prop {number} [transitionDelay=0] CSS transition-delay
 * @prop {string} [transitionType='ease-in-out'] CSS transition-type property.
 * @prop {boolean} [unmountOnClose] alias of `destroyOnClose`
 * @prop {(number|string)} [width] set width when open
 * @prop {object} [wrapperStyle] style applied to outer {@link View}
 *
 * @param {object} props
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Drawer } from '@abst/web-components';
 *
 * @todo fix logical inconsistency of style/wrapperStyle and className/innerClassName
 */
export function Drawer(props) {
  const {
    children,
    className,
    closedWidth = 0,
    destroyOnClose,
    duration = 250,
    gutter,
    innerClassName,
    isOpen,
    maxWidth,
    onDidClose,
    onDidOpen,
    position,
    style,
    transitionDelay = 0,
    transitionType,
    unmountOnClose,
    width: _width = false,
    wrapperStyle
  } = props;
  const isMounted = useMountedState();
  const shouldUnmount = useMemo(() =>
    Boolean(!!destroyOnClose || !!unmountOnClose)
  , []);
  const lazyLoad = useMemo(() => props.lazyLoad === true, []);

  const wprRef = useRef();
  const [ctrRef, ctrDimens] = useMeasure();
  const [hasOpened, setHasOpened] = useState(isOpen);
  const [transitioning, setTransitioning] = useState(false);

  const initialWidth = useMemo(() =>
    isOpen ? _width || 'auto' : closedWidth
  , []);

  const [width, setWidth] = useState(initialWidth);
  useUpdateEffect(() => { if (isOpen) setWidth(_width); }, [_width]);

  const [closed, setClosed] = useState(!isOpen);

  const hideChildren = useMemo(() =>
    (!hasOpened && lazyLoad) ||               /* pre-open and lazy-load OR */
    (closed &&                                /* fully closed AND */
    shouldUnmount)                            /* destroyable */
  , [closed, hasOpened]);

  const sty = useStyles(styles, {
    closed, transitioning, duration, isOpen, maxWidth, transitionType,
    wrapperStyle, style, width, position, gutter
  });

  /* trigger transitioning change when isOpen changes */
  useDidUpdate(({ isOpen: pIsOpen }) => {
    if (pIsOpen !== isOpen) {
      setTimeout(() => {
        setTransitioning(true);
        setClosed(false);
      }, transitionDelay);
    }
  }, { isOpen });

  /* callback when transition ends */
  const onTransitionEnd = useCallback((_isOpen) => {
    setWidth(_isOpen ? _width || 'auto' : closedWidth);
    setTransitioning(false);
    if (!_isOpen) {
      setClosed(true);
      onDidClose && onDidClose();
    } else onDidOpen && onDidOpen();
  }, [_width]);

  /* transitioning changes */
  useEffect(() => {
    if (transitioning) {
      if (!hasOpened && isOpen) setHasOpened(true);
      setWidth(_width || ctrDimens.width);
      setTimeout(() => {
        if (isMounted()) onTransitionEnd(isOpen);
      }, duration + 100);
    }
  }, [transitioning]);

  return (
    <View
      className={ cn(className, 'core-drawer-wpr') }
      ref={ wprRef }
      style={ sty.wpr }
    >
      <View
        className={ cn(innerClassName, 'core-drawer-ctr') }
        ref={ ctrRef }
        style={ sty.ctr }
      >
        { hideChildren ? null : children }
      </View>
    </View>
  );
}
