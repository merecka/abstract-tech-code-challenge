import React, { forwardRef } from 'react';
import { Row as RowBase } from 'react-grid-system';
import classnames from 'classnames';

/**
 * @component Row
 * @desc Grid row component; extends
 * {@link https://sealninja.github.io/react-grid-system/#row | react-grid-system/`Row`}.
 * Must be placed somewhere within a {@link Container}.
 * @memberof module:@abst/web-components
 * @alias Row
 *
 * @prop {string} className class applied to root component
 * @prop {Col[]} children children (children should be {@link Col}s)
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Row } from '@abst/web-components';
 */
export const Row = forwardRef(function CoreRow({ className, ...props }, ref) {
  return (
    <RowBase { ...{ ...props, ref } }
      className={ classnames('abst-row', className) }
    />
  );
});
