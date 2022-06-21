import React from 'react';
import { css } from './BackButton.style.js';
import { useCss } from '@abst/hooks';
import { useHistory } from 'react-router';
import { Icon } from '../../Icon';
import { View } from '../../View';
import cn from 'classnames';

export function BackButton(props) {
  const { className, color, icon, onClick, to = null } = props;
  const history = useHistory();
  const cls = useCss(css, { color });

  return (
    <View className={ cn(cls.wpr, className) }
      onClick={ to
        ? () => history.push(to)
        : onClick
          ? onClick
          : () => history.goBack()
      }
    >
      <Icon { ...{ color } }
        name={ icon || 'angle-left' }
        weight='duotone'
        secondaryOpacity={ 80 }
        size={ 24 }
      />
    </View>
  );
}
