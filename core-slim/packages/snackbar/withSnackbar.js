import React, { forwardRef } from 'react';
import { notification } from 'antd';
import hoist from 'hoist-non-react-statics';

const handleOpen = (props) => {
  const defaultMessages = { danger: 'Error', success: 'Success' };
  const { type, description: _descr, message: _msg, ...rest } = props;
  const action = (type in notification) ? type :  'open';
  let description = _descr;
  let message = _msg;
  let { duration = 4.5 } = props;
  /* legacy support; detect ms and switch to s */
  if (duration > 999) duration = duration / 1000;

  if (!description) {
    description = message;
    message = defaultMessages[type] || 'New Message';
  }
  /* NOTE: duration should be AFTER ...rest to override passed default. */
  notification[action]({ message, description, ...rest, duration });
};

export const withSnackbar = () => (Composed) => {
  const WithSnack = forwardRef((props, ref) => (
    <Composed makeASnack={ handleOpen } { ...{ ...props, ref } } />
  ));
  hoist(WithSnack, Composed);
  return WithSnack;
};
