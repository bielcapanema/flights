import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  airports: require('./AirportRedux').reducer,
  flights: require('./FlightRedux').reducer,
  toastr: toastrReducer
  // saving: savingRedux,
  // waiting: waitingReducer,
  // alert: alertReducer,
})
