import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchPosts } from '../../api/redditApi'

export const loadPosts = createAsyncThunk('posts/loadPosts', () =>
  fetchPosts(),
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
  },
})

export default postsSlice.reducer