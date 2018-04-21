import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes'
import moment from 'moment'
import { Provider } from 'react-redux'
import {history, store, saga} from './Redux'

moment.locale('pt-br')

const routerProps = {
  history,
  store,
  saga,
};

ReactDOM.render(
  <Provider store={store}>
    <Routes {...routerProps} />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
