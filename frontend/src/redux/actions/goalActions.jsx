import axios from 'axios';

export const FETCH_GOALS_REQUEST = 'FETCH_GOALS_REQUEST';
export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';
export const FETCH_GOALS_FAILURE = 'FETCH_GOALS_FAILURE';
export const HIGHLIGHT_GOAL = 'HIGHLIGHT_GOAL';

const API_URL = 'http://localhost:5000/api';

export const fetchGoals = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_GOALS_REQUEST });
    
    try {
      const response = await axios.get(`${API_URL}/goals`);
      dispatch({
        type: FETCH_GOALS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_GOALS_FAILURE,
        payload: error.message
      });
    }
  };
};

export const highlightGoal = (goalId) => {
  return {
    type: HIGHLIGHT_GOAL,
    payload: goalId
  };
};