import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  airportRequest: ['field', 'terms'],
  airportSuccess: ['field', 'result'],
  airportFailure: null
})

export const AirportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  to: {},
  from: {},
  fetching: null
})

/* ------------- Selectors ------------- */

export const SearchSelectors = {
  selectFrom: state => state.airports.from,
  selectTo: state => state.airports.to
}

/* ------------- Reducers ------------- */

// request the airports
export const request = (state, { field, terms }) =>
  state.merge({ fetching: true, field, terms, [field]: {} })

// successful search airport
export const success = (state, action) => {
  const { results, field } = action
  return state.merge({ fetching: false, [field]: results })
}

// failed to get the airports
export const failure = (state, action) =>{
  const { field } = action
  return state.merge({ fetching: false, [field]: {} })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AIRPORT_REQUEST]: request,
  [Types.AIRPORT_SUCCESS]: success,
  [Types.AIRPORT_FAILURE]: failure
})
