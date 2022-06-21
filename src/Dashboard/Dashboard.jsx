import React from 'react';
import styles from './Dashboard.style';
import { useStyles } from '@abst/hooks';
import { Button, Col, Row, Text, View, ViewWrapper } from '@abst/web-components';

export function Dashboard({ history }) {
  const sty = useStyles(styles/* , props *//* , defaultProps */);
  return (
    <ViewWrapper styles={ sty.viewWpr }>
      <Row><Col xs={ 12 } justify='center'>
        <Text h3 t='This is a "skills assessment".' />
      </Col><Col xs={ 6 } offset={{ xs: 3 }}>
        <Row nogutter><Col xs={ 12 }>
          <Text c>
            { 'You\'ve probably done these a time or' }
            <Text strikethrough substr t='two' />
            { 'twenty before. I tried to make this a little more engaging and less time-consuming. Instead of building something basic or doing tricks with arcane Javascript techniques, you\'ll be working with and improving some code that looks a lot like what you would be be working with on a daily basis.' }
          </Text>
        </Col><Col xs={ 12 }>
          <View style={ sty.space } />
        </Col><Col xs={ 12 }>
          <Text c>
            { 'This is also a' }
            <Text substr em t='very' />
            { 'dumb "game" cobbled together from a readily available, reasonably scrutable, but probably unfamiliar dataset: NBA rosters. Check this repo\'s'}
            <Text substr code t='README.md' />
            { 'for instructions and when you\'re ready...'
            }</Text>
        </Col><Col xs={ 12 } justify='center'>
          <Button
            color='secondary'
            label='get started'
            onClick={ () => { history.push('/game'); } }
          />
        </Col></Row>
      </Col></Row>
    </ViewWrapper>
  );
}
