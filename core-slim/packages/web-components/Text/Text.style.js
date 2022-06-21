export const css = (theme, props) => {
  const { bg, color, size } = props;
  const {
    // colorGrid,
    colors: { primary, info, text },
    // darkMode,
    fade,
    fonts,
    getColor,
    getTextColor,
    typography
  } = theme;
  // const codeClr = colorGrid.lightBlue[darkMode ? 200 : 400];


  return {
    text: {
      'display': 'inline',
      'fontFamily': fonts.body,
      // 'color': text.primary,
      '&.active': {
        'cursor': 'pointer',
        '&:hover': {
          textDecoration: 'underline'
        }
      },
      '&.clickable': {
        cursor: 'pointer',
        textDecoration: 'underline'
      },
      '&.heading': {
        'color': primary.primary,
        'fontFamily': fonts.title,
        'letterSpacing': 1,
        // 'textTransform': 'capitalize',
        'fontWeight': 700,

        '&.display': {
          fontFmaily: fonts.display || fonts.title,
          fontWeight: 900,
        },
        '&.d1': { fontSize: typography.display1FontSize },
        '&.d2': { fontSize: typography.display2FontSize },
        '&.d3': { fontSize: typography.display3FontSize },
        '&.d4': { fontSize: typography.display4FontSize },
        '&.d5': { fontSize: typography.display5FontSize },
        '&.d6': { fontSize: typography.display6FontSize },
        '&.h1': { fontSize: typography.h1FontSize },
        '&.h2': { fontSize: typography.h2FontSize },
        '&.h3': { fontSize: typography.h3FontSize },
        '&.h4': { fontSize: typography.h4FontSize },
        '&.h5': { fontSize: typography.h5FontSize },
        '&.h6': { fontSize: typography.h6FontSize },
      },
      '&.inverse': { color: text.inverse },
      '&.code': {
        backgroundColor: fade(info.primary, 88),
        // border: `0.5px solid ${fade(codeClr, 88)}`,
        borderRadius: 2,
        color: info.primary,
        fontFamily: 'monospace',
        padding: '0px 3px'
      },
      '&.b,.strong': { fontWeight: 'bold' },
      '&.em,.i': { fontStyle: 'italic' },
      '&.strikethrough': {
        textDecoration: 'line-through',
        textDecorationThickness: '3px',
      },
      '&.u': { textDecoration: 'underline' },
      '&.has-bg': { color: getTextColor(bg) },
      '&.has-color': { color: getColor(color) },
      '&.disabled': { color: text.disabled, cursor: 'not-allowed' },
      '&.has-size': { fontSize: size },
      '&.substring': {
        display: 'inline-flex',
        marginLeft: '3px', marginRight: '3px',
      },
      '&.center': { textAlign: 'center' }
    }
  };
};

// const ops = [
//   'd1', 'd2', 'd3', 'd4', 'd5', 'd6',
//   'display1', 'display2', 'display3', 'display4', 'display5', 'display6',
//   'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
// ];
//
// /* see if any size flags are present */
// const findIn = (props) =>
//   _.findKey(props, (v, k) => (v === true && _.includes(ops, k)));

// export default (theme, props) => {
//   const {
//     colors, colorGrid, darkMode, fade, fonts, getColor, getTextColor, typography
//   } = theme;
//   const {
//     active, b, bg, color, code, disabled, fontSize: size, em, i, inverse,
//     hovering, onClick, role, sizeClass, strong, style, u, ...rest
//   } = props;
//   const hFlag = sizeClass || findIn(rest);
//   const isHeading = !_.isUndefined(hFlag);
//   const isDisplay = isHeading && _.includes(hFlag, 'd');
//   if (props.debug) console.log({ hFlag, isHeading, isDisplay });
//   return {
//
//
//     borderRadius: code ? '4px' : undefined,
//     display: 'flex',
//     color: do {
//       switch(true) {
//         case _.isNull(color): return undefined;
//         case disabled: return colors.text.disabled;
//         case code: return colorGrid.lightBlue[darkMode ? 200 : 500];
//         case !_.isUndefined(bg): return getTextColor(bg);
//         case !_.isUndefined(color): return getColor(color);
//         case inverse: return colors.text.inverse;
//         case isHeading: return colors.brand.primary;
//         default: return undefined;
//       }
//     },
//     cursor: (props.active && hovering) ||
//       (_.isFunction(onClick) || role === 'button') ? 'pointer' :
//       disabled ? 'not-allowed' : undefined,
//     fontFamily: code ? 'monospace' : isHeading ? fonts.title : fonts.body,
//     fontSize: size || isHeading ? typography[`${hFlag}FontSize`] : undefined,
//     fontStyle: em || i ? 'italic' : 'normal',
//     fontWeight: isHeading
//       ? isDisplay ? 300 : 700
//       : strong || b ? 'bold' : undefined,
//     letterSpacing: isHeading ? 0.75 : undefined,
//     padding: code ? '0px 4px' : undefined,
//     textDecoration: props.strikethrough ? 'line-through' :
//       u || (active && hovering) ? 'underline' : 'none',
//     textTransform: isHeading ? 'uppercase' : undefined,
//     ...style
//   };
// };
