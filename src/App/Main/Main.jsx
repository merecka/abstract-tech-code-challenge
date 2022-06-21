import React from 'react';
import { css } from './Main.style';
import { useCss } from '@abst/hooks';
import { View } from '@abst/web-components';
import { Sidebar, TopNav } from './components';
import { useSidebar } from '@abst/sidebar';
import cn from 'classnames';

const sidebarClosedWidth = 60;
export function Main({ children, items }) {
  const cls = useCss(css, { sidebarClosedWidth });
  const [sidebarOpen] = useSidebar();
  return (
    <View className={ cn(cls.wpr, { 'sidebar-open': sidebarOpen }) }>
      <View className='top-nav-wpr'><TopNav /></View>
      <View className='app-ctr'>
        <View className='sidebar-wpr'>
          <Sidebar { ...{ items } } closedWidth={ sidebarClosedWidth } />
        </View>
        <View className='content-wpr'>
          <View className='content-ctr' { ...{ children } } />
        </View>
      </View>
    </View>
  );
}
