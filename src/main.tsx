import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import './i18n';
import { FrappeProvider } from 'frappe-react-sdk';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FrappeProvider url={process.env.FRAPPE_URL || 'http://localhost:8000'}>
      <Provider store={store}>
        <App />
      </Provider>
    </FrappeProvider>
  </React.StrictMode>
);
