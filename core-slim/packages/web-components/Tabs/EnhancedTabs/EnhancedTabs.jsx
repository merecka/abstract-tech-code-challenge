import React, {
  useCallback, forwardRef, useImperativeHandle, useMemo
} from 'react';
import styles, { css } from './EnhancedTabs.style';
import { useCss, useStyles } from '@abst/hooks';
import { useMediatedState } from 'react-use';
import { I } from '../../Icon';
import { Text } from '../../Text';
import { View } from '../../View';
import { Tabs } from 'antd';
import classnames from 'classnames';

const { TabPane } = Tabs;
const noop = () => {};

/**
 * @typedef {object} EnhancedTabProps
 * @desc configuration object for {@link EnhancedTabs} tab panes.
 * @alias EnhancedTabProps
 * @memberof module:@abst/web-components
 * @prop {string} [className] CSS class applied to tab pane wrapper
 * @prop {ReactNode} [content=<span />] tab body content
 * @prop {boolean} [disabled=false] whether tab item should be unclickable
 * @prop {IconProps} [icon] tab title icon
 * @prop {function} [render] alternative content render method; receives parent props as only argument
 * @prop {string} [title] tab title
 */

/**
 * @component EnhancedTabs
 * @desc like {@link StandardTabs}, but way better;
 * extends {@link https://ant.design/components/tabs/?theme=dark|Antd Tabs}
 * @memberof module:@abst/web-components
 * @alias EnhancedTabs
 *
 * @prop {EnhandedTabProps[]} tabs tab pane configurations
 * @prop {string} [className] CSS class applied to outer div
 * @prop {Color} [color='primary'] active tab title/inkbar color
 * @prop {number} [defaultActiveIndex=0] initially active tab index
 * @prop {boolean} [destroyInactiveTabPane=true] whether tab panes should be destroyed when inactive
 * @prop {function} [onChange] callback when active tab changes
 * @prop {object} [tabStyle] style to apply to each tab pane
 * @prop {object} [tabBarStyle] style to apply to tab bar
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { EnhancedTabs } from '@abst/web-components';
 */
export const EnhancedTabs = forwardRef((props, ref) => {
  const {
    className, color = 'primary', defaultActiveIndex = 0,
    destroyInactiveTabPane = true, onChange: _onChange = noop, tabs, tabStyle,
    tabBarStyle, ...rest
  } = props;
  const sty = useStyles(styles, { tabBarStyle });
  const cls = useCss(css, { color });

  const parseKey = useCallback((key) =>
    _.isFinite(key)                 /* immediately return number */
      ? key
      : _.isFinite(_.parseInt(key)) /* parse stringified number */
        ? _.parseInt(key)
        : 0                         /* reset if all else fails */
  , []);

  const iActive = useMemo(() => parseKey(defaultActiveIndex), []);
  const [activeIndex, setActiveIndex] = useMediatedState(parseKey, iActive);

  const refProps = useMemo(() => ({
    reset: () => setActiveIndex(iActive),
    setActive: setActiveIndex,
  }), []);

  useImperativeHandle(ref, () => refProps, []);

  const onChange = useCallback((key) => {
    setActiveIndex(key);
    _onChange(_.parseInt(key));
  }, []);

  return (
    <Tabs
      animated={{ inkBar: true, tabPane: !destroyInactiveTabPane }}
      hideAdd
      { ...{ ...rest, onChange, destroyInactiveTabPane } }
      tabBarStyle={ sty.tabBar }
      className={ classnames('core-tabs', cls.tabs, className) }
      activeKey={ _.toString(activeIndex) }
    >{ _.map(tabs, (tab, index) => {
        const { content, disabled = false, icon, render, title } = tab;
        const isActive = activeIndex === index;
        const _color = disabled
          ? 'canvas.disabled'
          : isActive ? color : 'text.primary';

        return (
          <TabPane { ...{ disabled } }
            className={ tab.className }
            key={ index.toString() }
            style={ tabStyle }
            tab={ <View style={ sty.titleWrapper }>{ icon && <I
              size='sm'
              { ...(_.isString(icon) ? { name: icon } : icon) }
              color={ _color }
              style={ sty.icon }
              weight={ isActive ? 'solid' : 'duotone' }
            /> } { title && <Text
              b={ isActive }
              color={ _color }
              style={ sty.title(isActive) }
            >{ title }</Text> }</View> }
          >
            { _.isFunction(render)
              ? render({ tabs: refProps, isActive, color: _color })
              : content || <span />
            }
          </TabPane>
        );
      }) }</Tabs>
  );
});
