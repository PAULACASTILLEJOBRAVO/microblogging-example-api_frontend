import React from 'react';
import ReactDOM from 'react-dom';
import HeaderApp from './components/HeaderApp.js';
import App from './components/App.js';

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<HeaderApp/>, document.getElementById('header'));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(<Signup/>, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

