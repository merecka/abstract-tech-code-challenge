import React, { useEffect, useState } from 'react';
import { css } from './Sidebar.style';
import { useCss, useValueMemo } from '@abst/hooks';
import { useHistory } from 'react-router';
import { View } from '@abst/web-components';
import { NavItem } from './NavItem';
import utils from './utils';
import { useSidebar } from '@abst/sidebar';
import cn from 'classnames';

export function Sidebar({ items, closedWidth }) {
  const [sidebarIsOpen, sidebar] = useSidebar();

  const cls = useCss(css, { closedWidth });
  const { push, location: { pathname } = {}} = useHistory();
  /* open sub-menu */
  const [activeSubmenuIndex, setOpenSubmenu] = useState(-1);

  const [activeParent, activeChild] = useValueMemo(() => {
    let path = _.split(_.trimStart(pathname, '/'), '?')[0];
    if (_.isEmpty(path)) path = '';
    const [activeModule, ...activePaths] = _.split(path, '/');
    const activeSubpath = _.isEmpty(activePaths)
      ? false : _.join(activePaths, '/');

    return utils.getActiveItem(items, activeModule, activeSubpath);
  }, [items, pathname]);

  /* close when menu is closed */
  useEffect(() => {
    if (!sidebarIsOpen && activeSubmenuIndex > -1) setOpenSubmenu(-1);
  }, [sidebarIsOpen]);
  return (
    <View className={ cn(cls.menu, { 'sidebar-open': sidebarIsOpen }) }>
      <View className='menu-ctr'>{ _.map(items, (item, index) => (
        <NavItem { ...{ ...item, activeParent, activeChild, index } }
          key={ index.toString() }
          activeSubmenuIndex={ activeSubmenuIndex }
          goTo={ () => { push(item.path); } }
          toggleSubmenu={ (ind) => {
            const closing = open === ind;
            if (!sidebarIsOpen) sidebar.open();
            setOpenSubmenu(closing ? -1 : ind);
          } }
        />
      )) }</View>
      <View className='menu-extra'>
        {/* IDK some account shit or something */}
      </View>
    </View>
  );
}
