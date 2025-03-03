import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from './Redux/Store.js';
import { BrowserRouter } from 'react-router-dom';
import Loading from './Components/Home/Loading.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
