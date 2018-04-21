import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Provider } from 'react-redux'
import reducer from './RootReducer';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Sagas';
import restClient from '../Services/rest_client'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

const reduxRouterMiddleware = routerMiddleware(history)


export const saga = function* appSaga() {
  yield [
      rootSaga(restClient)
  ].map(fork);
};
const sagaMiddleware = createSagaMiddleware();

const config = {
  key: 'maxmilhas_frontendtest',
  version: 1,
  storage: storage,
  blacklist: ['form']
}


export const store = createStore(
  persistReducer(config, reducer),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, reduxRouterMiddleware)
  ),
);

persistStore(store, null, () => {
  console.log('rehydration complete')
})

sagaMiddleware.run(saga);