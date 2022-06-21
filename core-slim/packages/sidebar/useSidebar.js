import { useContext } from 'react';
import { SidebarContext } from './Context';

export function useSidebar() {
  return useContext(SidebarContext);
}
