
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost } from '@/lib/types';
import axios from 'axios';



// Define the state structure for the blog slice
interface BlogState {
  posts: BlogPost[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state
const initialState: BlogState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Create an async thunk for fetching blog posts
export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const response = await axios.get('/api/blogs');
  return response.data;
});

// Create the blog slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<BlogPost[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default blogSlice.reducer;
