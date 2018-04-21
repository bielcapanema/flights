
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  // loading: loadingReducer,
  // saving: savingRedux,
  // waiting: waitingReducer,
  // alert: alertReducer,
})