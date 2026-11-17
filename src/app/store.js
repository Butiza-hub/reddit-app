import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import filtersReducer from '../features/filters/filtersSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    filters: filtersReducer,
  },
})

export default store