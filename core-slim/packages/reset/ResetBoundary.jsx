import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ResetContext } from './ResetContext';


export function ResetBoundary(props) {
  const { children, component = null, defaultDelay = 0 } = props;
  const delay = useRef(defaultDelay);

  const [resetting, setResetting] = useState(false);

  const value = useMemo(() => ({
    handleReset: (_delay) => {
      if (_.isFinite(_delay)) delay.current = _delay;
      setResetting(true);
    }
  }), []);

  useEffect(() => {
    if (resetting) {
      const unset = () => { setResetting(false); };
      if (!delay.current) unset();
      else setTimeout(unset, delay.current);
    } else { /* delay when cycle completes */
      delay.current = defaultDelay;
    }
  }, [resetting]);

  return (
    <ResetContext.Provider value={ value }>
      { resetting ? component : children }
    </ResetContext.Provider>
  );
}
