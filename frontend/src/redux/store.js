import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './reducers/eventReducer';
import goalReducer from './reducers/goalReducer';

const store = configureStore({
  reducer: {
    events: eventReducer,
    goals: goalReducer
  }
});

export default store;