import { useEffect, useMemo, useRef } from 'react';
import { getOrCreateStore } from '../Storage';
import { useUpdate } from '@abst/hooks/useUpdate';

export function useStorage(key, conf) {
  const update = useUpdate();
  const iStore = useMemo(() => getOrCreateStore(key, conf), []);
  const store = useRef(iStore);
  useEffect(() => {
    if (key !== store.current?.key) {
      store.current = getOrCreateStore(key, conf);
      update();
    }
  }, [key]);

  return store.current;
}
