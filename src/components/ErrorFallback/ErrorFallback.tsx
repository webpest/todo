import React from 'react';

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
