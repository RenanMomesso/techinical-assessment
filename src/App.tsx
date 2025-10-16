import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { planetService } from './services/planetService';
import { queryClient } from './lib/queryClient';

function App(): React.JSX.Element {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          {/* 
            Main app structure is pretty simple:
            - NuqsAdapter wraps everything for URL state management
            - QueryClient wraps everything for data fetching/caching
            - Dashboard component handles all the UI and state
            - planetService is injected as a prop (makes testing easier)
            
            I kept the app structure flat and simple. Could have added
            routing but it wasn't needed for this use case.
          */}
          <Dashboard planetService={planetService} />
        </div>
        {/* React Query Devtools - only shows in development */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NuqsAdapter>
  );
}

export default App;
