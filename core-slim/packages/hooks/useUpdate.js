import { useReducer } from 'react';

const reducer = (num) => (num + 1) % 1000000;

export function useUpdate() {
  const [, update] = useReducer(reducer, 0);
  return update;
}
