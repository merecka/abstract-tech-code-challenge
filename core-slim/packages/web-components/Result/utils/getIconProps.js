import cn from 'classnames';

export function getIconProps({ color, icon: _icon = {}, status, layout }) {
  let icon = _.clone(_icon);
  /* normalize shape */
  if (icon === false) return null;
  if (_.isString(icon)) icon = { name: icon };
  if (!_.isPlainObject(icon)) icon = {};

  /* set props */
  if (!icon.color) icon.color = color;
  if (!icon.weight) icon.weight = 'solid';
  if (!icon.size && layout !== 'inset') icon.size = '10x';
  if (!icon.name) {
    switch(status) {
      case 'warning': icon.name = 'exclamation-triangle'; break;
      case '404': icon.name = 'circle-question'; break;
      case 'empty': icon.name = 'empty-set'; break;
      case 'success': icon.name = 'check-circle'; break;
      case '403': icon.name = 'lock'; break;
      case 'error': icon.name = 'times-circle'; break;
      case 'info': default: icon.name = 'info.circle'; break;
    }
  }
  icon.className = cn('icon', icon.className);
  return icon;
}
