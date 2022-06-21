import React, { Suspense } from 'react';
const { logo: { custom = false } = {}} = process.__CONF;
const CustLogo = custom ? React.lazy(() => import('@src/Logo')) : null;

export function Logo({ logoSrc, style }) {
  if (logoSrc) {
    return <img className='img-fluid' src={ logoSrc } style={ style } />;
  } else if (custom) {
    return (
      <Suspense fallback={ <span /> }><CustLogo style={ style } /></Suspense>
    );
  }
  return <span />;
}
