import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import map from 'lodash/map';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  flightsRequest: ['postData'],
  flightsSetAirline: ['airline', 'flights'],
  flightsSuccess: [],
  flightsFailure: []
})

export const FlightTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  airlines: {},
  fetching: null,
  error: ''
})

/* ------------- Selectors ------------- */

export const FlightSelectors = {
  selectFlights: state => state.airlines,
  selectAirlines: state => Object.keys(state.airlines),
  selectFetching: state => state.fetching,
  selectTotalFlighs: state => {
    let total = 0;
    map(state.airlines, (airline) => {
      total += airline.outbound.length
      total += airline.inbound.length
    })
    return total
  }
}

/* ------------- Reducers ------------- */

// request the flights
export const request = (state, { postData }) =>
  state.merge({ fetching: true, airlines: {}, error: '' })

// successful get airline flights
export const setAirline = (state, { airline, flights }) => {
  return state.merge({airlines: state.airlines.merge({[airline]: flights})})
}

// successful search flights
export const success = (state) => {
  return state.merge({ fetching: false, error: '' })
}

// failed to get the flights
export const failure = (state, {error}) =>{
  return state.merge({ fetching: false, airlines: {}, error })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLIGHTS_REQUEST]: request,
  [Types.FLIGHTS_SUCCESS]: success,
  [Types.FLIGHTS_SET_AIRLINE]: setAirline,
  [Types.FLIGHTS_FAILURE]: failure
})
