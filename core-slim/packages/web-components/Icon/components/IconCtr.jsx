import React, { forwardRef } from 'react';
import { View } from '../../View';

export const IconCtr = forwardRef(function _IconCtr(props, ref) {
  const { children, disabled, onClick, style } = props;
  if (!_.isFunction(onClick)) return <>{ children }</>;
  return (
    <View { ...{ children, ref, style } }
      role='button'
      onClick={ disabled ? undefined : onClick }
    />
  );
});
