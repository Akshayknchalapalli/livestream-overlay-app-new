import React, { lazy, Suspense } from 'react';

const LazyOverlayManager = lazy(() => import('./OverlayManager'));

const OverlayManager = props => (
  <Suspense fallback={null}>
    <LazyOverlayManager {...props} />
  </Suspense>
);

export default OverlayManager;
