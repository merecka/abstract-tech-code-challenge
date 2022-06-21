import React, { useEffect, useState } from 'react';
import styles from './EnhancedPane.style';
import { useStyles } from '@abst/hooks';
import { I } from '../../../Icon';
import { Text } from '../../../Text';
import { View } from '../../../View';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
export const EnhancedPane = (props) => {
  const sty = useStyles(styles, props);
  const { content, icon, index, isActive, render, title } = props;
  const [iconName, setIconName] = useState(null);

  useEffect(() => {
    if (icon && !_.isString(icon)) {
      console.error('ignoring non-string icon prop');
      setIconName(null);
    } else setIconName(icon);
  }, [icon]);

  return (
    <TabPane
      key={ index.toString() }
      tab={
        <View style={ sty.titleWrapper }>
          { iconName &&
            <I name={ iconName }
              style={ sty.icon }
              weight={ isActive ? 'duotone' : 'light' }
              secondaryOpacity={ 10 }
            />
          }
          { _.isString(title) && <Text style={ sty.title }>{ title }</Text> }
        </View>
      }
    >
      { _.isFunction(render) ? render(props) : content || <span /> }
    </TabPane>
  );
};
