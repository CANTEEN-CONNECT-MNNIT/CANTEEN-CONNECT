import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from './Redux/Store.js';
import { BrowserRouter } from 'react-router-dom';
import Loading from './Components/Home/Loading.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
