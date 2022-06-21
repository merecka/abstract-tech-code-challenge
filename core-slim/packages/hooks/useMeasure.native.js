import { useState } from 'react';

export function useMeasure() {
  const [size, setSize] = useState({});
  const onLayout = (e) => { setSize(e.nativeEvent?.layout || {}); };

  return [onLayout, size];
}
