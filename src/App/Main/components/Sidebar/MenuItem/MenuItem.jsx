import React, { useMemo } from 'react';
import { I, Text, View } from '@abst/web-components';
import cn from 'classnames';
import { useSidebar } from '@abst/sidebar';

export const MenuItem = (props) => {
  const {
    handleClick, icon, isActive, isChild, isParent, label
  } = props;
  const [sidebarOpen] = useSidebar();
  const _icon = useMemo(() => _.isString(icon)
    ? { name: icon }
    : _.isPlainObject(icon)
      ? icon
      : false
  , []);

  return (
    <View
      role='button'
      onClick={ () => handleClick(props) }
      className={ cn('sidebar-menu-item', {
        'is-child': isChild,
        'is-parent': isParent,
        'is-active': isActive,
      }) }
    >
      <View className='inkbar' />
      <View className='inkbar-placeholder' />
      <View className='itm-icon-wpr'>
        { _icon && <I
          className='icon'
          tooltip={{
            content: <Text t={ label } />,
            placement: 'right',
            ...(sidebarOpen ? { visible: false } : {})
          }}
          { ..._icon }
          color={ isActive ? isChild ? 'secondary' : 'primary' : 'text' }
          weight={ isActive ? 'duotone' : _icon?.weight || 'regular' }
        />}
      </View>
      <View className='title-wpr'>
        <Text className='title' t={ label } />
        { isParent && <I
          name='angle-up'
          weight='duotone'
          className='open-icon'
          onClick={ () => handleClick(props) }
        /> }
      </View>
    </View>
  );
};
