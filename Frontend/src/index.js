import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { SearchProvider } from './SearchContext/SearchContext'; 
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

Kommunicate.init("278dfc0be5c99c3dbab6f5438ae2d900e", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>,
);

reportWebVitals();
