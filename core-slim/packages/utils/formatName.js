
function parseObjectValue(v = {}) {
  switch(true) {
    case _.isString(v.full): return v.full;
    case _.isString(v.fullName): return v.fullName;
    case _.isString(v.first || v.last):
      return `${v.first ? v.first + ' ' : ''}${v.last || ''}`;
    default: return '';
  }
}

export function formatName(v) {
  switch(true) {
    case _.isPlainObject(v): return parseObjectValue(v);
    case _.isString(v): return v;
    default: return '';
  }
}
