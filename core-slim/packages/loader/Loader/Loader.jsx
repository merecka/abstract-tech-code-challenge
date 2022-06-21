import React, { useCallback } from 'react';
import styles, { css } from './Loader.style';
import {
  useCss, useMediatedValue, usePropAccessor, useStyles, useValue
} from '@abst/hooks';
import { useMeasure } from 'react-use';
import { Container } from 'react-grid-system';
import ContentLoader from 'react-content-loader';
import cn from 'classnames';

import { Col } from '@abst/web-components/Col';
import { Row } from '@abst/web-components/Row';
import { View } from '@abst/web-components/View';
import { Text } from '@abst/web-components/Text';

import { Spinner } from '../Spinner';
import typeConfig from './typeConfig';

function Null() { return null; }
const getTypes = (_type, props) => {
  const types = _.isString(_type) ? _.split(_type, ' ') : _.isArray(_type) ?
    _type : _.isPlainObject(_type) ? [_type] : [];
  return _.compact(_.map(types, (t) => {
    let preset;
    let typeIsObj = false;
    if (_.isString(t)) preset = typeConfig[_.camelCase(t)] || null;
    if (_.isPlainObject(t)) {
      typeIsObj = true;
      preset = typeConfig[_.camelCase(t.type || t.preset)];
    }
    if (preset) {
      if (_.isFunction(preset)) {
        preset = preset(_.defaults({}, typeIsObj ? t : {}, props));
      }
      return _.defaults({}, typeIsObj ? t : {}, preset);
    }
    if (_.isFunction(t?.render)) return t;
    return undefined;
  }));
};

const watched = [
  'backgroundColor', 'foregroundColor',
  'animate', 'gradientRatio', 'interval', 'rtl', 'speed', 'uniqueKey'
];

function getLoaderProps(p) { return { ..._.pick(p, watched) }; }

/**
 * @function Loader
 * @memberof module:@abst/loader
 * @alias module:@abst/loader/Loader
 *
 * @desc Loading overlay. By default, the rendered inside a Grid with a
 * bottom margin to offset the top navbar. Passing `grid: false` will return a
 * loader inside a `<View>` instead. Both components accept `wrapperStyle` as
 * the override for styling, regardless of component
 *
 * @prop {string} [title='loading...'] main title
 * @prop {string} [subtitle]             secondary title;
 * @prop {object} [wrapperStyle]    style object passed to wrapping component
 * @prop {boolean} [grid=true]         determines wrapper (see description)
 */
export function Loader(props) {
  const sty = useStyles(styles, props);
  const {
    fill,
    fullScreen,
    style,
    type = ''
  } = props;
  const cls = useCss(css, { style }, {}, 'loader');
  const wProps = useValue(_.pick(props, watched));
  const presets = useMediatedValue(getTypes, type, wProps);
  const loaderProps = useMediatedValue(getLoaderProps, wProps);
  const spinner = usePropAccessor({ ...props, presets }, {
    className: 'spinner-${type}',
    defaults: { type: 'scale' },
    falsyValues: [],
    from: 'spinner',
    pass: ['color'],
    to: 'type',
  });

  const title = usePropAccessor(props, {
    className: cls.title,
    defaults: { h3: true, className: 'title', color: 'text' },
    from: 'title',
    to: 'children'
  });

  const [ref, { width: _width }] = useMeasure();
  const renderLoader = useCallback((preset, key) => {
    if (!preset) return null;
    const {
      component,
      colWidth = 12,
      height,
      justify = 'center',
      width,
      render = Null,
      ...rest
    } = preset || {};
    return (
      <Col xs={ colWidth } { ...{ justify, key } } align='stretch'>
        <View className={ cls.loaderWpr } style={{ minHeight: height }}>
          <ContentLoader
            backgroundColor={ sty.backgroundColor }
            foregroundColor={ sty.foregroundColor }
            { ...{ ...loaderProps, height, width } }
            viewBox={ `0 0 ${width} ${height}` }
            width='100%'
            height='100%'
          >{ component ||
            render({ colWidth, width, height, ...loaderProps, ...rest })
            }
          </ContentLoader>
        </View>
      </Col>
    );
  }, []);

  if (!presets?.length) {
    return (
      <View className={ cn(cls.wpr, spinner.className, { fill, fullScreen }) }
        { ...{ style } }
      >
        <Spinner { ...spinner }
          /* for bar-type loader, measure width of title */
          width={ spinner.width || (spinner.type === 'bar' && _width) }
        />
        { title && <span { ...{ ref } }><Text { ...{  ...title } } /></span> }
      </View>
    );
  }
  return (
    <Container fluid
      className={ cn(cls.wpr, { fullScreen }) }
      style={ sty.wpr }
    >
      <Row>{ _.map(presets, renderLoader) }</Row>
    </Container>
  );
}
