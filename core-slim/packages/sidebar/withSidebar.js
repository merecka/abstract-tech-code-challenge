import React, { useRef, useCallback } from 'react';
import { useUpdate, useValueMemo } from '@abst/hooks';
import { SidebarContext } from './Context';


export function withSidebar(Composed) {
  return function WithSidebar(props) {
    const update = useUpdate();
    const isOpen = useRef(false);
    const setIsOpen = useCallback((v) => {
      if (_.isBoolean(v)) isOpen.current = v;
      else isOpen.current = !isOpen.current;
      update();
    }, []);

    const value = useValueMemo(() => [isOpen.current, {
      close: () => setIsOpen(false),
      open: () => setIsOpen(true),
      toggle: () => setIsOpen()
    }], [isOpen.current]);

    return (
      <SidebarContext.Provider value={ value }>
        <Composed { ...props } />
      </SidebarContext.Provider>
    );
  };
}
