/**
 * @typedef FlexShortcode
 * @alias FlexShortcode
 * @memberof module:@abst/utils
 * @desc > NOTE: properties represent transformed values; all other values are returned untransformed
 * @prop {string}  start    => `flex-start`
 * @prop {string}  center   => `center`
 * @prop {string}  middle   => `center`
 * @prop {string}  end      => `flex-end`
 * @prop {string}  between  => `space-between`
 * @prop {string}  around   => `space-around`
 * @prop {string}  normal   => `flex-start`
 */

/**
 * @method getFlexShortcode
 * @desc gets valid CSS flex align/justify value based on input
 * @alias module:@abst/utils#getFlexShortcode
 * @memberof module:@abst/utils
 *
 * @param {FlexShortcode} value value to transform
 * @returns {string} transformed value
 */
export function getFlexShortcode(v) {
  switch(v) {
    case 'start': return 'flex-start';
    case 'center': case 'middle': return 'center';
    case 'end': return 'flex-end';
    case 'between':  return 'space-between';
    case 'around': return 'space-around';
    case 'normal': return 'flex-start';
    default: return v;
  }
}
