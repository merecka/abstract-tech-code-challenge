export function getStatusColor(status) {
  switch(status) {
    case 'warning': case '403': return 'warning';
    case '404': case 'empty': return 'info';
    case 'success': return 'success';
    case 'error': case '500': return 'danger';
    default: return 'text';
  }
}
