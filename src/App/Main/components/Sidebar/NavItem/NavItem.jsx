import React from 'react';
import { useValueMemo } from '@abst/hooks';
import { SubMenu } from '../SubMenu';
import { MenuItem } from '../MenuItem';

export function NavItem(props) {
  const {
    activeParent, activeChild, goTo,
    handleClick, index, isOpen, subNav: nav, routes: children = nav,
    path, toggleSubmenu,
    ...rest
  } = props;
  const subNav = useValueMemo(() => _.map(subNav, (i, ind) => ({
    ...i,
    index: ind,
    isActive: activeChild === ind,
    handleClick
  })), [children, activeChild]);

  const itemState = useValueMemo(() => {
    const isParent = !!subNav?.length;

    return {
      isActive: activeParent === index,
      activeChild: isParent && activeChild,
      isOpenParent: isParent && isOpen,
      isParent,
      handleClick: isParent
        ? () => { toggleSubmenu(index); }
        : goTo,
      subNav
    };
  }, [subNav, activeParent, activeChild, index, isOpen]);


  return itemState.isParent
    ? <SubMenu { ...{ ...rest, ...itemState } } />
    : <MenuItem { ...{ ...props, ...itemState } } />;
}
