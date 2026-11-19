import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchComments } from '../../api/redditApi'

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  (postId) => fetchComments(postId),
)

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
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

export const { clearComments } = commentsSlice.actions

export default commentsSlice.reducer