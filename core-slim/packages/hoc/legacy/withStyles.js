/* eslint-disable react/no-multi-comp */
import React from 'react';
import hoist from 'hoist-non-react-statics';
import { useStyles } from '@abst/hooks/useStyles';

function addStyles(style, Composed) {
  /* check to see if component has already been wrapped  */
  const isWrapped = 'WrappedComponent' in Composed;
  let defaultProps = {};
  /* if component has already been wrapped, get defProps directly... */
  /* ...and also check to see if Comp is an object... */
  const Comp = isWrapped ? Composed.WrappedComponent : Composed;
  if (isWrapped || _.has(Comp, ['defaultProps'])) {
    defaultProps = Comp?.defaultProps || {};
  }

  /* create a wrapper for the component */
  const WithStyles = React.forwardRef((props, ref) => {
    const sty = useStyles(style, props, defaultProps);
    return (
      <Composed { ...props } ref={ ref } sty={ sty } />
    );
  });
  /* hoist statics */
  hoist(WithStyles, Composed);

  /* update displayName */
  WithStyles.displayName = `withStyles(${Composed?.displayName || Composed?.name})`;
  /* update WrappedComponent */
  WithStyles.WrappedComponent = Composed;

  /* return wrapper/component, but with hoisted static */
  return WithStyles;
}
/**
 * @hoc withStyles
 * @alias module:@abst/hoc/legacy#withStyles
 * @memberof module:@abst/hoc/legacy
 * @description injects styles into child component @ props.sty
 * @param   {function}  style  function with (theme:object, props:object) as
 * its arguments; expects an object as its' return value
 * @return {ReactComponent}
 * @deprecated don't use redux-form
 */
export const withStyles = (style) => (Composed) => addStyles(style, Composed);
