import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  }
);

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (eventData) => {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (eventData) => {
    const response = await axios.put(`${API_URL}/events/${eventData._id}`, eventData);
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId) => {
    await axios.delete(`${API_URL}/events/${eventId}`);
    return eventId;
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchEvents
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle addEvent
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      // Handle updateEvent
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      // Handle deleteEvent
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
      });
  }
});

export default eventSlice.reducer;