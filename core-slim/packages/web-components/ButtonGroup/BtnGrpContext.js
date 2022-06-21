import { createContext } from 'react';
export const BtnGrpContext = createContext({
  active: null,
  data: [],
  getItem: () => ({
    getButtonProps: () => ({}),
    getWrapperProps: () => ({})
  })
});
