import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

console.log('index.js loaded');
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Root created:', root);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
console.log('App rendered');