import React, { forwardRef } from 'react';
import { css } from './Card.style';
import { useCss } from '@abst/hooks';
import { Card as CardBase } from 'antd';
import cn from 'classnames';

/**
 * @component Card
 * @desc Card UI element; extends {@link https://ant.design/components/card|Antd Card}.
 * @memberof module:@abst/web-components
 * @alias Card
 *
 * @returns {ReactComponent}
 *
 * @param {object} props **NOTE**: all props are passed directly to main component
 */
export const Card = forwardRef(function CoreCard(props, ref) {
  const { className, contentType, ...rest } = props;
  const cls = useCss(css, props);
  return (
    <CardBase { ...{ ...rest, ref } }
      className={
        cn('abst-card', cls.card, `content-type--${contentType}`, className)
      }
    />
  );
});

/**
 * @component CardGrid
 * @desc Card Grid UI element; extends {@link https://ant.design/components/card/#Card.Grid|Antd Card.Grid}.
 * @memberof module:@abst/web-components
 *
 * @returns {ReactComponent}
 *
 * @param {object} props **NOTE**: all props are passed directly to main component
 *
 * @alias CardGrid
 */
export const CardGrid = CardBase.Grid;

/**
* @component CardMeta
* @desc Card Grid UI element; extends {@link https://ant.design/components/card/#Card.Meta|Antd Card.Meta}.
* @memberof module:@abst/web-components
* @alias CardMeta
*
* @returns {ReactComponent}
*
* @param {object} props **NOTE**: all props are passed directly to main component
*
*/
export const CardMeta = CardBase.Meta;
