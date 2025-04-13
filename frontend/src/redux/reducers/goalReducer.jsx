import {
    FETCH_GOALS_REQUEST,
    FETCH_GOALS_SUCCESS,
    FETCH_GOALS_FAILURE,
    HIGHLIGHT_GOAL
  } from '../actions/goalActions';
  
  const initialState = {
    goals: [],
    loading: false,
    error: null,
    highlightedGoalId: null
  };
  
  const goalReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GOALS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_GOALS_SUCCESS:
        return {
          ...state,
          loading: false,
          goals: action.payload
        };
      case FETCH_GOALS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case HIGHLIGHT_GOAL:
        return {
          ...state,
          highlightedGoalId: action.payload
        };
      default:
        return state;
    }
  };
  
  export default goalReducer;