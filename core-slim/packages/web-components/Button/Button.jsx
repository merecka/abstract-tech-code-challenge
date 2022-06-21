import React, { useState } from 'react';
import styles from './Button.style';
import { useStyles } from '@abst/hooks';
import { Button as AntButton } from 'antd';
import { useEffectOnce } from 'react-use';
import classnames from 'classnames';
import warnAboutOldProps from './warnAboutOldProps';
import {
  BtnIcon as Icon, BtnLabel as Label, BtnWpr as Wpr
} from './components';

/**
 * @component
 * @desc Button component; extends {@link https://ant.design/components/button|Antd Button}.
 * @memberof module:@abst/web-components
 * @alias Button
 *
 * @param {object} props
 *
 * @prop {ButtonProps} props
 * @returns {ReactComponent}
 * @example <caption>import</caption>
 * import { Button } from '@abst/web-components';
 */
export function Button(props) {
  const {
    block, className, confirm, dense, disabled, hoverable = true, htmlType,
    icon, id, label, labelProps, loading, mini, onClick, onMouseDown,
    onMouseEnter, onMouseLeave, onMouseUp, size, type
  } = props;
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const sty = useStyles(styles, { ...props, active, hover });
  useEffectOnce(() => { warnAboutOldProps(props); });
  return (
    <Wpr { ...{ confirm, confirmVisible, setConfirmVisible, onClick } }>
      <AntButton { ...{ block, id, loading } }
        className={ classnames('abst-btn', className) }
        htmlType={ htmlType || type }
        onClick={ disabled ? null :
          confirm ? () => { setConfirmVisible(true); } : onClick
        }
        onMouseDown={ disabled ? null :
          () => { setActive(true); onMouseDown && onMouseDown(); }
        }
        onMouseEnter={
          () => {
            (!disabled && hoverable) && setHover(true);
            onMouseEnter && onMouseEnter();
          } }
        onMouseLeave={
          () => { setHover(false); onMouseLeave && onMouseLeave(); }
        }
        onMouseUp={ () => { setActive(false); onMouseUp && onMouseUp(); } }
        size={ (mini || dense) ? 'small' : size }
        style={ sty.btn }
      >
        <Icon { ...{ icon } } style={ sty.icon } />
        <Label { ...{ label, ...labelProps } } style={ sty.label } />
      </AntButton>
    </Wpr>
  );
}
