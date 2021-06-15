import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import DataForm from "./components/DataForm";
import reportWebVitals from './reportWebVitals';
import ChartComponent from "./components/chart/ChartComponent";
ReactDOM.render(
  <React.StrictMode>
    <DataForm/>
    <ChartComponent/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
