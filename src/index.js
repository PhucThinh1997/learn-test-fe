import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import history from './utils/common/history';
// Router Import
import { ConnectedRouter } from 'connected-react-router';
// Import i18n messages
import { applyApiDefaults } from 'config/axios';
import { DEFAULT_TIMEOUT } from 'static/Constants';
import { API_ENDPOINT } from './config/env';

import configureStore from './configureStore';

import 'react-perfect-scrollbar-z/build/styles.css';
import './index.less';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';

// casl
import ability from './common/casl/ability';
import { AbilityContext } from './context/Can';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
export default store;

// init axios default baseURL
// set default timeout
applyApiDefaults(
  {
    baseURL: API_ENDPOINT,
    timeout: DEFAULT_TIMEOUT,
  },
  store,
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AbilityContext.Provider value={ability}>
      <ConfigProvider>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ConfigProvider>
    </AbilityContext.Provider>
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
