import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';

import 'antd/dist/antd.css';

import configureStore from './store/configureStore';

import theme from './theme';

import AppContainer from './containers/AppContainer';

const store = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </ThemeProvider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
