import React from 'react';
import styles from './TopNav.style';
import { useStyles } from '@abst/hooks';
import { useHistory } from 'react-router';
import { I, Text, View } from '@abst/web-components';
import { useSidebar } from '@abst/sidebar';
import { Squash as Hamburger } from 'hamburger-react';
import { useReset } from '@abst/reset';

export function TopNav() {
  const reset = useReset();
  const [sidebarIsOpen, { toggle }] = useSidebar();
  const history = useHistory();

  const sty = useStyles(styles, { sidebarIsOpen });
  return (
    <View style={ sty.wpr }><View style={ sty.secWpr }>
      <View style={ sty.iconWpr }>
        <Hamburger { ...{ ..._.pick(sty, ['duration', 'easing']), toggle } }
          color={ sty.iconColor }
          rounded
          size={ 18 }
          toggled={ sidebarIsOpen }
          style={ sty.icon }
        />
      </View>
      <View style={ sty.preLogoSpace } />
      <View role='button'
        style={ sty.logoWpr }
        onClick={ () => history.push('/') }
      >
        <I name='abstract-alt' color='primary' weight='solid' />
      </View>
      <Text
        style={ sty.title }
        t={ 'Abstract.tech | Frontend Engineer Assessment' }
      />
    </View><View style={ sty.rightWpr }>
      <I
        color='warning'
        name='sync'
        onClick={ () => reset() }
        weight='duotone'
        tooltip={{ content: 'Reload App', placement: 'left' }}
      />
    </View></View>
  );
}
