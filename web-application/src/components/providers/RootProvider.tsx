'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { setupInterceptors } from '@/services/api';
import { useEffect } from 'react';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupInterceptors(store);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
