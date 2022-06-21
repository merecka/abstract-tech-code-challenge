export const normalizeSizes = (sizes) => _.mapValues(sizes, (size, key) => {
  switch(typeof size) {
    case 'number': return size;
    case 'boolean': return undefined;
    case 'string':
      if (_.endsWith(size, '%')) {
        return _.round((_.parseInt(_.trimEnd(size, '%')) / 100) * 12);
      } else if (_.includes(size, '/')) {
        return _.round(_.split(size, '/')[0] / _.split(size, '/')[1] * 12);
      }
      console.warn(`Col prop ${key} has unexpected value ${size}. \
It should be one of: integer, percent, or fraction. Ignoring.`);
      return undefined;
    default: return size;
  }
});
