import React, { useMemo } from 'react';
import { Popconfirm } from 'antd';
import { I } from '../../Icon';
import classnames from 'classnames';
import { css } from './BtnWpr.style';
import { useCss/* , useDidUpdate */ } from '@abst/hooks';
// import { useMediatedState } from 'react-use';

const confirmDefaults = {
  title: 'Are you sure?',
  okText: 'Yes',
  cancelText: 'No',
  icon: {
    name: 'exclamation-square',
    weight: 'solid',
    color: 'warning.saturated',
    size: 'sm'
  }
};

function getConfirm(cfm) {
  if (!confirm) return false;
  if (confirm === true) return confirmDefaults;
  return _.defaultsDeep({}, cfm, confirmDefaults);
}

/* NOTE:
 * if dynamic confirm support ever becomes required, change the first
 * useMemo to "initCfm" and uncomment the rest
 */
export const BtnWpr = (props) => {
  const cls = useCss(css);
  const {
    children, confirm: _confirm, confirmVisible, setConfirmVisible, onClick
  } = props;
  const confirm = useMemo(() => getConfirm(_confirm), []);

  if (!confirm) return <>{ children }</>;

  const { className, icon, ..._props } = confirm;

  return (
    <Popconfirm { ..._props }
      className={ classnames('btn-confirm', className) }
      overlayClassName={ cls.popover }
      icon={ icon && <I { ...icon } /> }
      onCancel={ () => setConfirmVisible(false) }
      onConfirm={ (e) => {
        setConfirmVisible(false);
        _.isFunction(onClick) && onClick(e);
      } }
      visible={ confirmVisible }
    >
      { children }
    </Popconfirm>
  );
};
