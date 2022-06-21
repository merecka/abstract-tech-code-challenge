/* TooltipWrapper */
export default () => {
  return {
    overlayCtr: { padding: 0, fontSize: '1rem' },
    tooltip: { borderRadius: 8 },
  };
};

function getBorders(side, clr) {
  switch(side) {
    case 'bottom': return { borderLeftColor: clr, borderTopColor: clr };
    case 'left': return { borderRightColor: clr, borderTopColor: clr };
    case 'right': return { borderLeftColor: clr, borderBottomColor: clr };
    case 'top': return { borderRightColor: clr, borderBottomColor: clr };
    default: return {};
  }
}

/* returns [h-offset, v-offset] for each of the box-shadows */
function getShadowOffsets(side) {
  switch(side) {
    case 'bottom': return ['2px 3px', '-2px 3px'];
    case 'left': return ['-4px 5px', '-4px -6px'];
    case 'top': return ['2px -3px', '-2px -3px'];
    case 'right': return ['4px 5px', '4px -6px'];
    default: return ['0px 0px', '1px 0px'];
  }
}

/* Tooltip */
/* used to get background color (passed directly to Popover) */
/* NOTE: also exported to Button.BtnWpr (confirm popover) */
export const css = (theme, props) => {
  const {
    colors, darkMode, darken, fade, fonts, getColor, getTextColor, lighten
  } = theme;
  const { canvas, gray } = colors;
  const mod = darkMode ? lighten : darken;
  const {
    bordered = false,
    color: clr = mod(canvas.component, 12),
    containerStyle = {},
    maxWidth = 300, placement, style, shadowed = true,
  } = props;

  const color = getColor(clr);
  const backgroundColor = bordered ? canvas.primary : color;
  const border = bordered ? `1px solid ${color}` : undefined;
  const textColor = getTextColor(backgroundColor);
  const side = _.split(_.kebabCase(placement), '-')[0];
  const shadowOffsets = getShadowOffsets(side);
  return {
    container: containerStyle,
    popover: {
      [`&.ant-popover-placement-${placement}`]: {
        maxWidth,
        '.ant-popover-inner': {
          border,
          'borderRadius': '4px',
          backgroundColor, /* underlay for faded bgs */
          'boxShadow': shadowed ? `\
          ${shadowOffsets[0]} 4px 0px ${fade(gray.darkest, 67)}, \
          ${shadowOffsets[1]} 4px 0px ${fade(gray.darkest, 67)}\
          ` : 'none',
          'padding': bordered ? undefined : '0px 6px',

          '.ant-popover-inner-content': {
            backgroundColor: bordered ? fade(color, 92) : backgroundColor,
            color: bordered ? color : textColor,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 'normal',
            padding: bordered ? undefined : '6px 2px',
            ...style,
          }
        },
        '.ant-popover-title': {
          borderColor: bordered ? color : fade(textColor),
          color: bordered ? color : textColor,
          fontFamily: fonts.title,
          fontSize: 14,
          fontWeight: 'bolder',
          padding: bordered ? undefined : '6px 2px',
          minWidth: '100%',
        },
        '.ant-popover-content': {
          'minWidth': '100%',
          '.ant-popover-arrow': getBorders(side, color),
        },
        '&.no-title .ant-popover-inner-content': {
          borderRadius: '4px'
        }
      }

    }
  };
};
