'use client'

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AboutType } from '@/lib/types';
import axios from 'axios';



// Define the state structure for the blog slice
interface AboutState {
  about: AboutType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state
const initialState: AboutState = {
  about: [],
  status: 'idle',
  error: null,
};

// Create an async thunk for fetching blog posts
export const fetchAbout = createAsyncThunk('about/fetchAbout', async () => {
  const response = await axios.get('/api/about');
  return response.data;
});

// Create the blog slice
const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    fetchAboutStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchAboutSuccess(state, action: PayloadAction<AboutType[]>) {
      state.status = 'succeeded';
      state.about = action.payload;
    },
    fetchAboutFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchAboutStart, fetchAboutSuccess, fetchAboutFailure } = aboutSlice.actions;
export default aboutSlice.reducer;
