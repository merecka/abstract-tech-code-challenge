import React, { forwardRef } from 'react';
import cn from 'classnames';

/**
 * @component View
 * @desc very basic flex div component
 * @memberof module:@abst/web-components
 * @alias View
 *
 * @prop {string} className CSS class applied to div
 * @prop {ReactRef} ref ref; applied to div
 *
 * @param {object} props **NOTE:** additional props are passed directly to `div`
 * @param {ReactRef} [ref] applied to `div`
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { View } from '@abst/web-components';
 */
export const View = forwardRef(function CoreView(props, ref) {
  const { children, className, ...rest } = props;
  return (
    <div { ...{ ...rest, ref } }
      className={ cn('core-view', className) }
    >
      { children }
    </div>
  );
}
);
