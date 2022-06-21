import React from 'react';
import { Button } from '../../Button';
import { View } from '../../View';

export function Btns({ actBtns }) {
  if (_.isEmpty(actBtns)) return null;
  return (
    <View className='action-btns-wpr'>{
      _.map(actBtns, (btn, i) => <Button key={ i } { ...{ ...btn } } />)
    }</View>
  );
}
