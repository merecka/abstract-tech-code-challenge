
export function createReducer(initialState, getColors) {
  return (state, { type, payload }) => {
    let val;
    switch(type) {
      case 'reset palette': return {
        ...state,
        ...getColors(
          initialState.palette,
          state.darkMode,
          state.parentPalette
        )
      };
      case 'udpate palette':
        val = _.defaultsDeep(state.palette, payload);
        return { ...state,
          ...getColors(val, state.darkMode, state.parentPalette)
        };
      case 'set dark mode':
        val = Boolean(payload);
        return { ...state,
          darkMode: val,
          colors: state.allColors[val ? 'dark' : 'light']
        };
      case 'update parent palette': return { ...state, parentPalette: payload };
      case 'update logo': return { ...state, logoSrc: payload };
      case 'update':
        if (!_.isPlainObject(payload)) {
          console.warn(`theme update rejected. received payload type: ${typeof payload}`);
          return state;
        }
        return { ...state, ...payload };
      default: return state;
    }
  };
}
