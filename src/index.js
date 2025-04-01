import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App'; // .js extension is optional in most modern setups
import reportWebVitals from './reportWebVitals'; // .js extension optional

// Get the root element and render
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

// Optional: Measure performance
reportWebVitals();