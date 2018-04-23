import { put } from 'redux-saga/effects';
import AirportReducer, {AirportTypes} from '../Redux/AirportRedux'
import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
}

export default function* handleAirports({ terms, type, field }) {
  try {
    const airports = yield axios.get(`https://www.maxmilhas.com.br/airports/search/${terms}`)
    yield put(AirportReducer.airportSuccess(field, airports.data))
  } catch (error) {
    console.log(error)
    yield put(AirportReducer.airportFailure(field))
  }
}
