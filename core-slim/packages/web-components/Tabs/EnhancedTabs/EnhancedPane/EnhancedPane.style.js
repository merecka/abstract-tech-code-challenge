export default ({ colors, getColor }, { color = 'primary', isActive }) => {
  const clr = isActive ? getColor(color) : colors.text.primary;
  return {
    icon: { color: clr },
    title: { color: clr }
  };
};
