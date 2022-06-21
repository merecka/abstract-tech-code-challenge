import { createElement, createContext, useContext } from 'react';
import { useAsyncReducer } from './useAsyncReducer';

/**
 * @method createAsyncReducerContext
 * @desc creates a shared
 * {@link useAsyncReducer} that can be used across multiple components
 *
 * @alias createAsyncReducerContext
 * @memberof module:@abst/hooks
 *
 *
 * @param {CoreReducer} reducer reducer function
 * @param {CoreState}   [initialState] initial state
 * @param {object}      [conf] {@link useAsyncReducer} config object
 *
 * @returns {array} [useSharedAsyncReducer, ContextProvider, context]
 *
 * @see https://github.com/streamich/react-use/blob/master/docs/createReducerContext.md
 */
export const createAsyncReducerContext = (reducer, dInitialState, conf) => {
  const context = createContext(undefined);
  const providerFactory = (props, children) =>
    createElement(context.Provider, props, children);

  const ReducerProvider = ({ children, initialState }) => {
    const state = useAsyncReducer(
      reducer,
      initialState !== undefined ? initialState : dInitialState,
      conf
    );
    return providerFactory({ value: state }, children);
  };

  const useReducerContext = () => {
    const state = useContext(context);
    if (!state) {
      throw new Error('useReducerContext must be used inside a ReducerProvider.');
    }
    return state;
  };

  return [useReducerContext, ReducerProvider, context];
};
