import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader, ErrorFallback } from 'components';

const HomePage = lazy(() => import('pages/Home'));

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
