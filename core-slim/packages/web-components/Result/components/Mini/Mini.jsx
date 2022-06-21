import styles from './Mini.style';
import React from 'react';
import { Tooltip } from '../../../Tooltip';
import { I } from '../../../Icon';
import { View } from '../../../View';
import { Text } from '../../../Text';
import { Button } from '../../../Button';
import { useStyles } from '@abst/hooks';

export function Mini(props) {
  const { actBtns, description, icon, title } = props;
  const sty = useStyles(styles);
  return (
    <Tooltip
      containerStyle={ sty.container }
      content={
        <View style={ sty.wrapper }>
          {title && _.isString(title)
            ? <Text b style={ sty.title }>{title}</Text>
            : title || null
          }
          {description && _.isString(description)
            ? <Text style={ sty.description }>{description}</Text>
            : description || null}
          <View style={ sty.buttons }>
            {_.map(actBtns, (buttonConfig, index) => {
              return (
                <Button key={ index }
                  style={ sty.button }
                  { ...buttonConfig }
                  size='small'
                />
              );
            })}
          </View>
        </View>
      }
    >
      <I size='2x' style={ sty.icon } { ...icon } />
    </Tooltip>
  );
}
