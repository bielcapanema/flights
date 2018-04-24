import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './RootReducer';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects'
import rootSaga from '../Sagas';
import restClient from '../Services/rest_client'
import createHistory from 'history/createBrowserHistory'
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

export const history = createHistory()

const reduxRouterMiddleware = routerMiddleware(history)


export const saga = function* appSaga() {
  yield all([rootSaga(restClient)])
};
const sagaMiddleware = createSagaMiddleware();

const config = {
  key: 'dev4',
  version: 2,
  storage: storage,
  blacklist: ['form'],
  transforms: [immutablePersistenceTransform]
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