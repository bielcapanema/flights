import { put, all, call } from 'redux-saga/effects';
import FlightReducer from '../Redux/FlightRedux'
import axios from 'axios'

const SEARCH_FLIGHTS_API = 'https://flight-price-hmg.maxmilhas.com.br'

const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXhtaWxoYXMuY29tLmJyIiwiaWF0IjoxNTA5MTIwMTAxLCJleHAiOjE1MTA0MTYxMDEsImF1ZCI6InRlc3RlLWZyb250ZW5kIiwic3ViIjoidGVzdGUtZnJvbnRlbmQiLCJlbnYiOiJobWcifQ.nM6wMem6dxF0CcDlig5iA9az5ZfmbXDjq1e4ypZXwjU'

function* getAirlineFlights(airline, searchId) {
  const flights = yield axios.get(`${SEARCH_FLIGHTS_API }/search/${searchId}/flights?airline=${airline.label}`, {headers: { Authorization: `Bearer ${AUTH_TOKEN}` }})
  return yield put(FlightReducer.flightsSetAirline(airline.label, flights.data))
}

export default function* handleFlights({ postData }) {
  try {
    const flightsResult = yield axios.post(`${SEARCH_FLIGHTS_API }/search?time=${Date.now()}`, postData, {headers: { Authorization: `Bearer ${AUTH_TOKEN}` }})
    yield all(flightsResult.data.airlines.map((airline) => {
      if(airline.status && airline.status.enable) {
        return call(getAirlineFlights, airline, flightsResult.data.id)
      }
    }))
    yield put(FlightReducer.flightsSuccess())
  } catch (error) {
    console.log(error)
    yield put(FlightReducer.flightsFailure(error))
  }
}
