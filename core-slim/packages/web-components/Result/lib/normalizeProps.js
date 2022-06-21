import { getErrorMessage } from '@abst/utils';
import { getTextProps, getIconProps, getStatusColor } from '../utils';

const layouts = ['default', 'compact', 'inset'];
const statuses = [
  '403', '404', '500', 'default', 'empty', 'error', 'info', 'warning'
];

function getStatusTitle(status, { error }) {
  if (status === 'default') return null;
  let val;
  if (status === 'error' || !!error) val = getErrorMessage(error, false, false);
  if (!val) val = _.upperFirst(status);
  return val;
}

function getStatusDesc(status) {
  switch(status) {
    case '403': return 'Forbidden';
    case '404': return 'Not Found';
    case '500': return 'Internal Error';
    case 'error': return 'An unknown error has occurred';
    default: return null;
  }
}

export function normalizeProps(_props) {
  const props = { layout: 'default', status: 'default', ..._props };
  if (!props.color) props.color = getStatusColor(props.status);
  if (!props.status && !!props.error) props.status = 'error';

  const { layout, status } = props;

  if (!_.includes(layouts, layout)) props.layout = 'default';
  if (_.isFinite(status)) props.status = _.toString(status);
  if (!_.includes(statuses, status)) props.status = 'default';
  return {
    ...props,
    description: getTextProps('description', props, getStatusDesc),
    icon: getIconProps(props),
    title: getTextProps('title', props, getStatusTitle)
  };
}
