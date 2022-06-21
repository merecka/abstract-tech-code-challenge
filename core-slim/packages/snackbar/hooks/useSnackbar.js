import { createMemo } from 'react-use';
import { notification } from 'antd';
const types = ['success', 'error', 'info', 'warning', 'warn'];
const defaultMessages = { danger: 'Error', success: 'Success' };
const handle = (props) => {
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

export const snackbar = {
  notify: handle,
  open: handle,
  ...(_.reduce(types,
    (memo, type) => ({ ...memo, [type]: (p) => handle({ ...p, type }) }), {}
  ))
};

function snack() { return snackbar; }

export const useSnackbar = createMemo(snack);
