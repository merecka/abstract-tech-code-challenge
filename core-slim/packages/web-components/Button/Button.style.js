function calcWithBorder(val, borderWidth = 2, multiplier = 2) {
  return `calc(\
    ${val}${_.isFinite(val) ? 'px' : ''} - \
    (${borderWidth}${_.isFinite(borderWidth) ? 'px' : ''} * \
    ${multiplier})\
  )`;
}

export default (theme, props) => {
  const {
    darken, darkMode, fade, fonts, getColor,
    getTextColor, lighten, saturate, toGray,
    colors, colors: { clear }
  } = theme;

  const {
    active, align, block, borderRadius: _borderRadius, color: clr = 'primary',
    dense, disabled, icon, iconRight, inputGroup,
    hover, label, labelProps, labelStyle, mini, prefix, size, style, suffix,
    transitionDuration = 200, transitionType = 'ease-in-out',

    /* addl props to support <ButtonGroup /> */
    isFirst, isLast, isInGroup,
  } = props;

  let {
    /* in dark mode, buttons should default to bordered */
    bordered = !!darkMode,
    borderWidth = inputGroup ? 1 : 2,
    height
  } = props;
  if (_.isUndefined(bordered) && !label) bordered = true;
  let color = getColor(clr);

  if (disabled) color = bordered ? colors.text.disabled : toGray(color);
  const elColor = getTextColor(darken(color, 10));

  let borderColor = color;
  let backgroundColor = color;
  let labelColor = elColor;

  if (bordered) {
    backgroundColor = disabled ? fade(color, 96) : clear;
    labelColor = color;
  }

  if (!disabled) {
    if (hover) {
      backgroundColor =
        bordered ? fade(labelColor, 80) : darken(backgroundColor, 12);
      borderColor = bordered ? borderColor : backgroundColor;
    }
    if(active) {
      backgroundColor = saturate(lighten(backgroundColor, 33), 25);
      borderColor = backgroundColor;
    }
  }

  const hasDefinedHeight = _.isFinite(height);
  let padding = 12;
  let minHeight = height || 32; // NOTE: calculated below to include border
  let minWidth = 88;
  let fontSize = 16;
  switch(size) {
    case 'small':
      padding = 8;
      if (!hasDefinedHeight) minHeight = 24;
      minWidth = 50;
      fontSize = 12;
      break;
    case 'large':
      if (!hasDefinedHeight) minHeight = 36;
      break;
    default: break;
  }

  switch(true) {
    case !label: minWidth = 20; break;
    case mini:
      padding = 0;
      minWidth = '100%';
      if (!hasDefinedHeight) minHeight = '100%';
      fontSize = 10;
      break;
    case dense:
      padding = 2;
      minWidth = '100%';
      break;
    default: break;
  }
  /* PREFIX/SUFFIX + <ButtonGroup /> */
  let borderRadius = _borderRadius || 8;
  if (_.isFinite(borderRadius)) borderRadius = `${borderRadius}px`;

  let margin;

  if (!inputGroup) minHeight = calcWithBorder(minHeight, borderWidth, 2);
  else { height = minHeight = 32; borderWidth = 1;}

  if (isInGroup) {
    if (isFirst) {
      borderRadius = `${borderRadius} 0 0 ${borderRadius}`;
      borderWidth = `${borderWidth}px ${borderWidth / 2}px ${borderWidth}px ${borderWidth}px`;
    } else if (isLast) {
      borderRadius = `0 ${borderRadius} ${borderRadius} 0`;
      borderWidth = `${borderWidth}px ${borderWidth}px ${borderWidth}px ${borderWidth / 2}px`;
    } else {
      borderRadius = 0;
      borderWidth = `${borderWidth}px ${borderWidth / 2}px`;
    }

    height = minHeight;
  } else {
    if (prefix) {
      borderRadius = '8px 0 0 8px';
      margin = `0 -${borderWidth}${_.isFinite(borderWidth) ? 'px' : ''} 0 0`;
    }
    if (suffix) {
      borderRadius = '0 8px 8px 0';
      margin = `0 0 0 -${borderWidth}${_.isFinite(borderWidth) ? 'px' : ''}`;
    }
  }

  return {
    btn: {
      alignItems: 'center',
      alignSelf: align === false ? undefined : align,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      color: labelColor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      height,
      justifyContent: 'center',
      lineHeight: 'normal',
      margin,
      minHeight,
      minWidth,
      transitionDuration: active ? 0 : `${transitionDuration}ms`,
      transitionTimingFunction: transitionType,
      padding: `0 ${padding}px`,
      flexDirection: iconRight ? 'row-reverse' : 'row',
      ...style
    },
    icon: {
      color: 'inherit',
      cursor: 'inherit',
      fontSize: label ? fontSize + 2 : fontSize,
      ...icon?.style
    },
    label: {
      color: 'inherit',
      cursor: 'inherit',
      width: block ? 'auto' : '100%',
      fontSize,
      display: 'inherit',
      alignItems: 'center',
      justifyContent: 'inherit',
      letterSpacing: size === 'small' ? 0 : 0.5,
      alignSelf: 'center',
      marginLeft: icon && !iconRight ? 8 : 0,
      marginRight: icon && iconRight ? 8 : 0,
      fontFamily: fonts.title,
      fontWeight: '400',
      textTransform: 'uppercase',
      ...labelStyle,
      ...labelProps?.style
    }
  };
};
