import React from 'react';
import { css } from './Badge.style';
import { useCss } from '@abst/hooks';
import { Badge as AntBadge } from 'antd';
import cn from 'classnames';

/**
 * @component Badge
 * @desc small, "notification"-style badge;
 * extends {@link https://ant.design/components/badge/?theme=dark|Antd Badge}
 * @alias module:@abst/web-components#Badge
 * @memberof module:@abst/web-components
 *
 * @returns {ReactComponent}
 *
 * @param {object} props **NOTE**: additional props are passed directly to main component
 *
 * @prop {object} badgeStyle style applied directly to inner badge CSS.
 * **Note: `style` prop updates outer wrapper.**
 * @prop {boolean} [bordered=false] whether badge should be bordered instead of solid
 * @prop {Color} [color='danger'] badge color
 *
 * @example <caption>import</caption>
 * import { Badge } from '@abst/web-components';
 */
export function Badge(props) {
  const {
    badgeStyle, bordered, className, color = 'danger', count = 0, ...rest
  } = props;
  const cls = useCss(css, { color, badgeStyle });

  return (
    <AntBadge { ...{ count } }
      className={ cn(cls.badge, className, { bordered }) }
      dot={ false }
      overflowCount={ 999 }
      showZero
      { ...rest }
    />
  );
}
