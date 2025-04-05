import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Service Worker Registration for GitHub Pages
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js') // 👈 Correct relative path
      .then(reg => console.log('[Main] Service Worker Registered:', reg))
      .catch(err => console.error('[Main] Service Worker Registration Failed:', err));
  });
}

// Optional: measuring performance
reportWebVitals();
