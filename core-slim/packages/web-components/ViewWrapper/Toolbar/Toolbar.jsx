import React from 'react';
import styles from './Toolbar.style.js';
import { useStyles } from '@abst/hooks';
import { View } from '../../View';
import { ActionButtons } from '../../SectionHeader/ActionButtons';
import { BackButton } from '../../SectionHeader/BackButton';

export const Toolbar = (props) => {
  const sty = useStyles(styles);
  const { actionButtons = [], backButton = {}} = props;
  return (
    <View style={ sty.wrapper }>
      <View style={ sty.container }>
        { _.isEmpty(backButton) ? <View />
          : <BackButton { ...backButton } />
        } { _.isEmpty(actionButtons) ?
          null : <ActionButtons buttons={ actionButtons } /> }
      </View>
    </View>
  );
};
