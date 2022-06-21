/* REFACTOR
 * ---
 * IDEA: this is almost always a key/value table; maybe do something for that
 */
import React from 'react';
import styles, { css } from './CardTable.style';
import { useCss, useStyles } from '@abst/hooks';
import { Col } from '../../Col';
import { Row } from '../../Row';
import { Table } from '../../Table';
import classnames from 'classnames';

/**
 * @component CardTable
 * @memberof module:@abst/web-components
 * @alias CardTable
 *
 * @returns {ReactComponent}
 *
 * @param {object} props **NOTE**: additional props are passed to {@link LegacyTable}
 *
 * @prop {string} [className] CSS class to apply to table
 * @prop {boolean} [gutter=false] Whether gutter should be applied to outer {@link Row} element
 *
 * @todo refactor to use {@link Table}; needs backwards compatibility + testing
 * @todo maybe include special support for key/value pair tables, as that is the most common use case
 *
 * @desc Card UI element; accepts all
 * {@link https://ant.design/components/table|Antd Table} props.
 */
export const CardTable = (props) => {
  const sty = useStyles(styles);
  const cls = useCss(css);
  const { className, gutter = false, ...rest } = props;
  return (
    <Row nogutter={ !gutter }><Col xs={ 12 } style={ sty.container }>
      <Table pagination={ false }
        { ...rest }
        className={ classnames(cls.table, 'abst-card-table', className) }
      />
    </Col></Row>
  );
};
