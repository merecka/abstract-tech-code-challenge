import React from 'react';
import { Text } from '../../Text';

export const BtnLabel = ({ style, label, ...props }) => {
  if (!label) return null;
  return <Text { ...props } className='label' style={ style }>{ label }</Text>;
};
