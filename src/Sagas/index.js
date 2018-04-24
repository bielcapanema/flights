import airportSaga from './airportSaga';
import flightSaga from './flightSaga';
import {all, takeLatest} from 'redux-saga/effects'
import {AirportTypes} from '../Redux/AirportRedux'
import {FlightTypes} from '../Redux/FlightRedux'

export default function * root () {
    yield all([
        takeLatest(AirportTypes.AIRPORT_REQUEST, airportSaga),
        takeLatest(FlightTypes.FLIGHTS_REQUEST, flightSaga),
    ])
  }
