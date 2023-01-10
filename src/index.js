import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD

import TestServiceComponent from './Components/TestServiceComponent'
// import TestComponent from './Components/TestComponent'
=======
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
>>>>>>> b2084bed624c1b6122cb2d503ff49fd3eec59348
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <TestServiceComponent />
=======
    <Router>
      <App />
    </Router>
>>>>>>> b2084bed624c1b6122cb2d503ff49fd3eec59348
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
