import { useState } from 'react';

export function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleCatch = (error, info) => {
    console.error('Caught error:', error, info);
    setHasError(true);
  };

  return hasError ? (
    <div>Something went wrong. Please refresh.</div>
  ) : (
    children
  );
}