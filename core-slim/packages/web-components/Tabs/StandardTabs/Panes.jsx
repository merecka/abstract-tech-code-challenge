import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
/**
 * @typedef {object} StandardTabProps
 * @desc props to pass to {@link StandardTabs}
 * @alias StandardTabProps
 * @memberof module:@abst/web-components
 *
 * @prop {ReactNode} content tab content element(s)
 * @prop {string|ReactComponent} title tab title/title component
 * @prop {object} [..rest] additional props passed to
 * {@link https://ant.design/components/tabs/?theme=dark#Tabs.TabPane| Antd Tabs.TabPane}
 */

export const Panes = (tabs = []) =>
  _.map(tabs, ({ content, title, ...rest }, index) => (
    <TabPane key={ index.toString() } tab={ title } { ...rest }>
      { content }
    </TabPane>
  ));
