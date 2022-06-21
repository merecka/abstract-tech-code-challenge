import React, { useMemo } from 'react';
import { useTheme } from '@abst/theme/hooks';
import * as Spinners from 'react-spinners';

const _types = _.map(Spinners, (v, key) => _.upperFirst(_.camelCase(
  _.join(_.dropRight(_.split(_.kebabCase(key), '-')), '-')
)));
/**
 * @typedef {string} SpinnerType
 * @alias module:@abst/loader#types
 * @memberof module:@abst/loader
 * @desc available spinner types options. Enumerated values are:
 * "Bar", "Beat", "Bounce", "bar", "beat", "bounce",
 * "Circle", "ClimbingBox", "Clip", "Clock", "circle", "climbing-box", "clip", "clock",
 * "Dot", "dot",
 * "Fade", "fade",
 * "Grid", "grid",
 * "Hash", "hash",
 * "Moon", "moon",
 * "Pacman", "Propagate", "Pulse", "Puff", "pacman", "propagate", "pulse", "puff",
 * "Ring", "Rise", "Rotate", "ring", "rise", "rotate",
 * "Scale", "Skew", "Square", "Sync", "scale", "skew", "square", "sync"
 * @see https://www.davidhu.io/react-spinners/
 */
export const types = _.concat(_types, _.map(_types, _.kebabCase));
const validTypesLen = types.length;
function getSpinner(type, fallback) {
  let _type = type;
  if (!_.includes(types, type)) _type = fallback;
  _type = _.upperFirst(_.camelCase(_type));

  return Spinners[`${_type}Loader`];
}

/**
 * @component Spinner
 * @desc Loading spinner
 * @memberof module:@abst/loader
 * @alias Spinner
 *
 * @prop {Color}        color='text'  element color
 * @prop {SpinnerType}  type='random' spinner type; if omitted, or if invalid
 * type is provided, a random spinner will
 *
 * @example <caption>import</caption>
 * import { Spinner } from '@abst/loader';
 */
export function Spinner({ color: clr = 'text.primary', type, ...rest }) {
  const [{ getColor }] = useTheme();

  const color = useMemo(() => getColor(clr, 'hex'), [clr]);
  const fallback = useMemo(() => types[_.random(validTypesLen - 1)], []);
  const Spnr = useMemo(() => getSpinner(type, fallback), [type]);
  return (
    <Spnr { ...{ color, ...rest } } />
  );
}
