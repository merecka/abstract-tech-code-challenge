import React, { forwardRef, useCallback, useState } from 'react';
import { useUpdateEffect } from 'react-use';

function Empty() { return null; }

/**
 * @hoc withReset
 * @deprecated
 * @desc Injects a reset callback that un-mounts, then remounts the composed components.
 * > **NOTE**: props detailed below should be passed to returned component.
 *
 * @alias withReset
 * @memberof module:@abst/hoc
 *
 * @param {ReactComponent} Composed valid React Component
 *
 * @prop {ReactComponent} [components.Resetting] component to render during reset
 * @prop {function} [onReset] callback; fires when reset is initiated
 *
 * @returns {ReactComponent} `handleReset` callback is injected to props and
 * accepts a callback as its only argument
 *
 * @example <caption>usage</caption>
 * import { View } from '@abst/web-components';
 * import { withReset } from '@abst/hoc';
 *
 * const Cmp = withReset(function _Cmp() {
 *   return (
 *     <View>{ null }</View>
 *   );
 * });
 */
export function withReset(Composed) {
  console.warn(
    '@abst/hoc/withReset is deprecated; use `import { withReset } from "@abst/reset;"` instead.'
  );
  return forwardRef(function WithReset(props, ref) {
    const { components: { Resetting = Empty } = {}, onReset } = props;
    const [resetting, setResetting] = useState(false);

    /* handler */
    const handleReset = useCallback(function _handleReset(cb) {
      setResetting(true);
      _.isFunction(onReset) && onReset();
      _.isFunction(cb) && onReset();
    }, []);

    /* trigger */
    useUpdateEffect(() => { if (resetting) setResetting(false); }, [resetting]);

    if (resetting) return <Resetting />;

    return (
      <Composed { ...{ ...props, handleReset, ref } } />
    );
  });
}
