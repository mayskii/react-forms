import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
