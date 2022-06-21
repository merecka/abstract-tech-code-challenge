import React, { useMemo } from 'react';
import { css } from './Markdown.style.js';
import { useCss } from '@abst/hooks';
import Renderer from 'react-markdown';
import emoji from 'emoji-dictionary';
import classnames from 'classnames';
import reHighlight from 'remark-highlight.js';

function getPlugins(plugins = []) {
  return [reHighlight, ...plugins];
}

function getRenderers(renderers = {}) {
  return {
    ...renderers,
    text: (text) => {
      text = text.value.replace(/:\w+:/gi, (name) => emoji.getUnicode(name));
      text = text.replace(/&gt;/gi, '>');
      if (renderers?.text) text = renderers.text(text);
      return text;
    }
  };
}

/**
 * @component Markdown
 * @desc Markdown renderer; extends
 * {@link https://github.com/remarkjs/react-markdown#readme|react-markdown},
 * with {@link https://github.com/remarkjs/remark-highlight.js#readme|remark-highlight.js},
 * {@link https://github.com/IonicaBizau/emoji-dictionary#readme|emoji-dictionary},
 * and a bunch of styles pre-applied.
 *
 * @memberof module:@abst/web-components
 * @alias Markdown
 *
 * @prop {string} className CSS class to apply to main element
 * @prop {array} plugins additional plugins to apply
 * @prop {object} renderers additional renderers to apply; `.text` is merged
 * with standard text renderer.
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Markdown } from '@abst/web-components';
 */
export function Markdown({ plugins: _plugins, renderers: rnd, ...props }) {
  const plugins = useMemo(() => getPlugins(_plugins), []);
  const renderers = useMemo(() => getRenderers(rnd), []);
  const cls = useCss(css);

  return (
    <Renderer { ...{ ...props, plugins, renderers } }
      className={ classnames('markdown', cls.wpr, props.className) }
    />);
}
