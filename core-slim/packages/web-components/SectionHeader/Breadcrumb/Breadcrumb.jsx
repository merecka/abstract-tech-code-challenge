import React, { useState } from 'react';
import styles from './Breadcrumb.style';
import { useHistory } from 'react-router';
import { Button } from '../../Button';
import { Col } from '../../Col';
import { Row } from '../../Row';
import { Text } from '../../Text';
import { View } from '../../View';

export const Breadcrumb = function CoreBreadcrumb(props) {
  const [sty] = useState(styles());
  const history = useHistory();
  const { breadcrumb } = props;
  return (
    <Row>
      <Col xs={ 12 }>
        <View style={ sty.wrapper }>
          <Button
            icon={{ name: 'home', size: 'lg', weight: 'solid' }}
            color='primary'
            style={ sty.iconCrumb }
            onClick={ () => history.push('/') }
          />
          { _.map(breadcrumb, ({ slug, label }, index) => (
            <View style={ sty.crumbWrapper } key={ index }>
              <Text style={ sty.separator }>{ '/' }</Text>
              { index + 1 === breadcrumb.length ?
                <Text d6 style={ sty.lastCrumb }>{ label }</Text> :
                <Button
                  size='small'
                  bordered
                  onClick={ () => { history.push(slug); } }
                  style={ sty.crumb }
                  color='brand.tertiary'
                  label={ label }
                />
              }
            </View>
          )) }
        </View>
      </Col>
    </Row>
  );
};
