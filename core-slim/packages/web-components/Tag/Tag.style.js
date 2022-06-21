const presets = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
];

export default ({ colorGrid, fade, getColor }, props) => {
  const { common } = colorGrid;
  const { color: clr, labelStyle, style } = props;
  let color;
  if (!_.includes(presets, clr)) color = getColor(clr);

  return {
    color: color || clr,

    tag: {
      backgroundColor: color ? fade(color, 0.88) : common.transparent,
      border: color ? `1px solid ${color}` : undefined,
      color,
      display: 'inline-flex',
      alignItems: 'center',
      height: 'auto',
      marginRight: 0,
      // marginLeft: 8,
      ...style
    },
    label: {
      color,
      fontSize: '12px',
      height: 'auto',
      lineHeight: 1,
      padding: '0.25rem 0.125rem',
      labelStyle
    }
  };
};

export const css = ({ colors, getColor }, { color: clr }) => {
  let color;
  if (!_.includes(presets, clr)) color = getColor(clr);
  return {
    closeIcon: {
      '&.ant-tag-has-color': {
        '.anticon-close': {
          color: color || colors.text.darkest
        }
      }
    }
  };
};
