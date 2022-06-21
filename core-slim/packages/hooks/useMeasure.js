import { useMemo, useLayoutEffect, useState } from 'react';


const dState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};


export function useMeasure() {
  const [el, ref] = useState(null);
  const [dimens, setDimens] = useState(dState);

  const observer = useMemo(() => (new window.ResizeObserver((ents) => {
    if (!!ents?.[0]?.contentRect) {
      setDimens(_.pick(ents[0].contentRect, _.keys(dState)));
    }
  })), []);

  useLayoutEffect(() => {
    if (!el) return () => {};
    observer.observe(el);
    return () => { observer.disconnect(); };
  }, [el]);

  return [ref, dimens];
}
