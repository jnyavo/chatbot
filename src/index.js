import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import AlertTemplate from 'react-alert-template-basic';
import './index.css';
import App from './App';
import {ContextProvider} from './contexts/ContextProvider';
import reportWebVitals from './reportWebVitals';

const options = {
  positions: positions.BOTTOM_CENTER,
  timeout:3000,
  offset:'30px',
  transition: transitions.SCALE,
} 



ReactDOM.render(
  
    <AlertProvider template={AlertTemplate} {...options} >
      <React.StrictMode>
        <ContextProvider>
          <App />
        </ContextProvider>
      </React.StrictMode>
    </AlertProvider>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
