import axios from 'axios';

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';

const API_URL = 'http://localhost:5000/api';

export const fetchEvents = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_EVENTS_REQUEST });
    
    try {
      const response = await axios.get(`${API_URL}/events`);
      dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_EVENTS_FAILURE,
        payload: error.message
      });
    }
  };
};

export const addEvent = (eventData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/events`, eventData);
      dispatch({
        type: ADD_EVENT_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
};

export const updateEvent = (eventData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/events/${eventData._id}`, eventData);
      dispatch({
        type: UPDATE_EVENT_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
};

export const deleteEvent = (eventId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/events/${eventId}`);
      dispatch({
        type: DELETE_EVENT_SUCCESS,
        payload: eventId
      });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
};