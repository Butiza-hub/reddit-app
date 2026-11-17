import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchTerm: '',
    category: 'all',
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    setCategory(state, action) {
      state.category = action.payload
    },
  },
})

export const { setSearchTerm, setCategory } = filtersSlice.actions

export default filtersSlice.reducer