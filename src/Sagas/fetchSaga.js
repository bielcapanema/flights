import { put, call, cancelled, takeEvery, takeLatest, select} from 'redux-saga/effects';

const crudFetch = (restClient) => {
    function* handleFetch(action) {
        // const { type, payload, meta: { fetch: fetchMeta, ...meta } } = action;
        // const restType = fetchMeta;
        
        // yield [
        //     put({ type: `${type}_LOADING`, payload, meta }),
        //     put({ type: FETCH_START }),
        // ];
        // let response;
        // try {
        //     const concurso = yield select(state => state.concurso.active);
            
        //     response = yield call(restClient, restType, meta.resource, {...payload, concurso, noFilter: meta.noFilter});
        //     if (!response.data) {
        //         throw new Error('REST response must contain a data key');
        //     }
        //     yield put({
        //         type: `${type}_SUCCESS`,
        //         payload: response,
        //         requestPayload: payload,
        //         meta: { ...meta, fetchResponse: restType, fetchStatus: FETCH_END },
        //     });
        //     yield put({ type: FETCH_END });
        // } catch (error) {
        //     if (restType === DELETE) {
        //         swal('Erro', `Erro ao tentar excluir registro!`, "error")
        //     }
        //     yield put({
        //         type: `${type}_FAILURE`,
        //         error: error.message ? error.message : error,
        //         requestPayload: payload,
        //         meta: { ...meta, fetchResponse: restType, fetchStatus: FETCH_ERROR },
        //     });
        //     yield put({ type: FETCH_ERROR, error });
        // } finally {
        //     if (yield cancelled()) {
        //         yield put({ type: FETCH_CANCEL });
        //         return; /* eslint no-unsafe-finally:0 */
        //     }
        // }
    }

    return function* watchCrudFetch() {
        yield [
            takeLatest(action => action.meta && action.meta.fetch && action.meta.cancelPrevious, handleFetch),
            takeEvery(action => action.meta && action.meta.fetch && !action.meta.cancelPrevious, handleFetch),
        ];
    };
};


export default crudFetch;
