import style from './RemoveModal.style';
import { useStyles } from '@abst/hooks';
import React from 'react';
import { Modal as AntModal } from 'antd';
import { I } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

/**
 * @component RemoveModal
 * @desc modal; specific to pre-item-removal
 * @memberof module:@abst/web-components
 * @alias RemoveModal
 *
 * @deprecated likely unused; will be removed pending test
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { RemoveModal } from '@abst/web-components';
 */
export const RemoveModal = (props) => {
  const sty = useStyles(style);
  const { onConfirm, open, ...rest } = props;
  return (
    <AntModal
      { ...rest }
      visible={ open }
      onOk={ onConfirm }
      style={ sty.wrapper }
    >
      <Row style={ sty.container } justify='center'>
        <I
          size='3x'
          name='exclamation-triangle'
          color='danger.saturated'
          weight='solid'
          style={ sty.icon }
        />
        <Text style={ sty.text }>
          Deleted items cannot be recovered. Please confirm before proceeding.
        </Text>
      </Row>
    </AntModal>
  );
};
