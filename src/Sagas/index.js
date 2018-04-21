import fetchSaga from './fetchSaga';

export default (restClient) => function* crudSaga() {
    yield [
        fetchSaga(restClient)(),
    ];
};

