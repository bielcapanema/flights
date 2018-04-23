import airportSaga from './airportSaga';
import {all, takeLatest} from 'redux-saga/effects'
import {AirportTypes} from '../Redux/AirportRedux'

export default function * root () {
    yield all([
        takeLatest(AirportTypes.AIRPORT_REQUEST, airportSaga)
    ])
  }
