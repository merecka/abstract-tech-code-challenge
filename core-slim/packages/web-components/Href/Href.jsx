import React, { useMemo } from 'react';
import style from  './Href.style';
import { useMediatedValue } from '@abst/hooks';
import { useHistory } from 'react-router';
import { Button } from '../Button';
import { Text } from '../Text';

/**
 * @component Href
 * @desc Router link handler
 * @memberof module:@abst/web-components
 * @alias Href
 *
 * @prop {(string|object)} to destination for the link; can be a string or
 * {@link https://reactrouter.com/web/api/Link/to-object|react-router location payload}
 * @prop {object} [aTagStyle] style applied to outer `<a />` element when `external=true`
 * @prop {string} [target='_blank'] HTML target attribute for external `<a />` element
 * @prop {string} [rel='noopener noreferrer'] HTML rel attribute for external `<a />` element
 * @prop {ReactComponent} [component] custom component; defaults to {@link Button}
 * @prop {boolean} [external] whether link destination is external to the app
 * @prop {string} [navMethod='push'] {@link https://reactrouter.com/web/api/history|history}
 * method to apply on click
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Href } from '@abst/web-components';
 */
export function Href(props) {
  const sty = useMemo(() => style(), []);
  const history = useHistory();
  const {
    aTagStyle,
    target = '_blank',
    rel = 'noopener noreferrer',
    children,
    component,
    external,
    navMethod = 'push',
    to,
    ...rest
  } = props;

  if (external) {
    return (
      <a href={ to } style={ aTagStyle } { ...{ target, rel } }>
        { children
          ? children
          : <Text color='info.dark' active { ...rest }>{ rest.label || to }</Text>
        }
      </a>
    );
  }
  const El = useMemo(() => component || Button, []);
  const common = useMediatedValue((nNavMethod, nTo, nRest) => ({
    role: 'button',
    onClick: () => history[nNavMethod](nTo),
    ...nRest
  }), navMethod, to, rest);

  if (component) {
    return (
      <El { ...common } style={{ ...sty.wrapper, ...rest.style }}>
        { children || rest.label }
      </El>
    );
  }
  return <Button { ...common } />;
}
