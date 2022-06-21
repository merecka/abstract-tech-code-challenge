
export const css = (theme, { badgeStyle, color: clr }) => {
  const { fade, getColor, getTextColor } = theme;

  const color = getColor(clr);

  return {
    badge: {
      '.ant-badge-count, .ant-badge-dot': {
        background: color,
        color: getTextColor(color),
        ...badgeStyle
      },
      '&.bordered': {
        '.ant-badge-count, .ant-badge-dot': {
          background: fade(color, 88),
          color,
          boxShadow: `0 0 0 2px ${color}`
        }
      }
    }
  };
};
