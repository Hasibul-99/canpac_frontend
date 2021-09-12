import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

import "./assets/css/yaybar.css";
import "./assets/css/bootstrap-custom.css";
import "./assets/css/rootui.css";
import "./assets/scss/main.scss";

import App from "./routers/App"
import "./i18n";

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading ...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
