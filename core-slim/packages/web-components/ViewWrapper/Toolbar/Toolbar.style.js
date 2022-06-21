export default ({ colors, darken, fade }) => {
  const baseColor = fade(colors.primary.lighter, 0.85);
  return {
    wrapper: {
      background: `linear-gradient(
        180deg,
        ${darken(baseColor, 0.025)},
        ${baseColor} 40%,
        ${baseColor})`,
      padding: '1rem 2rem',
      margin: '-2rem -2rem 1rem -2rem',
      borderBottom: `1px solid ${darken(baseColor, 0.25)}`
    },
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between'
    }
  }
}
