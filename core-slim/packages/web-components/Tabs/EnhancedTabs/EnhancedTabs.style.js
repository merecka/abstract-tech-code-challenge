export default ({ colors: { canvas }, fade }, { tabBarStyle }) => {
  return {
    titleWrapper: { justifyContent: 'space-between', alignItems: 'center' },
    icon: { cursor: 'inherit' },
    tabBar: { borderBottomColor: fade(canvas.inverse, 88), ...tabBarStyle },
    title: (isActive) => ({
      cursor: 'inherit',
      fontWeight: isActive ? '700' : '500',
      marginLeft: 6,
      transition: 'all 250ms ease-in-out'
    })
  };
};

export const css = ({ getColor }, { color = 'primary' }) => ({
  tabs: {
    '.ant-tabs-ink-bar': {
      backgroundColor: getColor(color)
    }
  }
});
