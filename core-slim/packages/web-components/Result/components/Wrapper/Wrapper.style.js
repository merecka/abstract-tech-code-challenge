/* NOTE: moved to Result CSS */
// export default (theme, props) => {
//   const { layout, minHeight: _minHeight, style, wrapperStyle } = props;
//   const isCompactLayout = layout === 'compact';
//   const minHeight = _minHeight || (layout === 'inset' ? 350 : 1);
//   return {
//     wpr: {
//       width: '100%',
//       ...wrapperStyle,
//     },
//     cardBody: {
//       display: 'flex',
//       flex: 1,
//       flexDirection: isCompactLayout ? 'row' : 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: isCompactLayout ? '6px 8px' : '24px 16px',
//       minHeight,
//       ...style
//     }
//   };
// };
