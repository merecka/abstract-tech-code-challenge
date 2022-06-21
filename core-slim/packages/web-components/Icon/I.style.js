export default (theme, props) => {
  const { getColor } = theme;
  const {
    buttonStyle, color: clr = 'text', disabled,
    opacity: opat = 1, rotate, size, style = {},
    secondaryColor: sClr = clr, secondaryOpacity: sOpat = 40,
    transitionDuration = 200, transitionType = 'ease-in-out',
  } = props;
  const color = getColor(disabled ? 'text.disabled' : clr);

  const cssVars = {
    '--fa-primary-color': color,
    '--fa-primary-opacity': opat > 1 ? _.round(opat / 100, 2) : opat,
    '--fa-secondary-color': getColor(disabled ? 'text.disabled' : sClr),
    '--fa-secondary-opacity': sOpat > 1 ? _.round(sOpat / 100, 2) : sOpat
  };
  if (_.has(style, ['color'])) {
    delete cssVars['--fa-primary-color'];
    delete cssVars['--fa-secondary-color'];
  }

  return {
    button: { cursor: disabled ? 'not-allowed' : 'pointer', ...buttonStyle },
    color,
    size: _.isString(size) ? size : undefined,
    icon: _.omitBy({
      ...cssVars,

      transition: `all ${transitionDuration}ms ${transitionType}`,
      transform: `rotate(${rotate}deg)`,
      fontSize: _.isFinite(size) ? size : null,
      ...style
    }, _.isNull)
  };
};
