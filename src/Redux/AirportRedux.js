import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  airportRequest: ['field', 'terms'],
  airportSuccess: ['field', 'result'],
  airportFailure: ['field']
})

export const AirportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  to: [],
  from: [],
  fetching: null
})

/* ------------- Selectors ------------- */

export const AirportSelectors = {
  selectFrom: state => state.airports.from.map(({iata, city, name}) => { return {value: iata, label: `${name} - ${city}`} }),
  selectTo: state => state.airports.to.map(({iata, city, name}) => { return {value: iata, label: `${name} - ${city}`} })
}

/* ------------- Reducers ------------- */

// request the airports
export const request = (state, { field, terms }) =>
  state.merge({ fetching: true, [field]: [] })

// successful search airport
export const success = (state, action) => {
  const { result, field } = action
  return state.merge({ fetching: false, [field]: result })
}

// failed to get the airports
export const failure = (state, action) =>{
  const { field } = action
  return state.merge({ fetching: false, [field]: [] })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AIRPORT_REQUEST]: request,
  [Types.AIRPORT_SUCCESS]: success,
  [Types.AIRPORT_FAILURE]: failure
})
