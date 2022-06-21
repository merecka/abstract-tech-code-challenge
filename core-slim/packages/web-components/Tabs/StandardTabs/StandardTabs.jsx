import React from 'react';
import { Panes } from './Panes';
import { Tabs  } from 'antd';

/**
 * @component StandardTabs
 * @desc like {@link EnhancedTabs}, but way worse.
 * @memberof module:@abst/web-components
 * @alias StandardTabs
 *
 * @prop {StandardTabProps[]} tabs tabs to render
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { StandardTabs } from '@abst/web-components';
 */
export const StandardTabs = (props) => {
  const { tabs, ...rest } = props;

  return <Tabs { ...rest }>{ Panes(tabs) }</Tabs>;
};
