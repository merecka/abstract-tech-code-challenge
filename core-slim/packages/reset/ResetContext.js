import { createContext } from 'react';
const dHandle = () => {
  console.warn('handleReset can only be used inside a ResetBoundary');
};

export const ResetContext = createContext({ handleReset: dHandle });
