import React from 'react';
import { Tooltip } from '../../Tooltip';

export const IconWpr = ({ tooltip, children }) => {
  if (!tooltip) return <>{ children }</>;
  return (
    <Tooltip { ...(_.isString(tooltip) ? { content: tooltip } : tooltip) }>
      { children }
    </Tooltip>
  );
};
