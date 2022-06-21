import React, { useState, useEffect } from 'react';
import { Router } from './Router';
import { ScreenClassProvider } from 'react-grid-system';
import { ResetBoundary } from '@abst/reset';
import { BrowserRouter } from 'react-router-dom';
import { stores } from '@src/constants';
import { preAssembleStores } from '@abst/storage';

export function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async() => {
      await import('@abst/runtime-utils/fontawesomeInit');
      await preAssembleStores({ stores });
      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  return (
    <ScreenClassProvider><ResetBoundary><BrowserRouter>
      <Router />
    </BrowserRouter></ResetBoundary></ScreenClassProvider>
  );
}
