import { describe, it, expect } from 'vitest'
import filtersReducer, { setSearchTerm, setCategory } from './filtersSlice'

describe('filtersSlice', () => {
  it('starts with an empty search and the "all" category', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual({
      searchTerm: '',
      category: 'all',
    })
  })

  it('stores the search term', () => {
    const state = filtersReducer(undefined, setSearchTerm('redux'))

    expect(state.searchTerm).toBe('redux')
  })

  it('stores the selected category', () => {
    const state = filtersReducer(undefined, setCategory('movies'))

    expect(state.category).toBe('movies')
  })

  it('keeps the search term when the category changes', () => {
    const typed = filtersReducer(undefined, setSearchTerm('redux'))
    const state = filtersReducer(typed, setCategory('webdev'))

    expect(state).toEqual({ searchTerm: 'redux', category: 'webdev' })
  })
})