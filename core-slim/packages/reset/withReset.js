import React, { forwardRef } from 'react';
import { ResetBoundary } from './ResetBoundary';

export function withResetBoundary(conf) {
  return function _withReset(Composed) {
    return forwardRef(function WithReset(props, ref) {
      return (
        <ResetBoundary { ...conf }>
          <Composed { ...{ ...props, ref } } />
        </ResetBoundary>
      );
    });
  };
}

export function withReset(Composed) {
  const hoc = withResetBoundary({});
  return hoc(Composed);
}
