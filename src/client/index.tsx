import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';

import 'antd/dist/antd.css';

import theme from './theme';

import App from './App';

ReactDOM.hydrate(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
