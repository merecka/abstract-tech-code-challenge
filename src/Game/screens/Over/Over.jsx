import React from 'react';
import styles from './Over.style';
import { useStyles } from '@abst/hooks';
import { Text, View } from '@abst/web-components';

export function Over(/* props */) {
  const sty = useStyles(styles);
  return (
    <View style={ sty.wpr }>
      <Text d1 t={ 'yuh lost :(' } />
      <Text t={ '[this is a placeholder]' } />
    </View>
  );
}
