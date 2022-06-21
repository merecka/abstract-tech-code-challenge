import React from 'react';
import { css } from './Text.style';
import { useCss, useValueMemo } from '@abst/hooks';
import cn from 'classnames';
/**
 * @typedef {object} TextProps
 * @desc props for configuration {@link Text} components
 * @alias TextProps
 * @memberof module:@abst/web-components
 * @prop {string|ReactChildren}  children Typically, but not necessarily, a string.
 * @prop {boolean}               [active=false] whether the text should react to mouse events like hover or click
 * @prop {Color}                 [bg] color to use to auto-detect text color
 * @prop {string}                [className] html class name
 * @prop {boolean}               [code] code style flag
 * @prop {Color}                 [color] any valid abst color
 * @prop {boolean}               [debug] prints props, style when true
 * @prop {boolean}               [disabled] whether text should be disabled
 * @prop {number|string}         [fontSize] controls font size
 * @prop {string}                [id] html id
 * @prop {boolean}               [inverse] color inversion flag
 * @prop {function}              [onClick] button click
 * @prop {function}              [onDoubleClick] button click
 * @prop {object}                [style] supplementary style; overrides generated styles
 * @prop {string}                [role] html role attribute
 * @prop {boolean}               [strong] alias of `b`
 * @prop {boolean}               [b] bold flag
 * @prop {boolean}               [em] alias of `i`
 * @prop {boolean}               [i] italicization flag
 * @prop {boolean}               [strikethrough] strikethrough flag
 * @prop {boolean}               [u] underline flag
 * @prop {boolean}               [d1] d1 style flag
 * @prop {boolean}               [d2] d2 style flag
 * @prop {boolean}               [d3] d3 style flag
 * @prop {boolean}               [d4] d4 style flag
 * @prop {boolean}               [d5] d5 style flag
 * @prop {boolean}               [d6] d6 style flag
 * @prop {boolean}               [h1] h1 style flag
 * @prop {boolean}               [h2] h2 style flag
 * @prop {boolean}               [h3] h3 style flag
 * @prop {boolean}               [h4] h4 style flag
 * @prop {boolean}               [h5] h5 style flag
 * @prop {boolean}               [h6] h6 style flag
 */

/**
 * @component Text
 * @memberof module:@abst/web-components
 * @alias Text
 * @desc core componment for all text in an app. Should wrap all text not passed
 * directly into another abst web component.
 *
 * @param {TextProps} props
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 */

export const Text = function CoreText(props) {
  const {
    active, b, center, c = center, children, className, code, debug, disabled,
    em, fontSize, i,  id, onClick, onDoubleClick, role, size = fontSize,
    strikethrough, strong, style, substring, substr = substring,
    t, text = t, u,
    bg, color, /* passed to css */
    d1, d2, d3, d4, d5, d6, h1, h2, h3, h4, h5, h6, /* hclasses */
  } = props;
  const cls = useCss(css, { bg, color, size });

  const propsCls = useValueMemo(() => cn({
    'heading': !_.isEmpty(
      _.compact([d1, d2, d3, d4, d5, d6, h1, h2, h3, h4, h5, h6])
    ),
    'display': !_.isEmpty(_.compact([d1, d2, d3, d4, d5, d6])),
    d1, d2, d3, d4, d5, d6, h1, h2, h3, h4, h5, h6, code,
    b, strong, em, i, u, strikethrough,
    active,
    'clickable': _.isFunction(onClick) || role === 'button',
    'has-bg': !_.isUndefined(bg),
    'has-color': !_.isUndefined(color),
    'has-size': !_.isUndefined(size),
    'substring': substr,
    'center': c
  }, { disabled }), [
    active, b, c, code, color, d1, d2, d3, d4, d5, d6, disabled, em,
    h1, h2, h3, h4, h5, h6, i, role, size,
    strikethrough, strong, substr, typeof onClick, u
  ]);

  debug && console.log({ propsCls });
  return (
    <div { ...{ id, onClick, onDoubleClick, role, style } }
      className={ cn('core-text', cls.text, propsCls, className) }
    >{ text || children }</div>
  );
};
