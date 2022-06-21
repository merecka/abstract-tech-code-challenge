import React, { useCallback } from 'react';
import { Collapse } from '@abst/web-components';
import { MenuItem } from '../MenuItem';

export function SubMenu(props) {
  const { index, setOpenSubmenu, isOpenParent, subNav } = props;
  const renderItem = useCallback((p) => <MenuItem isChild { ...p } />, []);
  return (
    <>
      <MenuItem { ...props }
        handleClick={ () => { setOpenSubmenu(index); } }
      />
      <Collapse open={ isOpenParent }>
        { _.map(subNav, renderItem) }
      </Collapse>
    </>
  );
}
