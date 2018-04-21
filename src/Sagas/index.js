import fetchSaga from './fetchSaga';
import {all} from 'redux-saga/effects'

export default (restClient) => function* rootSaga() {
    yield all([
        fetchSaga(restClient)(),
    ]);
};

