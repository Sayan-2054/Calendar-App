import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchGoals = createAsyncThunk(
  'goals/fetchGoals',
  async () => {
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  }
);

const goalSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: [],
    loading: false,
    error: null,
    highlightedGoalId: null
  },
  reducers: {
    highlightGoal: (state, action) => {
      state.highlightedGoalId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { highlightGoal } = goalSlice.actions;
export default goalSlice.reducer;
