import React from 'react';
import { Container as ContainerBase } from 'react-grid-system';

/**
 * @component Container
 * @desc Grid container. extends
 * {@link https://jsxmachina.github.io/react-grid-system/ | react-grid-system/`Container`}.
 * First child should be {@link Row}
 * @memberof module:@abst/web-components
 * @alias Container
 *
 * @prop {boolean} [fluid=true] NOTE: default is overridden
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Container } from '@abst/web-components';
 */
export const Container = function CoreContainer({ fluid = true, ...props }) {
  return <ContainerBase { ...{ fluid, ...props } } />;
};
