import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import goalReducer from './goalReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  goals: goalReducer
});

export default rootReducer;
