import React, { forwardRef, useMemo } from 'react';
import { Col } from '../Col';
import { Row } from '../Row';
import { StandardTabs } from './StandardTabs';
import { EnhancedTabs } from './EnhancedTabs';

/**
 * @component Tabs
 * @desc unified component to handle {@link EnhancedTabs} and {@link StandardTabs}
 * @memberof module:@abst/web-components
 * @alias Tabs
 *
 * @prop {object} [components] custom components
 * @prop {ReactComponent}  [components.Wrapper] custom wrapper component
 * @prop {boolean} [enhanced] when true, renders {@link EnhancedTabs}
 * @prop {ReactRef} [ref] ref; only passed to {@link EnhancedTabs}
 *
 * @param {object} props **NOTE:** additional props are passed directly to rendered component
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Tabs } from '@abst/web-components';
 */

function DftWpr({ children }) {
  return <Row><Col xs={ 12 }>{ children }</Col></Row>;
}

export const Tabs = forwardRef((props, ref) => {
  const { enhanced, components: cmps = {}, ...rest } = props;
  const { Wrapper, ...components } = cmps;
  const Wpr = useMemo(() => Wrapper || DftWpr, []);

  return (
    <Wpr>{
      enhanced
        ? <EnhancedTabs { ...{ ...rest, components, ref } } />
        : <StandardTabs { ...{ ...rest, components } } />
    }</Wpr>
  );
});
