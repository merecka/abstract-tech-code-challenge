import React from 'react';
import Styles from './Loader.style';
import { useStyles, useValueMemo } from '@abst/hooks';
import { ActivityIndicator } from 'react-native';
import { View } from '@abst/ui-native/View';
import { Background } from '@abst/ui-native/Background';
import { Text } from '@abst/ui-native/Text';

const dProps = { color: 'text.hint', fullScreen: false };
const sizes = ['large', 'small'];

export function Loader(props) {
  const {
    bg: _bg, color, fullScreen, size: _size, layout, styles, title
  } = props;

  const size = useValueMemo(() => _.includes(sizes, _size)
    ? _size
    : fullScreen
      ? 'large'
      : 'small'
  , [_size]);


  const sty = useStyles(Styles, { color, fullScreen, layout, size }, dProps);

  const bg = useValueMemo(() => _.isUndefined(_bg)
    ? fullScreen ? 'default' : false : _bg
  , [_bg]);

  return (
    <View style={ [sty.wpr, styles?.wpr] }>
      { !!bg && <Background { ...{ bg } } style={ styles?.bg } /> }
      <View style={ [sty.contentWpr, styles?.contentWpr] }>
        <View style={ sty.spinnerWpr }>
          <ActivityIndicator color={ sty.title.color } { ...{ size } } />
        </View>
        <Text
          text={ title }
          style={ [sty.title, styles?.title] }
          wrapperStyle={ [sty.titleWpr, styles?.titleWpr] }
        />
      </View>
    </View>
  );
}
