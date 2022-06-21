export default ({ colors: { canvas, secondary }, fade }) => {
  return {
    wpr: { flex: 1 },
    colCtr: { flex: 1 },
    scoreboardWpr: {
      alignSelf: 'stretch',
      backgroundColor: fade(canvas.component, 88),
      borderColor: fade(secondary.darker),
      borderWidth: '1px 0 1px 1px',
      borderStyle: 'solid',
      borderRadius: '8px 0 0 8px',
      marginTop: 12,
      marginBottom: 12
    }
  };
};
