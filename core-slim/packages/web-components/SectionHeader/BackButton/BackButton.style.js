export const css = ({ fade, darken, getColor }, { color }) => {
  const primaryColor = getColor(color || 'text');
  const bgColor = fade(primaryColor, 0.80);
  const activeColor = darken(bgColor, 0.2);
  return {
    wpr: {
      'alignItems': 'center',
      'alignSelf': 'center',
      'transition': 'background-color .15s ease-in-out',
      'borderRadius': 4,
      'marginRight': 4,
      'padding': '1px 3px',
      '&:hover': { backgroundColor: bgColor },
      '&:active': { backgroundColor: activeColor }
    }
  };
};
