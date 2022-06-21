// import colors from '../colorPalette';
// import { fade } from '../colorModifiers';
// import { typography, fonts } from '../typography';
//
// const colorOptions = [
//   'primary', 'secondary', 'tertiary', 'gray',
//   'error', 'info', 'success', 'warning', 'inverse'
// ];
//
// const sizeOptions = [
//   'button',
//   'display1', 'display2', 'display3', 'display4', 'display5', 'display6',
//   'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
// ];
//
// // accepts: properties object, options array
// // returns: the first option listed that matches a given style
// const findOptionInProps = (props, options) => {
//   return _.findKey(
//     props,
//     (value, key) => (value === true && _.includes(options, key))
//   );
// };
//
//
// const getSizeClass = ({ sizeClass, ...props }) => {
//   switch(true) {
//     case (sizeClass && _.includes(sizeOptions, sizeClass)):
//       return _.toLower(sizeClass);
//     case (findOptionInProps(props, sizeOptions) !== undefined):
//       return findOptionInProps(props, sizeOptions);
//     default: return undefined;
//   }
// };
//
// const getTextSize = (sizeClass, props) => {
//   let fontFamily = fonts.body;
//   if (props.code) fontFamily = 'monospace';
//   if (sizeClass) {
//     const header = _.includes(sizeClass, 'h');
//     const display = _.includes(sizeClass, 'display');
//     if ((header || display) && !props.code) fontFamily = fonts.title;
//     return {
//       fontSize: typography[`${sizeClass}FontSize`],
//       fontWeight: display ? 300 : 700,
//       textTransform: header || display ? 'uppercase' : undefined,
//       fontFamily,
//       letterSpacing: display ? 1.25 : header ? 1.15 : 1,
//       marginBottom: 0
//     };
//   }
//   // send back the default
//   return { fontSize: typography.fontSize, fontFamily };
// };
//
// const getTextColor = (props, sizeClass) => {
//   const { colorClass, variant = 'primary' } = props;
//   switch(true) {
//     /* always take an explictly defined color */
//     case _.has(props, 'color'): return props.color;
//     /* let classNames override implicit color */
//     case _.has(props, 'className'): return undefined;
//     /* handle code */
//     case props.code: return colors.info.darker;
//     /* handle inverse */
//     case props.inverse: return colors.text.inverse;
//     /* has explicitly defined color class */
//     case _.has(props, 'colorClass'):
//       return colors[_.toLower(colorClass)][variant];
//     /* find implicitly defined color class */
//     case findOptionInProps(props, colorOptions) !== undefined:
//       return colors[findOptionInProps(props, colorOptions)][variant];
//     /* return primary.primary for headings */
//     case (sizeClass !== undefined): return colors.primary[variant];
//     default: return colors.text[variant];
//   }
// };
// /**
//  * @method getTextStyle
//  * @memberof module:@abst/theme
//  * @alias module:@abst/theme.getTextStyle
//  * @desc provides a JS style block based on given properties
//  * @param {object} props properties passed to the text or text-like element
//  * @param {object} [state] current state of the text or text-like element
//  * @return {object} valid style object for the element
//  *
//  * @prop {boolean} strong whether text should be bold
//  * @prop {boolean} b whether text should be bold
//  * @prop {boolean} em whether text should be italicized
//  * @prop {boolean} strikethrough whether text should be strikethrough
//  * @prop {boolean} u whether text is inside a underlined
//  * @prop {boolean} display1 bootstrap h1 size class
//  * @prop {boolean} display2 bootstrap h1 size class
//  * @prop {boolean} display3 bootstrap h1 size class
//  * @prop {boolean} display4 bootstrap h1 size class
//  * @prop {boolean} display5 bootstrap h1 size class
//  * @prop {boolean} display6 bootstrap h1 size class
//  * @prop {boolean} h1 bootstrap h1 size class
//  * @prop {boolean} h2 bootstrap h2 size class
//  * @prop {boolean} h3 bootstrap h3 size class
//  * @prop {boolean} h4 bootstrap h4 size class
//  * @prop {boolean} h5 bootstrap h5 size class
//  * @prop {boolean} h6 bootstrap h6 size class
//  * @prop {string} sizeClass any valid boolean size class explicitly declared as
//  * @prop {string} color explicitly declared color - passed to {@link getColor}
//  */
//
// export default function getTextStyle(props, state = {}) {
//   const sizeClass = getSizeClass(props);
//   return {
//     fontWeight: props.strong || props.b ? 'bold' : 'normal',
//     ...getTextSize(sizeClass, props),
//     cursor: (props.active && state.hover) ? 'pointer' : 'default',
//     color: getTextColor(props, sizeClass),
//     display: 'flex',
//     fontStyle: props.em ? 'italic' : 'normal',
//     textDecoration: props.strikethrough ? 'line-through' :
//       props.u || (props.active && state.hover) ? 'underline' : 'none',
//     backgroundColor: props.code ? fade(colors.info.lighter, 0.88) : undefined,
//     padding: props.code ? '0 4px' : undefined
//   };
// }
