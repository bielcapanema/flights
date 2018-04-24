import { put } from 'redux-saga/effects';
import AirportReducer from '../Redux/AirportRedux'
import axios from 'axios'

export default function* handleAirports({ terms, type, field }) {
  try {
    const airports = yield axios.get(`https://www.maxmilhas.com.br/airports/search/${terms}`)
    yield put(AirportReducer.airportSuccess(field, airports.data))
  } catch (error) {
    console.log(error)
    yield put(AirportReducer.airportFailure(field))
  }
}
