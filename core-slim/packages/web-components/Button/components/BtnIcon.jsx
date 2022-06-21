import React from 'react';
import { I } from '../../Icon';

export const BtnIcon = ({ icon, style }) => {
  if (!icon) return null;
  return (
    <I { ...{
      ...(_.isString(icon)
        ? { name: icon, weight: 'duotone' }
        : { weight: 'duotone', ...icon }
      ),
      style
    } } />
  );
};
