import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchComments } from '../../api/redditApi'

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  (postId) => fetchComments(postId),
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.items = []
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default commentsSlice.reducer